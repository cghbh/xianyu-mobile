import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_TOKEN_KEY = 'xianyu_user_login_token'
const SEARCH_KEY_WORD = 'xianyu_user_search_key_words'
const READ_JOKES = 'xianyu_user-read-jokes'

export default new Vuex.Store({
  state: {
    token: getItem(USER_TOKEN_KEY) || {},
    searchKeyWords: getItem(SEARCH_KEY_WORD) || [],
    // 存储已读的段子，如果已登录则推送到服务端
    readJokes: []
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
    },
    addReadJokes (state, id) {
      state.readJokes.push(id)
      state.readJokes = [...new Set(state.readJokes)]
      setItem(READ_JOKES, state.readJokes)
    }
  },
  actions: {
  },
  modules: {
  }
})
