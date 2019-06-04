import Vue from 'vue'
import loadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(loadingVue)

const defaults = {
  body: true,
  type: 'swell',
  text: '正在加载中',
  opacity: 0.5,
  minShowTime: 500,
  fullscreen: true,
  loading: false,
  didMount: false
}

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return
  options = Object.assign({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (options.target !== document.body) {
    options.fullscreen = false
  } else {
    options.body = true
  }

  const parent = options.body ? document.body : options.target
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })
  Vue.nextTick(() => {
    instance.show()
  })
  parent.appendChild(instance.$el)

  return instance
}

export default Loading
