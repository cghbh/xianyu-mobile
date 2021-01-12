<template>
  <div class="xianyu-collection">
    <back-top title="我的收藏"></back-top>

    <van-tabs v-model="active" 
      animated 
      swipeable 
      sticky 
      color="#409fea"
      offset-top="46">
      <van-tab title="好文">
        <collect-article :articles="articles" v-if="hasCollectArticle"/>
        <van-empty 
          :image="emptyImg" 
          v-if="!hasCollectArticle && showArticleTag" 
          description="还没有收藏过任何文章哟，快去看看吧" 
          class="article-empty"
        />
      </van-tab>
      <van-tab title="诗词">
        <collect-poem v-if="hasCollectPoem" :poems="poems"/>
        <van-empty 
          :image="emptyImg" 
          v-if="!hasCollectPoem && showPoemTag" 
          description="还没有收藏过任何诗词哟，快去看看吧" 
          class="article-empty"
        />
      </van-tab>
      <van-tab title="词典">
        <collect-word v-if="hasCollectWord" :words="words"/>
        <van-empty 
          :image="emptyImg" 
          v-if="!hasCollectWord && showWordTag" 
          description="还没有收藏过任何词语哟，快去看看吧" 
          class="article-empty"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { userCollectArticle, userCollectPoems, getUserCollectedWordHandle } from '@/api/user.js'
import CollectArticle from '@/components/CollectArticle/index.vue'
import CollectPoem from '@/components/CollectPoem/index.vue'
import CollectWord from '@/components/CollectWord/index.vue'
export default {
  name: 'MyCollection',
  data () {
    return {
      active: '',
      // 已登陆用户收藏的好文
      articles: [],
      // 诗词
      poems: [],
      // 词典
      words: [],
      // 动态
      dynamics: [],
      userZanedId: [],
      userCollectedId: [],
      // 缺省图片
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 好文缺省的标记
      showArticleTag: false,
      // 诗词缺省的标记
      showPoemTag: false,
      // 成语缺省的标记
      showWordTag: false
    }
  },
  watch: {
    active: {
      async handler (newVal) {
        // 0-请求的是收藏的动态，1-请求收藏的好文，2-请求收藏的诗词，3-请求收藏的成语
        if (newVal === 0) {
          const result = await userCollectArticle(this.userId)
          if (result.errno === 0) {
            this.articles = result.data
          }
        } else if (newVal === 1) {
          const result = await userCollectPoems(this.userId)
          if (result.errno === 0) {
            this.poems = result.data
          }
        } else if (newVal === 2) {
          const result = await getUserCollectedWordHandle(this.userId)
          if (result.errno === 0) {
            this.words = result.data
          }
        }
      },
      immediate: true
    },

    articles (newVal) {
      if (newVal.length <= 0) {
        this.showArticleTag = true
      }
    },

    poems (newVal) {
      if (newVal.length <= 0) {
        this.showPoemTag = true
      }
    },

    words (newVal) {
      if (newVal.length <= 0) {
        this.showWordTag = true
      }
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },

    userId () {
      return this.$store.state.token.userId
    },

    // 收藏的好文数
    hasCollectArticle () {
      return this.articles.length > 0
    },

    // 收藏的诗词数
    hasCollectPoem () {
      return this.poems.length > 0
    },

    hasCollectWord () {
      return this.words.length > 0
    }
  },

  components: {
    CollectArticle,
    CollectPoem,
    CollectWord
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

.article-empty {
  height: calc(100vh - 90px);
  padding-top: 0;
}
</style>
