import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_TOKEN_KEY = 'xianyu_user_login_token'

export default new Vuex.Store({
  state: {
    token: getItem(USER_TOKEN_KEY) || {}
  },
  mutations: {
    // 设置token
    setToken (state, value) {
      state.token = { token: value }
      setItem(USER_TOKEN_KEY, state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
