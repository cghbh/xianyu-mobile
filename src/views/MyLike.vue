<template>
  <div class="xianyu-my-like">
    <back-top title="我的点赞"></back-top>
    <div class="xianyu-my-like-container" ref="like" v-show="hasLikeWord">
      <dynamic-item
        v-for="(item, index) in dynamics"
        :key="item._id"
        :is-first="index === 0"
        :item-value="item"
        :is-like="isLogin && userZanedId.includes(item._id)"
        :show-operate="false"
        :delete-operate="true"
        @unlike="userCancelZan(item._id)"
      />
    </div>
    <van-empty 
      :image="emptyImg" 
      v-if="!hasLikeWord && showLikeTag" 
      class="user-like-empty"
      description="还没有给任何人点过赞哟，快去看看吧" 
    />
  </div>
</template>

<script>
import { userLikeDynamics, unlikeDynamics } from '../api/user.js'
import { debounce } from 'lodash'
import DynamicItem from '@/components/DynamicItem/index.vue'
export default {
  name: 'MyLike',

  data () {
    return {
      dynamics: [],
      // 缺省图片
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 是否显示缺省图片的标记
      showLikeTag: false,
      // 滚动的距离
      scrollTop: 0
    }
  },

  mounted () {
    this.userLikeDynamicsHandle()
    // 缓存控制
    this.$store.commit('addCachedPages', 'MyLike')
    // 记录页面滚动的高度距离
    if (this.$refs.like) {
      this.$refs.like.addEventListener('scroll', debounce(this.scrollTopHandle, 50))
    }
  },

  // 组件激活的时候重新设置高度
  activated () {
    this.$refs.like.scrollTop = this.scrollTop
  },

  // 组件销毁之前处理定时器的问题
  beforeDestroy () {
    this.$refs.like.removeEventListener('scroll', this.scrollTopHandle, true)
  },

  // 监听路由的离开情况
  beforeRouteLeave (to, from, next) {
    console.log(to.name)
    // 只要用户去的不是个人主页和动态详情页面，就销毁页面缓存重新加载
    // 否则增加缓存
    if (to.name === 'MyDetail' || to.name === 'DynamicDetail') {
      this.$store.commit('addCachedPages', 'MyLike')
    } else {
      this.$store.commit('removeCachedPages', 'MyLike')
    }
    next()
  },

  methods: {
    // 获取我点赞过的动态
    async userLikeDynamicsHandle () {
      const result = await userLikeDynamics(this.userId)
      if (result.errno === 0) {
        this.dynamics = result.data
        this.dynamics.length <= 0 ? this.showLikeTag = true : this.showLikeTag = false
      }
    },

    // 取消点赞，不需要判断是否登录的情况
    async userCancelZan (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdArray = JSON.parse(JSON.stringify(this.userZanedId))
        const zanIdIndex = zanIdArray.indexOf(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          zanIdArray.splice(zanIdIndex, 1)
          this.$store.commit('updateLoginUserZanDynamicsId', zanIdArray)
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
          newDynamic.zan_number--
          this.dynamics.splice(index, 1)
          // 找到store中的最新和推荐数据进行修改
          const recommendDynamics = JSON.parse(JSON.stringify(this.$store.state.recommendDynamics)).data
          const latestDynamics = JSON.parse(JSON.stringify(this.$store.state.latestDynamics)).data
          const recommendIndex = recommendDynamics.findIndex(item => item._id === id)
          const latestIndex = latestDynamics.findIndex(item => item._id === id)
          if (recommendIndex > -1) {
            recommendDynamics[recommendIndex].zan_number--
          }
          if (latestIndex > -1) {
            latestDynamics[latestIndex].zan_number--
          }
          this.$store.commit('modifyRecommendDynamics', { data: recommendDynamics })
          this.$store.commit('modifyLatestDynamics', { data: latestDynamics })
          this.$toast('取消点赞成功')
        }
      }
    },

    scrollTopHandle () {
      this.scrollTop = this.$refs.like.scrollTop
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
    },

    // 从vuex取得所有点赞过的动态id
    userZanedId () {
      return this.$store.state.loginUserZanDynamicsId
    },

    // 点赞过的动态数量大于0
    hasLikeWord () {
      return this.dynamics.length > 0
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

  .user-like-empty {
    position: fixed;
    padding-top: 0;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -50px;
  }
}
</style>
