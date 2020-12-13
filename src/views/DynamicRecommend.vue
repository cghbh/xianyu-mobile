<template>
  <div class="xianyu-dynamic-recommend-r" ref="xianyu-dynamic-recommend-r" id="xianyu-dynamic-recommend-r">
    <van-pull-refresh
      v-model="isRecommendLoading"
      @refresh="onRecommendRefresh"
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
        <homepage-item
          @like="itemLikeHandle"
          @unlike="itemUnlikeHandle(item._id)"
          v-for="(item, index) in recommendDynamics"
          :key="item._id + Math.random()"
          :is-first="index === 0"
          :itemValue="item"
          :is-like="isLike" />
      </van-list>
    </van-pull-refresh>
    <van-empty v-cloak v-show="showNoRecommend && !showDynamicsTag" description="什么内容都没有哟" />
  </div>
</template>

<script>
import { getDynamics } from '@/api/dynamic.js'
import HomepageItem from '@/components/Homepage/HomepageItem.vue'
import { debounce } from 'lodash'
export default {
  name: 'DynamicRecommend',
  data () {
    return {
      // 下拉刷新的状态
      isRecommendLoading: false,
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
      emptyImg: require('../assets/images/empty-image-default.png')
    }
  },
  computed: {
    showNoRecommend () {
      return this.recommendDynamics.length <= 0
    },
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  mounted () {
    this.getRecommendDynamics()
    document.getElementById('xianyu-dynamic-recommend-r').addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },
  activated () {
    console.log('组件激活')
    this.$refs['xianyu-dynamic-recommend-r'].scrollTop = this.scrollTop
  },
  methods: {
    async getRecommendDynamics () {
      console.log('执行次数')
      const result = await getDynamics(0, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.recommendDynamics = result.data
        this.total = result.total
        this.recommendDynamics.length > 0 ? (this.showDynamicsTag = true) : (this.showDynamicsTag = false)
      }
    },
    // 下拉刷新
    async onRecommendRefresh () {
      this.currentPage = 1
      this.loadMore = false
      this.loadMoreFinished = false
      const result = await getDynamics(0, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.recommendDynamics = result.data
        this.isRecommendLoading = false
        this.total = result.total
        this.recommendDynamics.length > 0 ? (this.showDynamicsTag = true) : (this.showDynamicsTag = false)
        this.$toast('刷新成功')
      }
    },

    // 点赞
    itemLikeHandle () {},

    // 取消点赞
    itemUnlikeHandle (id) {
      console.log(id, 'id号')
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
    }
  },
  components: {
    HomepageItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-dynamic-recommend-r {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
