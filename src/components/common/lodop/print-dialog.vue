<template>
  <div>
    <el-dialog
      :visible.sync="printFormVisible"
      :append-to-body="true"
      title="打印设置"
      class="dialog-print">
      <el-form label-width="6em" :model="printForm">
        <!-- <el-form-item label="打印设置">
          <el-radio-group v-model="printForm.printType">
            <el-radio label="standard">标准打印尺寸</el-radio>
            <el-radio label="custom">自定义打印尺寸</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <template v-if="printForm.printType === 'standard'">
          <el-form-item label="打印尺寸">
            <el-select v-model="printForm.paperType">
              <el-option v-for="(item, i) in paperOptions" :key="i" :value="item.value" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <!-- <template v-if="printForm.printType === 'custom'">
          <el-form-item label="宽(mm)">
            <el-input v-model="printForm.width"></el-input>
          </el-form-item>
          <el-form-item label="高(mm)">
            <el-input v-model="printForm.height"></el-input>
          </el-form-item>
        </template> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="default" @click="jumpToPicPrint">浏览器打印</el-button>
        <template v-if="LODOP">
          <el-button type="primary" @click="() => lodopToPicPrint(true)">控件打印预览</el-button>
          <el-button type="primary" @click="lodopToPicPrint">控件打印</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  generatePrintPic
} from '@/api/archCatalog'
import { getRealFileUrl } from '@/libs/env'
import { paperMap, paperOptions } from './printPaper'
import { getLODOP } from './lodop'

export default {
  data() {
    return {
      LODOP: null,
      paperOptions,
      printForm: {
        picPath: '',
        printType: 'standard',
        paperType: 'A4',
        width: '',
        height: ''
      },
      printFormVisible: false
    }
  },
  mounted() {
    getLODOP().then(LODOP => {
      this.LODOP = LODOP
    }).catch(e => {
      console.log(e)
      alert('请先安装打印控件！')
    })
  },
  methods: {
    show(picPath) {
      this.printForm.picPath = picPath.replace('/fileService/', '')
      this.printFormVisible = true
    },
    hide() {
      this.printFormVisible = false
    },
    generatePic() {
      const { picPath, paperType } = this.printForm
      const paper = paperMap[paperType]
      return new Promise((resolve, reject) => {
        return generatePrintPic({
          paperWidth: paper.width,
          paperHeight: paper.height,
          picPath: picPath
        }).then(res => {
          resolve(res.response)
        }).catch(e => {
          reject(e)
        })
      })
    },
    jumpToPicPrint() {
      this.generatePic().then(pic => {
        this.hide()
        window.open(`/print?moduleType=pic&actionType=print&picPath=${pic}`)
      })
    },
    AddPrintImg(pic) {
      const { LODOP } = this
      const { paperType } = this.printForm
      const paper = paperMap[paperType]
      LODOP.ADD_PRINT_IMAGE(0, 0, `${paper.width}mm`, `${paper.height}mm`, `<img border='0' src='${getRealFileUrl(pic)}' />`)
    },
    lodopToPicPrint(isPreview = false) {
      this.generatePic().then(pic => {
        const { LODOP } = this
        const { paperType } = this.printForm
        const paper = paperMap[paperType]
        this.hide()
        // LODOP.PRINT_INITA('图片打印')
        LODOP.SET_PRINT_PAGESIZE(0, `${paper.width}mm`, `${paper.height}mm`, paperType)
        this.AddPrintImg(pic)
        LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2)
        if (isPreview) {
          LODOP.PREVIEW()
        } else {
          LODOP.PRINT()
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
</style>
