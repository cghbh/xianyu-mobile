<template>
  <div class="xianyu-article-list">
    <back-top title="好文列表"></back-top>
    <div class="pull-refresh-container" ref="pull-refresh-article-container" id="pull-refresh-article-container">
      <div class="article-skeleton-container" v-if="showSkeleton">
        <article-skeleton v-for="item in 4" :key="item + Math.random()"></article-skeleton>
      </div>
      <van-pull-refresh
        loosing-text="别老拽着,快放开我"
        loading-text="正在刷新中"
        success-text="刷新成功"
        v-else
        v-model="pullRefresh"
        @refresh="onPullRefresh">
        <van-list
          v-model="pullUp"
          :finished="pullUpfinished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="pullUpHandle">
          <article-item
            v-for="(item, index) in articles"
            :article="item"
            :key="item._id"
            :no-margin-bottom="index === (articles.length - 1)"
            @click="$router.push(`/article-detail/${item._id}`)"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
import ArticleSkeleton from '../components/Skeleton/ArticleSkeleton'
import { getArticleList } from '@/api/article.js'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  data () {
    return {
      // 当前请求的分页页码
      currentPage: 1,
      perPage: 20,
      articles: [],
      articleScrollTop: 0,
      // 下拉刷新
      pullRefresh: false,
      // 上拉加载
      pullUp: false,
      // 上拉加载完成
      pullUpfinished: false,
      total: 0,
      showSkeleton: true
    }
  },

  mounted () {
    this.getArticleListHandle()
    document.getElementById('pull-refresh-article-container').addEventListener('scroll', debounce(this.scrollHandle, 30))
  },

  computed: {
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },

  activated () {
    this.$refs['pull-refresh-article-container'].scrollTop = this.articleScrollTop
  },

  beforeDestroy () {
    this.$refs['pull-refresh-article-container'].removeEventListener('scroll', this.scrollHandle, true)
  },

  components: {
    ArticleItem,
    ArticleSkeleton
  },

  methods: {
    async getArticleListHandle () {
      const result = await getArticleList(this.currentPage)
      if (result.errno === 0) {
        this.articles = result.data
        this.total = result.total
        setTimeout(() => {
          this.showSkeleton = false
        }, 30)
      }
    },

    scrollHandle () {
      this.articleScrollTop = this.$refs['pull-refresh-article-container'].scrollTop
    },

    async onPullRefresh () {
      // 刷新页面,重置数据起始页
      this.currentPage = 1
      this.pullUp = false
      this.pullUpfinished = false
      const result = await getArticleList(this.currentPage)
      if (result.errno === 0) {
        this.articles = result.data
        this.$toast('刷新成功')
        this.pullRefresh = false
      }
    },
    
    async pullUpHandle () {
      if (this.currentPage >= this.totalPage) {
        this.pullUpfinished = true
        return
      }
      const result = await getArticleList(++this.currentPage)
      if (result.errno === 0) {
        this.articles = [...this.articles, ...result.data]
        this.pullUp = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pull-refresh {
  &-container {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(38, 38, 38, .05);
    overflow-y: auto;
  }
}

.article-skeleton-container {
  padding: 0 12px;
  /deep/ .skeleton-recomend-left-content {
    height: 90px!important;
  }
}
</style>
