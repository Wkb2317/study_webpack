import count from './count'

/**
 * @description
 * @param {*} a
 * @param {*} b
 * @returns {*}
 */
export function add(a, b) {
  return a + b
}

console.log(count(1))

const button = document.querySelector('.double')
button.addEventListener('click', () => {
  import(/* webpackChunkName: "math" */'./double.js').then((res) => {
    console.log(res.default(20))
  }).catch(() => {
    console.log('模块加载失败');
  })
})