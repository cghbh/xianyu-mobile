<template>
  <div class="xianyu-dynamic-latest-r">
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
            @itemlike="itemLikeHandle"
            @itemunlike="itemUnlikeHandle"
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
      loadMoreFinished: false
    }
  },
  mounted () {
    this.getLatestDynamics()
  },
  computed: {
    showNoLatest () {
      return this.latestDynamics.length <= 0
    },
    // 总页数
    totalPage () {
      return Math.ceil(this.total / this.perPages)
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
    
    // 下拉刷新
    onLatestRefresh () {},

    // 点赞
    itemLikeHandle () {},

    // 取消点赞
    itemUnlikeHandle () {},

    // 上拉加载更多
    onLoadMoreHandle () {}
  },
  components: {
    DynamicItem
  }
}
</script>

<style>
</style>
