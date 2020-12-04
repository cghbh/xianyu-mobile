<template>
  <div class="xianyu-article-list">
    <back-top title="好文列表"></back-top>
    <div class="xianyu-article-list-container">
      <article-item v-for="item in 20" :key="item" :no-margin-bottom="item === 20"></article-item>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
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
