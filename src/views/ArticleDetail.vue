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
        <div class="zan-collect-container" :class="{ 'active': zanState }" @click="userZanOrCancelArticle">

          <i class="iconfont icon-dianzan" v-if="zanState"></i>
          <i class="iconfont icon-dianzan1" v-else></i>
          <span class="article-exble-number">{{ zanNumber > 999 ? '999+': zanNumber }}</span>
        </div>

        <div class="zan-collect-container" :class="{ 'active': collectState }" @click="userCollectOrCancelArticle">
          <i class="iconfont icon-shoucang1" v-if="collectState"></i>
          <i class="iconfont icon-shoucang" v-else></i>
          <span class="article-exble-number">{{ collectNumber > 999 ? '999+': collectNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import { loadUserInfo, userCollectArticle, userCancelCollectArticleHandle, userCollectArticleHandle, useZanArticle, userCancelZanArticleHandle, userZanArticleHandle } from '@/api/user.js'
export default {
  name: 'GoodArticle',
  data () {
    return {
      article: {},
      // 已登录用户的id
      userId: '',
      // 所有收藏文章的id
      userCollectId: [],
      // 用户赞过文章的id
      userZanId: [],
      // 文章的收藏量
      collectNumber: 0,
      // 点赞量
      zanNumber: 0
    }
  },

  mounted () {
    this.getArticleHandle()
    if (this.isLogin) {
      this.getUserId()
    }
  },

  watch: {
    userId (newVal) {
      if (newVal) {
        this.getUserCollectArticles()
        this.getUserZanArticles()
      }
    }
  },

  computed: {
    // 是否登录
    isLogin () {
      return this.$store.state.token.token
    },
    // 当前文章的id
    articleId () {
      return this.$route.params.artId
    },

    /* 收藏状态 true---> 已登录已收藏， false---> 未登录或者是未收藏 */
    collectState () {
      return this.isLogin && this.userCollectId.includes(this.articleId)
    },

    /* 点赞的状态 true ---> 已登录已点赞  false ----> 未登录或未点赞 */
    zanState () {
      return this.isLogin && this.userZanId.includes(this.articleId)
    }
  },

  methods: {
    async getArticleHandle () {
      try {
        const result = await getArticleById(this.articleId)
        if (result.errno === 0) {
          this.article = result.data
          this.collectNumber = result.data.collect_number
          this.zanNumber = result.data.zan_number
        }
      } catch (err) {
        this.$toast('请求的数据不存在')
        this.$router.push('/article-list')
        console.log(err, '错误捕获')
      }
    },

    // 获取已登录用户的id
    async getUserId () {
      const result = await loadUserInfo()
      if (result.errno === 0) {
        this.userId = result.data._id
      }
    },

    // 获取已登录用户收藏过的文章
    async getUserCollectArticles () {
      const result = await userCollectArticle(this.userId)
      if (result.errno === 0) {
        result.data.forEach(item => {
          this.userCollectId.push(item._id)
        })
      }
    },

    // 已登录用户赞过的好文
    async getUserZanArticles () {
      const result = await useZanArticle(this.userId)
      if (result.errno === 0) {
        result.data.forEach(item => {
          this.userZanId.push(item._id)
        })
      }
    },

    // 用户取消收藏或者是收藏
    async userCollectOrCancelArticle () {
      // 判断用户是否登录，没有登录的话跳转到登录页面，并且携带当前的路径
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        if (this.collectState) {
          const result = await userCancelCollectArticleHandle(this.articleId)
          if (result.errno === 0) {
            const index = this.userCollectId.indexOf(this.articleId)
            this.userCollectId.splice(index, 1)
            const newResult = await getArticleById(this.articleId)
            if (newResult.errno === 0) {
              this.collectNumber = newResult.data.collect_number
            }
            this.$toast('取消收藏成功')
          }
        } else {
          const result = await userCollectArticleHandle(this.articleId)
          if (result.errno === 0) {
            this.userCollectId.push(this.articleId)
            const newResult = await getArticleById(this.articleId)
            if (newResult.errno === 0) {
              this.collectNumber = newResult.data.collect_number
            }
            this.$toast('收藏成功')
          }
        }
      }
    },

    // 用户点赞好文或者是取消赞
    async userZanOrCancelArticle () {
      // 判断用户是否登录，没有登录的话跳转到登录页面，并且携带当前的路径
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        if (this.zanState) {
          const result = await userCancelZanArticleHandle(this.articleId)
          if (result.errno === 0) {
            // 重新获取userZanId
            const zanResult = await useZanArticle(this.userId)
            if (result.errno === 0) {
              this.userZanId = []
              zanResult.data.forEach(item => {
                this.userZanId.push(item._id)
              })
            }
            const newResult = await getArticleById(this.articleId)
            if (newResult.errno === 0) {
              this.zanNumber = newResult.data.zan_number
            }
            this.$toast('取消点赞成功')
          }
        } else {
          const result = await userZanArticleHandle(this.articleId)
          if (result.errno === 0) {
            // 重新获取userZanId
            const zanResult = await useZanArticle(this.userId)
            if (result.errno === 0) {
              this.userZanId = []
              zanResult.data.forEach(item => {
                this.userZanId.push(item._id)
              })
            }
            const newResult = await getArticleById(this.articleId)
            if (newResult.errno === 0) {
              this.zanNumber = newResult.data.zan_number
            }
            this.$toast('点赞成功')
          }
        }
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
    width: 80px;
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

.article-exble-number {
  font-size: 15px;
}
</style>
