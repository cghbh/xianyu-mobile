<template>
  <div class="xianyu-my-like">
    <back-top title="我的点赞"></back-top>
    <div class="xianyu-my-like-container">
      <dynamic-item
        v-for="(item, index) in dynamics"
        :key="item._id"
        :is-first="index === 0"
        :item-value="item"
        :delete-operate="true"
        @operate="operateHandle(item._id)"
      />
    </div>
  </div>
</template>

<script>
import { userLikeDynamics } from '../api/user.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
export default {
  name: 'MyLike',

  data () {
    return {
      dynamics: []
    }
  },

  mounted () {
    this.userLikeDynamicsHandle()
  },

  methods: {
    // 获取我点赞过的动态
    async userLikeDynamicsHandle () {
      const result = await userLikeDynamics(this.userId)
      if (result.errno === 0) {
        this.dynamics = result.data
      }
    }
  },

  computed: {
    // 是否登录
    isLogin () {
      return this.$store.state.token.token
    },
    
    // 已登录用户的id
    userId () {
      return this.$store.state.token.userId
    }
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-my-like {
  &-container {
    position: fixed;
    top: 46px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #f0f5fb;
    overflow-y: auto;
  }
}
</style>
