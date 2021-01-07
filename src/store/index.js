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
    readJokes: [],
    // 缓存的页面
    cachedPages: [],
    // 推荐的动态
    recommendDynamics: {
      data: [],
      total: 0
    },
    // 最新的动态
    latestDynamics: {
      data: [],
      total: 0
    }
  },
  mutations: {
    // 用户登陆，缓存token和userid备用
    setUserLoginState (state, value) {
      state.token = { token: value.token, userId: value.userId }
      setItem(USER_TOKEN_KEY, state.token)
    },

    // 缓存搜索的关键词
    addSearchKeyWords (state, word) {
      state.searchKeyWords.unshift(word)
      state.searchKeyWords = [...new Set(state.searchKeyWords)]
      setItem(SEARCH_KEY_WORD, state.searchKeyWords)
    },

    // 清除缓存的关键词
    clearSearchKeyWords (state) {
      state.searchKeyWords = []
      setItem(SEARCH_KEY_WORD, state.searchKeyWords)
    },

    // 缓存已阅读的段子的id
    addReadJokes (state, id) {
      state.readJokes.push(id)
      state.readJokes = [...new Set(state.readJokes)]
      setItem(READ_JOKES, state.readJokes)
    },

    // 添加页面缓存
    addCachedPages (state, page) {
      if (!state.cachedPages.includes(page)) {
        state.cachedPages.push(page)
      }
    },

    // 删除页面缓存
    removeCachedPages (state, page) {
      const index = state.cachedPages.indexOf(page)
      if (index > -1) {
        state.cachedPages.splice(index, 1)
      }
    },

    // 修改最新的动态数据
    modifyLatestDynamics (state, value) {
      state.latestDynamics.data = value.data
      if (value.total) {
        state.latestDynamics.total = value.total
      }
    },

    // 修改推荐的动态数据
    modifyRecommendDynamics (state, value) {
      state.recommendDynamics.data = value.data
      if (value.total) {
        state.recommendDynamics.total = value.total
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
