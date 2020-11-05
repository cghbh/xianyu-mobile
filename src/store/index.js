import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: JSON.parse(localStorage.getItem('token')),
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  mutations: {
    // 设置用户的基本信息
    setUserInfo (state, value) {
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value))
    },

    // 设置token
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', JSON.stringify(value))
    }
  },
  actions: {
  },
  modules: {
  }
})
