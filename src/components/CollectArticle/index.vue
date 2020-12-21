<template>
  <div class="xianyu-collect-article" ref="xianyu-collect-article">
    <divide-area :height="8"></divide-area>
    <article-item
      v-for="(item, index) in articles"
      :article="item"
      :key="item._id"
      :no-margin-bottom="index === articles.length - 1"
      @click="$router.push(`/article-detail/${item._id}`)"
    />
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
import { debounce } from 'lodash'
export default {
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      scrollTop: 0
    }
  },

  components: {
    ArticleItem
  },

  activated () {
    this.$refs['xianyu-collect-article'].scrollTop = this.scrollTop
  },

  mounted () {
    this.$refs['xianyu-collect-article'].addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },

  beforeDestroy () {
    this.$refs['xianyu-collect-article'].removeEventListener('scroll', this.scrollTopHandle, true)
  },

  methods: {
    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-collect-article'].scrollTop
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-collect-article {
  height: calc(100vh - 94px);
  background-color: rgba(38, 38, 38, 0.05);
  overflow-y: auto;

  /deep/ .xianyu-article-item {
    margin-bottom: 0;
    border-bottom: 1px solid #efefef;
  }
}
</style>
