import Icon from './icon'
import FileUpload from './file-upload/upload'
import Table from './table'

const components = [
  Icon,
  Table,
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
