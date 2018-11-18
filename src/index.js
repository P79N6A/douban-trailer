import './assets/common.sass'
function changeTitle() {
  window.$('#app').html('打个包包')
}

setTimeout(() => {
  changeTitle()
}, 2000)
