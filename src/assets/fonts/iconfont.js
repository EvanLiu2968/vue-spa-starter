;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-liebiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M187.392 70.656q28.672 0 48.64 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t47.616-19.456l54.272 0zM889.856 70.656q27.648 0 47.616 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t48.64-19.456l437.248 0zM187.392 389.12q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t47.616-19.968l54.272 0zM889.856 389.12q27.648 0 47.616 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t48.64-19.968l437.248 0zM187.392 708.608q28.672 0 48.64 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t47.616-19.968l54.272 0zM889.856 708.608q27.648 0 47.616 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t48.64-19.968l437.248 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-home7" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 128c0 0-263.936 227.84-411.424 351.232-8.672 7.84-15.232 19.296-15.232 32.768 0 23.584 19.072 42.656 42.656 42.656l85.344 0 0 298.656c0 23.584 19.072 42.656 42.656 42.656l128 0c23.584 0 42.656-19.104 42.656-42.656l0-170.656 170.656 0 0 170.656c0 23.552 19.072 42.656 42.656 42.656l128 0c23.584 0 42.656-19.072 42.656-42.656l0-298.656 85.344 0c23.584 0 42.656-19.072 42.656-42.656 0-13.472-6.56-24.928-16.352-32.768-146.464-123.392-410.336-351.232-410.336-351.232z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-password" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M773.022898 437.411211 773.022898 325.525981c0 0-0.030699-261.026992-261.026992-261.026992-260.989129 0-261.019829 261.026992-261.019829 261.026992l0 111.88523-65.276702 0c-25.744337 0-46.614667 20.87033-46.614667 46.614667l0 428.861488c0 25.744337 20.87033 46.614667 46.614667 46.614667l652.600225 0c25.744337 0 46.614667-20.87033 46.614667-46.614667L884.914268 484.025878c0-25.744337-20.87033-46.614667-46.614667-46.614667L773.022898 437.411211 773.022898 437.411211zM549.284161 725.390042l0 98.912777c0 12.872169-10.434653 23.306822-23.306822 23.306822l-27.956725 0c-12.872169 0-23.306822-10.434653-23.306822-23.306822l0-98.912777c-22.181185-12.923334-37.282115-36.729529-37.282115-64.234977 0-41.222867 33.412994-74.603115 74.565253-74.603115 41.159422 0 74.572416 33.380248 74.572416 74.603115C586.605162 688.661535 571.503209 712.467731 549.284161 725.390042M698.457646 437.378465 325.541331 437.378465 325.541331 326.011029c0.415462-31.240515 11.404748-186.94167 186.454576-186.94167 175.056991 0 186.04423 155.701155 186.461739 186.456622L698.457646 437.378465 698.457646 437.378465zM698.457646 437.378465"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)