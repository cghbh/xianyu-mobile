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
        <collect-article :articles="articles"></collect-article>
      </van-tab>
      <van-tab title="诗词">
        <collect-poem :poems="poems"></collect-poem>
      </van-tab>
      <van-tab title="词典">
        <collect-word :words="words"></collect-word>
      </van-tab>
      <van-tab title="动态"></van-tab>
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
      dynamics: []
    }
  },
  watch: {
    active: {
      async handler (newVal) {
        // 0-请求的是收藏的好文，1-请求收藏的诗词，2-请求收藏的成语，3-请求收藏的动态
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
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },
    userId () {
      return this.$store.state.token.userId
    }
  },

  methods: {},

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
</style>
