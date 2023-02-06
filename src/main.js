/* eslint-disable no-console */
// import 'core-js'
// 入口文件
import count from './js/count'
import sum from './js/sum'
import { add } from './js/math'
// css
import './css/index.css'
// less
import './css/main.less'
// scss
import './css/app.scss'
// stylus
import './css/test.styl'

// font
import './static/font/iconfont.js'

console.log(count(2))
console.log(sum(2, 3, 4, 1))

add(1, 2)

// 模块热替换对css有用，对js没用
// 我们需要手动的添加模块热替换js文件
if (module.hot) {
  module.hot.accept('./js/count.js')
  module.hot.accept('./js/sum.js')
}
// 那开发过程中有很多js文件都要手动添加吗? 不，像vue-loader和react-loader已经帮我们实现了
const pro = new Promise((resolve, reject) => {
  resolve(1)
})

console.log('serviceWorker' in navigator)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('SW registered: ', registration)
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
