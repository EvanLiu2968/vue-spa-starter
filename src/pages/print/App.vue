<template>
  <div id="app">
    <div class="app-printer">
      <div v-if="actionType === 'preview' && canPrint" class="preview-tools">
        <button type="button" class="el-button el-button--primary" @click="print"><span>打 印</span></button>
      </div>
      <component :is="moduleType" @complete="componentComplete"></component>
    </div>
  </div>
</template>

<script>
import { getQuery } from '@/libs/tool'
import Pic from './modules/picture'

export default {
  name: 'App',
  components: {
    Pic
  },
  data() {
    const query = getQuery(window.location.search)
    console.log('xx')
    return {
      canPrint: false,
      moduleType: query.moduleType,
      actionType: query.actionType || 'preview'
    }
  },
  methods: {
    componentComplete() {
      this.canPrint = true
      if (this.actionType === 'print') {
        this.print()
      }
    },
    print() {
      window.print()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "~THEME_VAR.scss";
.app-printer {
  width: 210mm;
  margin:0 auto;
  .preview-tools {
    padding: 10px 0;
    text-align: right;
  }
  .printer-title {
    margin: 10px 0;
    text-align: center;
  }
  .printer-table {
    width: 100%;
      tr th, tr td {
      padding: 10px;
    }
  }
  .printer-image {
    max-width: 100%;
    height: auto;
  }
}
@media print {
  .app-printer {
    width: auto;
    .preview-tools {
      display: none;
    }
  }
}
</style>
