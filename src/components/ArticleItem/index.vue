<template>
  <div class="xianyu-article-item" :class="{ 'no-margin-bottom': noMarginBottom }">
    <div class="xianyu-article-item-content">
      <h1 class="xianyu-article-item-content-title">人生永远没有太晚的开始</h1>
      <h3 class="xianyu-article-item-content-author">摩西奶奶</h3>
      <p class="xianyu-article-item-content-about">我不知怎样生活的更美好，我能做的只是尽力接纳生活赋予我的这一切内容。</p>
    </div>
    <van-image
      width="80px"
      height="80px"
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
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
    }

    &-author {
      font-size: 12px;
      color: #bbb;
      margin-bottom: 10px;
    }

    &-about {
      color: #666;
      font-size: 13px;
      line-height: 20px;
    }
  }
}

.xianyu-article-item.no-margin-bottom {
  margin-bottom: 0;
}
</style>
