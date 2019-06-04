// lodop 打印控件
import { getLodop } from './LodopFuncs'

try {
  getLodop()
} catch (e) {
  // console.log(e)
}

export function getLODOP() {
  return new Promise((resolve, reject) => {
    let t = 0
    const load = () => {
      try {
        const LODOP = getLodop()
        resolve(LODOP)
      } catch (e) {
        if (t < 10) {
          t++
          setTimeout(() => {
            load()
          }, 500)
        } else {
          reject(e)
        }
      }
    }
    load()
  })
}
