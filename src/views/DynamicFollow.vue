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
          @itemlike="itemLikeHandle"
          @itemunlike="itemUnlikeHandle"
          v-for="(item, index) in followDynamics"
          :key="item._id"
          :isFirst="index === 0"
          :itemValue="item"
          :is-like="false"
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
import { getFollowUserDynamcis } from '@/api/user.js'
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
      showTag: true
    }
  },

  mounted () {
    if (this.userId) {
      this.getFollowUserDynamcisHandle()
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

    itemLikeHandle () {},

    itemUnlikeHandle () {},

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
  background-color: #fff;
  height: calc(100vh - 94px);
  overflow-y: auto;
}

.dynamic-follow-unlogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
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
