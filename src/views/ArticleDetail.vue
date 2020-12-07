<template>
  <div class="good-article">
    <back-top title="好文"></back-top>
    <div class="good-article-content">
      <h1 style="text-align: left;padding-left: ;">{{ article.article_title }}</h1>
      <h3 style="text-align: left;">文 / {{ article.article_author }}</h3>
      <div class="good-article-content-avatar">
        <img :src="article.article_image">
      </div>
      <article class="article-container" v-html="article.article_content"></article>
      <div class="zan-collect">
        <div class="zan-collect-container" :class="{ 'active': isZan }" @click="isZan = !isZan">

          <i class="iconfont icon-dianzan" v-if="isZan"></i>
          <i class="iconfont icon-dianzan1" v-else></i>
          <span>{{ article.zan_number }}</span>
        </div>
        <div class="zan-collect-container" :class="{ 'active': isCollect }" @click="isCollect = !isCollect">

          <i class="iconfont icon-shoucang1" v-if="isCollect"></i>
          <i class="iconfont icon-shoucang" v-else></i>
          <span>{{ article.collect_number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MockData from '../mock/GoodArticle.js'
import { getArticleById } from '@/api/article.js'
export default {
  name: 'GoodArticle',
  data () {
    return {
      article: {},
      mock: MockData,
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false
    }
  },
  mounted () {
    this.getArticleHandle()
  },
  methods: {
    async getArticleHandle () {
      try {
        const result = await getArticleById(this.$route.params.artId)
        if (result.errno === 0) {
          this.article = result.data
        }
      } catch (err) {
        this.$toast('请求的数据不存在')
        this.$router.push('/article-list')
        console.log(err, '错误捕获')
      }
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
  text-indent: 1.5em;
  font-size: 17px;
  line-height: 35px;
  color: rgba(0, 0, 0, .7);
}

.good-article {
  background-color: #fff;
  padding-bottom: 30px;

  h1 {
    font-size: 22px;
    font-weight: 700;
    color: rgba(0, 0, 0, .7);
    margin: 24px 0;
    line-height: 30px;
  }

  h3 {
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
  }

  &-content {
    padding: 0 10px;
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

.good-article-content-avatar {
  max-height: 180px;
  overflow: hidden;
  padding: 10px 12px;
  margin-bottom: 15px;

  img {
    width: 100%;
    max-height: 200px;
  }
}
</style>
