<template>
  <div class="xianyu-article-list">
    <back-top title="好文列表"></back-top>
    <div class="xianyu-article-list-container">
      <article-item
        v-for="(item, index) in articles"
        :article="item"
        :key="item._id"
        :no-margin-bottom="index === (articles.length - 1)"
        @click="$router.push(`/article-detail/${item._id}`)"></article-item>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
import { getArticleList } from '@/api/article.js'
export default {
  name: 'ArticleList',
  data () {
    return {
      // 当前请求的分页码
      currentPage: 1,
      articles: []
    }
  },
  mounted () {
    this.getArticleListHandle()
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
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-article-list {
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
