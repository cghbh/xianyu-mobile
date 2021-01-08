import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VConsole from 'vconsole'

// 格式化时间，体积远小于moment
import dayjs from 'dayjs'
import Copy from 'vue-to-copy'

// 顶部返回栏
import BackTop from './components/BackTop/index.js'
import DivideArea from './components/PublicComponents/DivideArea.js'

// 骨架屏组件
import skeleton from 'tb-skeleton'

import './assets/style/reset.css'
import './vant/index.js'
import 'vant/lib/index.css'
import 'amfe-flexible/index.js'
import './assets/style/iconfont.css'
// 骨架屏组件的样式
import 'tb-skeleton/dist/skeleton.css'

// 根据环境来使用vConsole，避免ESlint错误
// var vc = new VConsole() // eslint-disable-line no-unused-vars

Vue.use(BackTop)
Vue.use(DivideArea)
Vue.use(Copy)
Vue.use(skeleton)

Vue.config.productionTip = false

// 全局的filter过滤器
Vue.filter('timeformat', (value) => {
  const newTime = dayjs(value).format('YYYY-MM-DD HH:mm')
  return newTime
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
