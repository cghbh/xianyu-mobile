<template>
  <div id="app">
    <keep-alive :include="cachedPages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userLikeDynamics } from './api/user.js'
export default {
  name: 'App',

  data () {
    return {
      a: {}
    }
  },

  watch: {
    userId (newVal) {
      if (newVal) {
        this.getUserZanDynamics(newVal)
      }
    }
  },

  mounted () {
    // 利用根组件只会渲染一次的特性，将已登录用户的点赞过的动态的id存储到vuex和localStorage中
    if (this.userId) {
      this.getUserZanDynamics(this.userId)
    }
  },

  computed: {
    ...mapState(['cachedPages']),

    userId () {
      return this.$store.state.token.userId
    }
  },

  methods: {
    // 获取已登陆用户赞过的动态
    async getUserZanDynamics (id) {
      const result = await userLikeDynamics(id)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach((item) => {
          tempArray.push(item._id)
        })
        this.$store.commit('updateLoginUserZanDynamicsId', tempArray)
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
