import Icon from './Icon'
import FileUpload from './file-upload/upload'
import Table from './table'
import VCharts from './vue-echarts'

const components = [
  // common
  Icon,
  Table,
  VCharts,
  FileUpload
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
