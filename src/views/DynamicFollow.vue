<template>
  <div class="xianyu-dynamic-my-follow" ref="xianyu-dynamic-my-follow">
    <van-pull-refresh
      v-model="pullDown"
      @refresh="pullDownRefresh"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
      <!-- 正常的内容显示 -->
      <van-list
        v-model="loadMore"
        :finished="loadMoreFinished"
        :immediate-check="false"
        loading-text="正在飞奔中......"
        finished-text="别刷了,真的没有啦......"
        @load="onLoadMoreHandle"
      >
        <dynamic-item
          v-for="(item, index) in followDynamics"
          :key="item._id"
          :is-first="index === 0"
          :item-value="item"
          :is-like="isLogin && userZanedId.includes(item._id)"
          :is-collect="isLogin && userCollectedId.includes(item._id)"
          @unlike="userCancelZanHandle(item._id)"
          @like="userZanHandle(item._id)"
          @uncollect="userCancelCollect(item._id)"
          @collect="userCollectHandle(item._id)"
        />
      </van-list>
      
    </van-pull-refresh>

     <!-- 未登录 -->
    <div class="dynamic-follow-unlogin" v-if="!isLogin">
       <p class="dynamic-follow-unlogin-tips">需要登录，或登录已过期需要重新登录</p>
       <a class="dynamic-follow-unlogin-link"
         @click="$router.replace({ path: '/login', query: { redirect: '/dynamic' } })"
       >
        去登录
      </a>
    </div>

    <!-- 我的关注空状态 -->
    <van-empty
      v-if="!showTag && isLogin"
      description="什么内容都没有"
      :image="emptyImg"
    />
  </div>
</template>

<script>
import { getFollowUserDynamcis, userLikeDynamics, unlikeDynamics, likeDynamics, userCancelCollectDynamics, userCollectDynamics, getUserCollectedDynamics } from '@/api/user.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
import { debounce } from 'lodash'
export default {
  name: 'DynamicFollow',
  data () {
    return {
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 下拉刷新状态
      pullDown: false,
      loadMore: false,
      loadMoreFinished: false,
      followDynamics: [],
      // 记录回滚的高度
      scrollTop: 0,
      total: 0,
      perPage: 15,
      currentPage: 1,
      // 用来防止页面数据未加载状态下的闪烁
      showTag: true,
      // 用户赞过的动态的id
      userZanedId: [],
      userCollectedId: []
    }
  },

  mounted () {
    if (this.userId) {
      this.getFollowUserDynamcisHandle()
      this.getUserZanedDynamicsId()
      this.getUserCollectedDynamicsHandle()
    }
    this.$refs['xianyu-dynamic-my-follow'].addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },

  activated () {
    this.$refs['xianyu-dynamic-my-follow'].scrollTop = this.scrollTop
  },

  beforeDestroy () {
    this.$refs['xianyu-dynamic-my-follow'].removeEventListener('scroll', this.scrollTopHandle, true)
  },

  computed: {
    // 判断当前用户是否登陆
    isLogin () {
      return this.$store.state.token.token
    },

    // 获取已登陆用户的id
    userId () {
      return this.$store.state.token.userId
    },

    // 总的页数
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    async getFollowUserDynamcisHandle () {
      const result = await getFollowUserDynamcis(this.userId, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.followDynamics = result.data
        this.total = result.total
        if (this.followDynamics.length <= 0) {
          this.showTag = false
        }
      }
    },

    // 获取指定id用户点赞过的动态id数组
    async getUserZanedDynamicsId () {
      const result = await userLikeDynamics(this.userId)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => {
          tempArray.push(item._id)
        })
        this.userZanedId = tempArray
      }
    },

    // 获取已登陆用户收藏的动态
    async getUserCollectedDynamicsHandle () {
      const result = await getUserCollectedDynamics(this.userId)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => {
          tempArray.push(item._id)
        })
        this.userCollectedId = tempArray
      }
    },
    
    // 下拉刷新
    async pullDownRefresh () {
      this.currentPage = 1
      this.loadMoreFinished = false
      this.loadMore = false
      this.pullDown = false
      const result = await getFollowUserDynamcis(this.userId, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.followDynamics = result.data
        this.total = result.total
        if (this.followDynamics.length <= 0) {
          this.showTag = false
        }
        this.$toast('刷新成功')
      }
    },

    // 上拉加载更多
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getFollowUserDynamcis(this.userId, ++this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.followDynamics = [...this.followDynamics, ...result.data]
        this.loadMore = false
      }
    },

    async userZanHandle (id) {
      const result = await likeDynamics(id)
      if (result.errno === 0 && !this.userZanedId.includes(id)) {
        this.userZanedId.push(id)
        const index = this.followDynamics.findIndex(item => item._id === id)
        const newDynamic = JSON.parse(JSON.stringify(this.followDynamics[`${index}`]))
        newDynamic.zan_number++
        this.$set(this.followDynamics, index, newDynamic)
      }
    },

    // 取消点赞
    async userCancelZanHandle (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdIndex = this.userZanedId.indexOf(id)
        const index = this.followDynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.followDynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.followDynamics, index, newDynamic)
          this.userZanedId.splice(zanIdIndex, 1)
        }
      }
    },

    // 取消收藏
    async userCancelCollect (id) {
      const result = await userCancelCollectDynamics(id)
      if (result.errno === 0) {
        const collectIdIndex = this.userCollectedId.indexOf(id)
        const index = this.followDynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (collectIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.followDynamics[`${index}`]))
          newDynamic.collect_number--
          this.$set(this.followDynamics, index, newDynamic)
          this.userCollectedId.splice(collectIdIndex, 1)
        }
      }
    },

    // 收藏操作
    async userCollectHandle (id) {
      const result = await userCollectDynamics(id)
      if (result.errno === 0 && !this.userCollectedId.includes(id)) {
        this.userCollectedId.push(id)
        const index = this.followDynamics.findIndex(item => item._id === id)
        const newDynamic = JSON.parse(JSON.stringify(this.followDynamics[`${index}`]))
        newDynamic.collect_number++
        this.$set(this.followDynamics, index, newDynamic)
      }
    },

    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-dynamic-my-follow'].scrollTop
    }
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-dynamic-my-follow {
  background-color: #F0F5FB;
  height: calc(100vh - 94px);
  overflow-y: auto;
}

.dynamic-follow-unlogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F0F5FB;
  height: calc(100vh - 94px);
  
  &-tips {
    font-size: 16px;
  }

  &-link {
    font-size: 14px;
    margin-top: 30px;
    padding: 10px 20px;
    background-color: #409fea;
    color: #fff;
    border-radius: 6px;
  }
}
</style>
