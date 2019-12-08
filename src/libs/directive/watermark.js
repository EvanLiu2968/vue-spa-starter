function generateWatermark(el = document.body, settings = {}) {
  // 默认设置
  const defaultSettings = {
    watermark_txt: 'text',
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 20, // 水印起始位置Y轴坐标
    watermark_rows: 50, // 水印行数
    watermark_cols: 20, // 水印列数
    watermark_x_space: 100, // 水印x轴间隔
    watermark_y_space: 30, // 水印y轴间隔
    watermark_color: '#aaa', // 水印字体颜色
    watermark_alpha: 0.4, // 水印透明度
    watermark_fontsize: '15px', // 水印字体大小
    watermark_font: '微软雅黑', // 水印字体
    watermark_width: 100, // 水印宽度
    watermark_height: 80, // 水印长度
    watermark_angle: 15// 水印倾斜度数
  }
  // 采用配置项替换默认值，作用类似jquery.extend
  for (const key in settings) {
    if (settings[key] && defaultSettings[key] && settings[key] === defaultSettings[key]) {
      continue
    } else if (settings[key]) {
      defaultSettings[key] = settings[key]
    }
  }

  const oTemp = document.createDocumentFragment()

  // 获取页面最大宽度
  let page_width = Math.max(el.scrollWidth, el.clientWidth)
  const cutWidth = page_width * 0.0150
  page_width = page_width - cutWidth
  // 获取页面最大高度
  const page_height = Math.max(el.scrollHeight, el.clientHeight) + 450
  // let page_height = el.scrollHeight+el.scrollTop;
  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
    defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space))
    defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1))
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
    defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))
    defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1))
  }
  let x
  let y
  for (let i = 0; i < defaultSettings.watermark_rows; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i
    for (let j = 0; j < defaultSettings.watermark_cols; j++) {
      x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j

      const mask_div = document.createElement('div')
      mask_div.id = 'mask_div' + i + j
      mask_div.className = 'mask_div'
      mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt))
      // 设置水印div倾斜显示
      mask_div.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.visibility = ''
      mask_div.style.position = 'absolute'
      mask_div.style.left = x + 'px'
      mask_div.style.top = y + 'px'
      mask_div.style.overflow = 'hidden'
      mask_div.style.zIndex = '9999'
      mask_div.style.pointerEvents = 'none'// pointer-events:none  让水印不遮挡页面的点击事件
      // mask_div.style.border="solid #eee 1px";
      mask_div.style.opacity = defaultSettings.watermark_alpha
      mask_div.style.fontSize = defaultSettings.watermark_fontsize
      mask_div.style.fontFamily = defaultSettings.watermark_font
      mask_div.style.color = defaultSettings.watermark_color
      mask_div.style.textAlign = 'center'
      mask_div.style.width = defaultSettings.watermark_width + 'px'
      mask_div.style.height = defaultSettings.watermark_height + 'px'
      mask_div.style.display = 'block'
      oTemp.appendChild(mask_div)
    }
  }
  el.appendChild(oTemp)
  // return oTemp
}

const watermark = {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function(el, binding) {
    const watermark_txt = binding.value || 'Github - EvanLiu2968'
    el.style.overflow = 'hidden'
    generateWatermark(el, { watermark_txt })
  },
  update: function(el, binding) {
    // TODO: 更新水印
  }
}

const install = function(Vue) {
  Vue.directive('watermark', watermark)
}

if (window.Vue) {
  window['watermark'] = watermark
  Vue.use(install); // eslint-disable-line
}

watermark.install = install
export default watermark