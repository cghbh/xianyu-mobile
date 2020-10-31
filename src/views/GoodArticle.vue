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
    </div>
    <refresh-icon></refresh-icon>
    <divide-area></divide-area>
    <bottom-comment></bottom-comment>
    <comment-add></comment-add>
  </div>
</template>

<script>
import MockData from '../mock/GoodArticle.js'
import DivideArea from '../components/PublicComponents/DivideArea.vue'
import BottomComment from '../components/BottomComment/comment.vue'
import CommentAdd from '../components/BottomComment/index.vue'
export default {
  name: 'GoodArticle',
  data () {
    return {
      mock: MockData
    }
  },
  components: {
    DivideArea,
    BottomComment,
    CommentAdd
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
  padding-bottom: 100px;
  font-size: 17px;
  line-height: 35px;
  color: rgba(0, 0, 0, .7);
}

.good-article {
  background-color: #fff;

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
</style>
