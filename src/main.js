import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole'
import moment from 'moment'

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
  const newTime = moment(value).format('YYYY-MM-DD hh:mm')
  return newTime
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
