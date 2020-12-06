<template>
  <div class="xianyu-article-item" :class="{ 'no-margin-bottom': noMarginBottom }" @click="$emit('click')">
    <div class="xianyu-article-item-content">
      <h1 class="xianyu-article-item-content-title">{{ article.article_title }}</h1>
      <h3 class="xianyu-article-item-content-author">{{ article.article_author }}</h3>
      <p class="xianyu-article-item-content-about">{{ article.article_introduce }}</p>
    </div>
    <van-image
      width="80px"
      height="80px"
      fit="cover"
      :src="article.article_image"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
      <template v-slot:error>加载失败</template>
    </van-image>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    noMarginBottom: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-article-item {
  height: 140px;
  display: flex;
  padding: 10px 10px;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 12px;

  &-content {
    flex: 1;
    margin-right: 15px;

    &-title {
      font-size: 16px;
      margin-bottom: 10px;
      height: 22px;
      line-height: 22px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    &-author {
      font-size: 12px;
      color: #bbb;
      margin-bottom: 10px;
    }

    &-about {
      color: #666;
      font-size: 14px;
      line-height: 20px;
      height: 60px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}

.xianyu-article-item.no-margin-bottom {
  margin-bottom: 0;
}
</style>
