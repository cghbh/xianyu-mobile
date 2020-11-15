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
      <h1 style="text-align: center;">{{ mock.title }}</h1>
      <h3 style="text-align: center;">{{ mock.author }}</h3>
      <article class="article-container" v-html="mock.content"></article>
      <div class="zan-collect">
        <div class="zan-collect-container" :class="{ 'active': isZan }" @click="isZan = !isZan">

          <i class="iconfont icon-dianzan" v-if="isZan"></i>
          <i class="iconfont icon-dianzan1" v-else></i>
          <span>999</span>
        </div>
        <div class="zan-collect-container" :class="{ 'active': isCollect }" @click="isCollect = !isCollect">

          <i class="iconfont icon-shoucang1" v-if="isCollect"></i>
          <i class="iconfont icon-shoucang" v-else></i>
          <span>收藏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MockData from '../mock/GoodArticle.js'
export default {
  name: 'GoodArticle',
  data () {
    return {
      mock: MockData,
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false
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

.article-container {
  padding: 0 10px;
  text-indent: 1.5em;
  font-size: 17px;
  line-height: 35px;
  color: rgba(0, 0, 0, .7);
}

.good-article {
  background-color: #fff;
  padding-bottom: 30px;

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
    .refresh {}
  }
}

.zan-collect {
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
  margin-top: 20px;
  &-container:first-of-type {
    margin-right: 30px;
  }
  &-container {
    padding: 0px 20px;
    height: 35px;
    border: .5px solid rgba(0, 0, 0, .4);
    border-radius: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, .8);

    span {
      margin-left: 6px;
    }
  }

  &-container.active {
    .iconfont {
      color: #409fea;
    }
  }
}
</style>
