<template>
  <div class="good-article">
    <van-sticky>
      <van-nav-bar sticky title="好文" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="good-article-content">
      <h1>{{ mock.title }}</h1>
      <h3>{{ mock.author }}</h3>
      <article v-html="mock.content"></article>
    </div>
  </div>
</template>

<script>
import MockData from '../mock/GoodArticle.js'
export default {
  name: 'GoodArticle',
  data () {
    return {
      mock: MockData
    }
  }
}
</script>

<style scoped lang="scss">
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }
}

.good-article {
  background-color: #fff;
  padding: 0 15px;
  
  h1 {
    font-size: 18px;
    font-weight: 700;
    color: rgba(0, 0, 0, .7);
    margin: 15px 0;
  }
  
  h3 {
    margin-bottom: 15px;
    font-size: 14px;
  }
  
  &-content {
    article {
      color: rgba(0, 0, 0, .6);
      font-size: 16px;
      line-height: 28px;
    }
  }
}
</style>
