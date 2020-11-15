import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole'

import RefreshIcon from './components/PublicComponents/RefreshIcon.js'
// 顶部返回栏
import BackTop from './components/BackTop/index.js'

import './assets/style/reset.css'
import './vant/index.js'
import 'lib-flexible/flexible'
import './assets/style/iconfont.css'

// 根据环境来使用vConsole，避免ESlint错误
var vc = new VConsole() // eslint-disable-line no-unused-vars

Vue.use(RefreshIcon)
Vue.use(BackTop)

Vue.config.productionTip = false

// 全局的filter过滤器
Vue.filter('timeformat', (value) => {
  const timeDiff = (Date.now() - new Date(value)) / 1000

  // 区分为5分钟，1小时，12小时，1天，2天
  let timeString = ''
  if (!Number.isNaN(timeDiff)) {
    if (timeDiff <= 60) {
      timeString = `${Math.floor(timeDiff)}秒钟前`
    } else if (timeDiff >= 60 && timeDiff < 60 * 60) {
      timeString = `${Math.floor(timeDiff / 60)}分钟前`
    } else if (timeDiff >= 60 * 60 && timeDiff < 24 * 60 * 60) {
      timeString = `${Math.floor(timeDiff / (60 * 60))}小时前`
    } else {
      timeString = `${Math.floor(timeDiff / (60 * 60 * 24))}天前`
    }
  }
  return timeString
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
