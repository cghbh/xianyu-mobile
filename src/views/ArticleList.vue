<template>
  <div class="xianyu-article-list">
    <back-top title="好文列表"></back-top>
    <div class="pull-refresh-container" ref="pull-refresh-article-container" id="pull-refresh-article-container">
      <van-pull-refresh v-model="pullRefresh" @refresh="onPullRefresh">
        <van-list
          v-model="pullUp"
          :finished="pullUpfinished"
          finished-text="没有更多了"
          @load="pullUpHandle">
          <article-item
            v-for="(item, index) in articles"
            :article="item"
            :key="item._id"
            :no-margin-bottom="index === (articles.length - 1)"
            @click="$router.push(`/article-detail/${item._id}`)"></article-item>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
import { getArticleList } from '@/api/article.js'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  data () {
    return {
      // 当前请求的分页页码
      currentPage: 1,
      articles: [],
      articleScrollTop: 0,
      // 上拉加载
      pullRefresh: false,
      // 上拉加载
      pullUp: false,
      // 上拉加载完成
      pullUpfinished: false
    }
  },
  mounted () {
    this.getArticleListHandle()
    document.getElementById('pull-refresh-article-container').addEventListener('scroll', debounce(this.scrollHandle, 30))
  },
  activated () {
    this.$refs['pull-refresh-article-container'].scrollTop = this.articleScrollTop
  },
  beforeDestroy () {
    document.getElementById('pull-refresh-article-container').removeEventListener('scroll', this.scrollHandle, true)
  },
  components: {
    ArticleItem
  },
  methods: {
    async getArticleListHandle () {
      const result = await getArticleList(this.currentPage)
      if (result.errno === 0) {
        this.articles = result.data
      }
    },
    scrollHandle () {
      this.articleScrollTop = this.$refs['pull-refresh-article-container'].scrollTop
    },
    async onPullRefresh () {
      // 刷新页面。重置数据起始页
      this.currentPage = 1
      const result = await getArticleList(this.currentPage)
      if (result.errno === 0) {
        this.articles = result.data
        this.$toast('刷新成功')
        this.pullRefresh = false
      }
    },
    // 上拉加载更多
    pullUpHandle () {
      setTimeout(() => {
        this.pullUp = false
        // this.pullUpfinished = true
      }, 2000)
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
</style>
