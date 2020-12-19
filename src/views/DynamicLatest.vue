<template>
  <div class="xianyu-dynamic-latest-r" ref="xianyu-dynamic-latest-r">
    <van-pull-refresh
      v-model="pullDown"
      v-if="latestDynamics.length > 0"
      @refresh="onLatestRefresh"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
      <div class="homepage-newest">
        <van-list
          v-model="loadMore"
          :finished="loadMoreFinished"
          :immediate-check="false"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoadMoreHandle">
          <dynamic-item
            v-for="(item, index) in latestDynamics"
            :key="item._id"
            :is-first="index === 0"
            :item-value="item"
            />
        </van-list>
      </div>
    </van-pull-refresh>
    <van-empty v-if="showNoLatest && showTag" description="什么内容都没有" />
  </div>
</template>

<script>
import { getDynamics } from '@/api/dynamic.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
import { debounce } from 'lodash'
export default {
  name: 'DynamicLatest',
  data () {
    return {
      latestDynamics: [],
      // 下拉刷新
      pullDown: false,
      currentPage: 1,
      // 总的页数
      total: 0,
      // 每页展示的数据
      perPage: 20,
      // 避免初始情况下数据加载出现没有数据的空白展示页
      showTag: false,
      // 上拉加载更多
      loadMore: false,
      // 上拉加载结束
      loadMoreFinished: false,
      // 滚动高度纪录
      scrollTop: 0
    }
  },
  mounted () {
    console.log('渲染')
    this.getLatestDynamics()
    this.$refs['xianyu-dynamic-latest-r'].addEventListener('scroll', debounce(this.pageScrollTop, 30))
  },

  watch: {
    latestDynamics (newVal) {
      if (newVal.length <= 0) {
        this.showTag = true
      } else {
        this.showTag = false
      }
    }
  },

  activated () {
    this.$refs['xianyu-dynamic-latest-r'].scrollTop = this.scrollTop
  },

  beforeDestroy () {
    this.$refs['xianyu-dynamic-latest-r'].removeEventListener('scroll', this.pageScrollTop, true)
  },

  computed: {
    showNoLatest () {
      return this.latestDynamics.length <= 0
    },
    // 总页数
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    async getLatestDynamics () {
      const result = await getDynamics(1, this.currentPage)
      if (result.errno === 0) {
        this.latestDynamics = result.data
        this.total = result.total
        if (this.latestDynamics.length <= 0) {
          this.showTag = true
        }
      }
    },
    
    // 纪录滚动的高度
    pageScrollTop () {
      this.scrollTop = this.$refs['xianyu-dynamic-latest-r'].scrollTop
    },
    
    // 下拉刷新
    async onLatestRefresh () {
      this.currentPage = 1
      const result = await getDynamics(1, this.currentPage)
      if (result.errno === 0) {
        this.latestDynamics = result.data
        this.total = result.total
        this.pullDown = false
        this.$toast({ message: '刷新成功', duration: 800 })
      }
    },

    // 上拉加载更多
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getDynamics(1, ++this.currentPage)
      if (result.errno === 0) {
        this.latestDynamics = [...this.latestDynamics, ...result.data]
        this.loadMore = false
      }
    }
  },
  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-dynamic-latest-r {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
