<template>
  <div class="xianyu-dynamic-recommend-r" ref="xianyu-dynamic-recommend-r" id="xianyu-dynamic-recommend-r">
    <van-pull-refresh
      v-model="pullDown"
      @refresh="onPullDownRefresh"
      v-if="recommendDynamics.length > 0"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
      <van-list
        v-model="loadMore"
        :finished="loadMoreFinished"
        :immediate-check="false"
        loading-text="正在飞奔中......"
        finished-text="别刷了,真的没有啦......"
        @load="onLoadMoreHandle"
      >
        <dynamic-item
          v-for="(item, index) in recommendDynamics"
          :key="item._id + Math.random()"
          :is-first="index === 0"
          :item-value="item"
          :is-like="isLogin && userZanedId.includes(item._id)"
          @unlike="userCancelZan(item._id)"
          @like="userZanHandle(item._id)"
        />
      </van-list>
    </van-pull-refresh>
    <van-empty v-cloak v-show="showNoRecommend && !showDynamicsTag" description="什么内容都没有哟" />
  </div>
</template>

<script>
import { getDynamics } from '@/api/dynamic.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
import { debounce } from 'lodash'
import { userLikeDynamics, unlikeDynamics, likeDynamics } from '@/api/user.js'
export default {
  name: 'DynamicRecommend',
  data () {
    return {
      // 下拉刷新的状态
      pullDown: false,
      recommendDynamics: [],
      // 是否点赞的状态
      isLike: true,
      // 避免出现没有数据的空状态闪烁
      showDynamicsTag: true,
      currentPage: 1,
      perPage: 20,
      // 上拉加载的状态
      loadMore: false,
      // 上拉加载完成状态
      loadMoreFinished: false,
      // 总的数据条数
      total: 0,
      scrollTop: 0,
      emptyImg: require('../assets/images/empty-image-default.png'),
      userZanedId: []
    }
  },
  computed: {
    showNoRecommend () {
      return this.recommendDynamics.length <= 0
    },
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    },
    userId () {
      return this.$store.state.token.userId
    },
    isLogin () {
      return this.$store.state.token.token
    }
  },
  mounted () {
    this.getRecommendDynamics()
    if (this.userId) {
      this.getUserZanDynamics()
    }
    this.$refs['xianyu-dynamic-recommend-r'].addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },
  activated () {
    this.$refs['xianyu-dynamic-recommend-r'].scrollTop = this.scrollTop
  },
  methods: {
    async getRecommendDynamics () {
      const result = await getDynamics(0, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.recommendDynamics = result.data
        this.total = result.total
        this.recommendDynamics.length > 0 ? (this.showDynamicsTag = true) : (this.showDynamicsTag = false)
      }
    },

    // 获取已登陆用户赞过的动态
    async getUserZanDynamics () {
      const result = await userLikeDynamics(this.userId)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => {
          tempArray.push(item._id)
        })
        this.userZanedId = tempArray
      }
    },

    // 下拉刷新
    async onPullDownRefresh () {
      this.currentPage = 1
      this.loadMore = false
      this.loadMoreFinished = false
      const result = await getDynamics(0, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.recommendDynamics = result.data
        this.pullDown = false
        this.total = result.total
        this.recommendDynamics.length > 0 ? (this.showDynamicsTag = true) : (this.showDynamicsTag = false)
        this.$toast('刷新成功')
      }
    },

    // 上拉加载操作
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getDynamics(0, ++this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.recommendDynamics = [...this.recommendDynamics, ...result.data]
        this.loadMore = false
      }
    },

    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-dynamic-recommend-r'].scrollTop
    },

    // 取消点赞
    async userCancelZan (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdIndex = this.userZanedId.indexOf(id)
        const index = this.recommendDynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        
        if (zanIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.recommendDynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.recommendDynamics, index, newDynamic)
          this.userZanedId.splice(zanIdIndex, 1)
        }
      }
    },

    async userZanHandle (id) {
      const result = await likeDynamics(id)
      if (result.errno === 0 && !this.userZanedId.includes(id)) {
        this.userZanedId.push(id)
        const index = this.recommendDynamics.findIndex(item => item._id === id)
        const newDynamic = JSON.parse(JSON.stringify(this.recommendDynamics[`${index}`]))
        newDynamic.zan_number++
        this.$set(this.recommendDynamics, index, newDynamic)
      }
    }
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-dynamic-recommend-r {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
