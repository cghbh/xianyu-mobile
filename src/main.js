import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VConsole from 'vconsole'
import moment from 'moment'

// 顶部返回栏
import BackTop from './components/BackTop/index.js'
import DivideArea from './components/PublicComponents/DivideArea.js'

import './assets/style/reset.css'
import './vant/index.js'
import 'vant/lib/index.css'
import 'amfe-flexible/index.js'
import './assets/style/iconfont.css'

// 根据环境来使用vConsole，避免ESlint错误
var vc = new VConsole() // eslint-disable-line no-unused-vars

Vue.use(BackTop)
Vue.use(DivideArea)

Vue.config.productionTip = false

// 全局的filter过滤器
Vue.filter('timeformat', (value) => {
  const newTime = moment(value).format('YYYY-MM-DD HH:mm')
  return newTime
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
