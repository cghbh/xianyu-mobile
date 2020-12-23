<template>
  <div class="xianyu-collection">
    <back-top title="我的收藏"></back-top>

    <van-tabs v-model="active" 
      animated 
      swipeable 
      sticky 
      color="#409fea"
      offset-top="46">
      <van-tab title="动态">
        <collect-dynamic 
          :dynamics="dynamics"
          :zan-id="userZanedId"
          :collected-id="userCollectedId"
          @unlike="userCancelZanHandle"
          @like="userZanHandle"
          @uncollect="userCancelCollect"
          @collect="userCollectHandle"
        />
      </van-tab>
      <van-tab title="好文">
        <collect-article :articles="articles"/>
      </van-tab>
      <van-tab title="诗词">
        <collect-poem :poems="poems"/>
      </van-tab>
      <van-tab title="词典">
        <collect-word :words="words"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { userCollectArticle, userCollectPoems, getUserCollectedWordHandle, getUserCollectedDynamics, likeDynamics, unlikeDynamics, userLikeDynamics, userCancelCollectDynamics, userCollectDynamics } from '@/api/user.js'
import CollectArticle from '@/components/CollectArticle/index.vue'
import CollectPoem from '@/components/CollectPoem/index.vue'
import CollectWord from '@/components/CollectWord/index.vue'
import CollectDynamic from '@/components/CollectDynamics/index.vue'
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
      userCollectedId: []
    }
  },
  watch: {
    active: {
      async handler (newVal) {
        // 0-请求的是收藏的动态，1-请求收藏的好文，2-请求收藏的诗词，3-请求收藏的成语
        if (newVal === 0) {
          const result = await getUserCollectedDynamics(this.userId)
          if (result.errno === 0 && this.userId) {
            this.dynamics = result.data
            this.getUserZanedDynamicsId()
            const tempArray = []
            result.data.forEach(item => {
              tempArray.push(item._id)
            })
            this.userCollectedId = tempArray
          }
        } else if (newVal === 1) {
          const result = await userCollectArticle(this.userId)
          if (result.errno === 0) {
            this.articles = result.data
          }
        } else if (newVal === 2) {
          const result = await userCollectPoems(this.userId)
          if (result.errno === 0) {
            this.poems = result.data
          }
        } else if (newVal === 3) {
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

  methods: {
    // 获取指定id用户点赞过的动态id数组
    async getUserZanedDynamicsId () {
      const result = await userLikeDynamics(this.userId)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => {
          tempArray.push(item._id)
        })
        this.userZanedId = tempArray
      }
    },

    // 用户点赞
    async userZanHandle (id) {
      const result = await likeDynamics(id)
      if (result.errno === 0 && !this.userZanedId.includes(id)) {
        this.userZanedId.push(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
        newDynamic.zan_number++
        this.$set(this.dynamics, index, newDynamic)
      }
    },

    // 取消点赞
    async userCancelZanHandle (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdIndex = this.userZanedId.indexOf(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.dynamics, index, newDynamic)
          this.userZanedId.splice(zanIdIndex, 1)
        }
      }
    },

    // 取消收藏
    async userCancelCollect (id) {
      const result = await userCancelCollectDynamics(id)
      if (result.errno === 0) {
        const collectIdIndex = this.userCollectedId.indexOf(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (collectIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
          newDynamic.collect_number--
          this.$set(this.dynamics, index, newDynamic)
          this.userCollectedId.splice(collectIdIndex, 1)
        }
      }
    },

    // 收藏操作
    async userCollectHandle (id) {
      const result = await userCollectDynamics(id)
      if (result.errno === 0 && !this.userCollectedId.includes(id)) {
        this.userCollectedId.push(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
        newDynamic.collect_number++
        this.$set(this.dynamics, index, newDynamic)
      }
    }
  },

  components: {
    CollectArticle,
    CollectPoem,
    CollectWord,
    CollectDynamic
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
