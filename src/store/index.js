import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_TOKEN_KEY = 'xianyu_user_login_token'
const SEARCH_KEY_WORD = 'xianyu_user_search_key_words'

export default new Vuex.Store({
  state: {
    token: getItem(USER_TOKEN_KEY) || {},
    searchKeyWords: getItem(SEARCH_KEY_WORD) || []
  },
  mutations: {
    // 设置token
    setToken (state, value) {
      state.token = { token: value }
      setItem(USER_TOKEN_KEY, state.token)
    },
    addSearchKeyWords (state, word) {
      state.searchKeyWords.unshift(word)
      state.searchKeyWords = [...new Set(state.searchKeyWords)]
      setItem(SEARCH_KEY_WORD, state.searchKeyWords)
    },
    clearSearchKeyWords (state) {
      state.searchKeyWords = []
      setItem(SEARCH_KEY_WORD, state.searchKeyWords)
    }
  },
  actions: {
  },
  modules: {
  }
})
