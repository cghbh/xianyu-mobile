import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style/reset.css'
import './vant/index.js'
import 'lib-flexible/flexible'
import './assets/style/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
