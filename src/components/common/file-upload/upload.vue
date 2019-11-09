<template>
  <div ref="uploaderWrapper" class="webuploader-container">
    <div class="webuploader-pick">
      <slot></slot>
    </div>
    <form action="" class="webuploader-form">
      <label class="webuploader-label">
        <input v-if="resetInput" :name="name" :accept="currentAccept" :multiple="multiple" type="file" class="webuploader-element-invisible" @change="fileChange($event)">
      </label>
    </form>
    <iframe v-if="control && postAction !== ''" :id="idIframe" :name="idIframe" style="display:none;">
    </iframe>
    <div v-if="showLoading" class="webuploader-mask is-fullscreen" style="z-index: 2005;">
      <div class="webuploader-spinner">
        <el-progress type="circle" :percentage="percentage"></el-progress>
        <p>上传中</p>
      </div>
    </div>
  </div>
</template>
<style>
.webuploader-container {
  position: relative;
  display: inline-block;
}
.webuploader-element-invisible {
  position: absolute !important;
  visibility: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px,1px,1px,1px);
  top: 0px;
  left: 0px;
  overflow: hidden;
  bottom: auto;
  right: auto;
}
.webuploader-pick {
  /* overflow: hidden; */
}
.webuploader-form {
  position: absolute; top: 0px; left: 0px; overflow: hidden; bottom: 0px; right: 0px;
}
.webuploader-label {
  opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);
}
.webuploader-pick-disable {
  opacity: 0.6;
  pointer-events:none;
}
/* loading css */
.webuploader-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.webuploader-spinner {
  width: 200px;
  top: 50%;
  left: 50%;
  margin-top: -21px;
  margin-left: -100px;
  text-align: center;
  position: absolute;
  color: #666;
}
.webuploader-mask.is-fullscreen {
  position: fixed;
}
.webuploader-mask.is-fullscreen .webuploader-spinner {
  margin-top: -25px;
}
</style>

<script>
/**
 * options events参考自WebUploader
 * Options: 如下props
 * Events:
 * uploadSuccess(res, files[list]) 注：请求成功后后端返回错误code都为uploadSuccess，因为那是业务上的处理逻辑
 * error(message) 注：底层请求错误及验证错误都放到error
 * uploadProgress(percent)
 */
import Cookies from 'js-cookie'
import util from './libs/util'

let id = 0
export default {
  name: 'FileUpload',
  props: {
    // 后端要传在url里的参数 (不做公共上传服务的坑)
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    // postAction
    action: {
      type: String,
      default: '/api/tds/file/uploadFile'
    },
    // formData key name
    name: {
      type: String,
      required: false,
      default: 'file'
    },
    // 多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 上传最大数量 默认为10 todo
    fileNumLimit: {
      type: Number,
      default: 10
    },
    // 大小限制 默认10M 单位M
    fileSingleSizeLimit: {
      type: Number,
      default: 10
    },
    // 默认加上accessToken
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 类型 img | excel | pdf | rar | custom
    type: {
      type: String,
      required: false,
      default: ''
    },
    // 是否显示上传进度或者loading
    showLoadingMask: {
      type: Boolean,
      default: true
    },
    // 自动上传
    auto: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    id++
    return {
      percentage: 0,
      showLoading: false,
      control: true,
      resetInput: true,
      acceptTypes: {
        'jpg': {
          message: '只能上传jpg .jpeg格式的图片',
          suffix: 'jpg,jpeg,image/jpg,image/jpeg',
          accept: 'image/jpg,image/jpeg'
        },
        'img': {
          message: '必须上传jpg .jpeg .gif .png .bmp格式的图片',
          suffix: 'tif,gif,bmp,jpg,jpeg,png,image/png,image/jpeg',
          accept: 'image/tif,image/gif,image/bmp,image/jpg,image/jpeg,image/png'
        },
        'excel': {
          message: '必须上传excel文件',
          suffix: 'xls,xlsx',
          accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
        },
        'pdf': {
          message: '必须上传pdf文件',
          suffix: 'pdf',
          accept: '.pdf'
        },
        'rar': {
          message: '必须上传rar文件',
          suffix: 'rar,zip,7z',
          accept: '.rar,.zip,7z'
        },
        'custom': {
          message: '必须上传docx、xls、xlsx、pptx、pdf、jpg、jpeg、png、bmp中，其中一种格式的文件',
          suffix: 'docx,xls,xlsx,pptx,pdf,jpg,jpeg,png,image/png,image/jpeg',
          accept: '.docx,.pptx,.pdf,image/jpg,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
        }
      },
      idIframe: 'uploadIframe_' + id,
      files: []
    }
  },
  computed: {
    currentAccept() {
      return this.type ? this.acceptTypes[this.type].accept : ''
    },
    postAction() {
      return util.serializeParam(this.action, this.params)
    },
    calcMtoByte() {
      return this.fileSingleSizeLimit * 1024 * 1024
    }
  },
  methods: {
    error(message, e) {
      if (e) {
        console.log(e)
      }
      alert(message)
      this.$emit('error', message)
      this.endLoading()
    },
    uploadProgress(loaded, total) {
      if (loaded === 0) {
        this.startLoading()
      }
      const percentage = loaded / total
      this.percentage = parseInt(percentage * 100)
      this.$emit('uploadProgress', percentage)
    },
    uploadSuccess(res) {
      this.$emit('uploadSuccess', res, this.files)
      this.endLoading()
    },
    startLoading() {
      if (!util.isIE9() && this.showLoadingMask) {
        this.showLoading = true
      }
    },
    endLoading() {
      this.showLoading = false
    },
    validateType(obj) {
      const type = util.getType(obj).toLowerCase()
      if (!this.type) {
        return true
      }
      const currentType = this.acceptTypes[this.type]
      const validSuffix = currentType.suffix.split(',')
      if (!validSuffix.find(r => r === type)) {
        this.reset()
        this.error(currentType.message)
        return false
      }
      return true
    },
    validateFileSize(obj) {
      const size = util.getFileSize(obj)
      if (size && size > this.calcMtoByte) {
        this.error(`上传文件的大小不能超过${this.fileSingleSizeLimit}M`)
        return false
      }
      return true
    },
    fileChange(e) {
      const target = e.target
      console.log(e)
      if (target.value) {
        const isPassType = this.validateType(target)
        const isPassFileSize = this.validateFileSize(target)
        if (isPassType && isPassFileSize) {
          if (target.files) {
            this.files = target.files
          }
          this.$emit('fileQueued', this.files)
          if (this.auto) {
            this.submit()
          }
        }
      }
    },
    submit() {
      this.$emit('beforeUpload', [this.files])
      this.uploadProgress(0, 100)
      setTimeout(() => {
        if (util.isIE9()) {
          this.submitHtml4()
        } else {
          this.submitHtml5()
        }
      }, 100)
    },
    submitHtml5() {
      const form = new window.FormData()
      Array.prototype.forEach.call(this.files, file => {
        console.log(file)
        form.append(this.name, file)
      })
      const xhr = new XMLHttpRequest()
      const uploaded = () => {
        let res = { code: 'error', message: '上传失败' }
        try {
          res = JSON.parse(xhr.responseText)
          this.uploadSuccess(res)
        } catch (err) {
          this.error('上传失败！', err)
        }
        this.reset()
      }
      xhr.onload = (e) => {
        uploaded()
      }
      xhr.onerror = (e) => {
        this.error('上传失败！')
      }
      xhr.upload.onprogress = (e) => {
        this.uploadProgress(e.loaded, e.total)
      }
      xhr.open('POST', this.postAction)
      // set headers
      const headers = this.headers
      const token = Cookies.get('token')
      if (token) {
        headers['accessToken'] = token
      }
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }
      xhr.send(form)
    },
    submitHtml4() {
      var myForm = this.$refs.uploaderWrapper.querySelector('form')
      setTimeout(() => {
        // form submit请求的headers['accessToken']从node拦截加入或者后端从cookie获取
        myForm.action = this.postAction
        myForm.method = 'post'
        myForm.enctype = 'multipart/form-data'
        myForm.target = this.idIframe
        myForm.submit()
        var iframe = document.getElementById(this.idIframe)
        util.getFrameResponseIframeOnload(iframe, (status, res) => {
          if (status === 'load') {
            this.uploadSuccess(res)
          }
          if (status === 'error') {
            this.error('上传失败！')
          }
          this.reset()
          this.uploadProgress(100, 100)
        })
      }, 0)
    },
    reset() {
      if (this.auto) { // 必须是自动上传才清空，点击上传的话如果第一次上传失败，用户还可能会再次点击上传
        this.resetInputFn()
        this.resetFile()
      }
      this.resetIframe()
    },
    resetInputFn() {
      this.resetInput = false
      setTimeout(() => {
        this.resetInput = true
      }, 500)
    },
    resetIframe() {
      this.control = false
      setTimeout(() => {
        this.control = true
      }, 500)
    },
    resetFile() {
      this.files = []
    }
  }
}
</script>
