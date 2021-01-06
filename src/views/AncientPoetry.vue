<template>
  <div class="ancient-poetry">
    <back-top title="诗词"></back-top>
    <div v-if="showSkeleton" class="poem-detail-skeleton">
      <poem-skeleton></poem-skeleton>
    </div>
    <div v-else class="poem-total-container">
      <div class="ancient-poetry-container" style="min-height: 300px;font-size: 14px; text-align: center;line-height: 32px;padding-top: 15px; color: #555;">
        <h1 style="font-size: 18px;font-weight: bold;">{{ poemObj.poem_title }}</h1>
        <p style="font-size: 15px; color: #666; margin: 8px 0;">{{ poemObj.poem_author }}</p>
        <div class="poem-content" v-html="poemObj.poem_content"></div>
      </div>
      <van-divider :style="{ color: '#666', borderColor: '#666', padding: '0 16px', fontSize: '16px', margin: '40px 0' }">诗词赏析</van-divider>
      <div class="poem-meaning" v-html="poemObj.poem_appreciation"></div>
      <div class="zan-collect">
        <div class="zan-collect-container" :class="{ 'active': zanState }" @click="userZanOrCancelHandle">

          <i class="iconfont icon-dianzan" v-if="zanState"></i>
          <i class="iconfont icon-dianzan1" v-else></i>
          <span class="poem-exble-style">{{ zanNumber }}</span>
        </div>
        <div class="zan-collect-container" :class="{ 'active': collectState }" @click="userCollectOrCancelHandle">

          <i class="iconfont icon-shoucang1" v-if="collectState"></i>
          <i class="iconfont icon-shoucang" v-else></i>
          <span class="poem-exble-style">{{ collectNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPoemById } from '@/api/poem.js'
import { loadUserInfo, userZanPoems, userCollectPoems, userZanPoemHandle, userCancelZanPoemHandle, userCancelCollectPoemHandle, userCollectPoemHandle } from '@/api/user.js'
import PoemSkeleton from '@/components/Skeleton/PoemDetailSkeleton.vue'
export default {
  name: 'AncientPoetry',
  data () {
    return {
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false,
      poemObj: {},
      // 已登录用户赞过的诗词id
      zanPomesId: [],
      // 已登录用户收藏过的诗词id
      collectPoemsId: [],
      userId: null,
      zanNumber: 0,
      collectNumber: 0,
      showSkeleton: true
    }
  },

  computed: {
    poemId () {
      return this.$route.params.poemId
    },
    isLogin () {
      return this.$store.state.token.token
    },
    // 点赞状态 true----> 已登录已点赞  false----->未登录或未点赞
    zanState () {
      return this.isLogin && this.zanPomesId.includes(this.poemId)
    },
    // 收藏状态 true----> 已登录已收藏  false----->未登录或未收藏
    collectState () {
      return this.isLogin && this.collectPoemsId.includes(this.poemId)
    }
  },

  watch: {
    userId (newVal) {
      if (newVal) {
        this.getZanPoemIdHandle()
        this.getCollectPoemIdHandle()
      }
    }
  },

  mounted () {
    this.getPoemHandle()
    if (this.isLogin) {
      this.getUserId()
    }
  },

  methods: {
    async getPoemHandle () {
      try {
        const result = await getPoemById(this.poemId.toString())
        if (result.errno === 0) {
          result.data.poem_content = result.data.poem_content.replace(/[\n\r]/g, '<br>')
          result.data.poem_appreciation = result.data.poem_appreciation.replace(/[\n\r]/g, '<br>')
          this.poemObj = result.data
          this.collectNumber = result.data.collect_number
          this.zanNumber = result.data.zan_number
          setTimeout(() => {
            this.showSkeleton = false
          }, 30)
        }
      } catch (err) {
        this.$toast('请求的数据不存在')
        this.$router.go(-1)
      }
    },

    async getUserId () {
      const result = await loadUserInfo()
      if (result.errno === 0) {
        this.userId = result.data._id
      }
    },

    // 获取已登录用户点赞诗词的id数组集合
    async getZanPoemIdHandle () {
      const result = await userZanPoems(this.userId)
      if (result.errno === 0) {
        result.data.forEach(item => {
          this.zanPomesId.push(item._id)
        })
      }
    },

    // 获取已登录用户收藏诗词的id数组集合
    async getCollectPoemIdHandle () {
      const result = await userCollectPoems(this.userId)
      if (result.errno === 0) {
        result.data.forEach(item => {
          this.collectPoemsId.push(item._id)
        })
      }
    },

    // 用户收藏或者取消收藏
    async userCollectOrCancelHandle () {
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
          const result = await userCancelCollectPoemHandle(this.poemId)
          if (result.errno === 0) {
            const newResult = await getPoemById(this.poemId.toString())
            if (newResult.errno === 0) {
              this.collectNumber = newResult.data.collect_number
            }
            this.$toast('取消收藏成功')
            this.collectPoemsId = []
            this.getCollectPoemIdHandle()
          }
        } else {
          const result = await userCollectPoemHandle(this.poemId)
          if (result.errno === 0) {
            const newResult = await getPoemById(this.poemId.toString())
            if (newResult.errno === 0) {
              this.collectNumber = newResult.data.collect_number
            }
            this.$toast('收藏成功')
            this.collectPoemsId = []
            this.getCollectPoemIdHandle()
          }
        }
      }
    },

    // 用户点赞或者取消赞
    async userZanOrCancelHandle () {
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
          const result = await userCancelZanPoemHandle(this.poemId)
          if (result.errno === 0) {
            const newResult = await getPoemById(this.poemId.toString())
            if (newResult.errno === 0) {
              this.zanNumber = newResult.data.zan_number
            }
            this.$toast('取消点赞成功')
            this.zanPomesId = []
            this.getZanPoemIdHandle()
          }
        } else {
          const result = await userZanPoemHandle(this.poemId)
          if (result.errno === 0) {
            const newResult = await getPoemById(this.poemId.toString())
            if (newResult.errno === 0) {
              this.zanNumber = newResult.data.zan_number
            }
            this.$toast('点赞成功')
            this.zanPomesId = []
            this.getZanPoemIdHandle()
          }
        }
      }
    }
  },
  components: {
    PoemSkeleton
  }
}
</script>

<style scoped lang="scss">
.poem-detail-skeleton {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }
}

.ancient-poetry {
  background-color: #fff;
  padding-bottom: 20px;
}

.ancient-poetry-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.poem-total-container {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding-bottom: 20px;
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

.poem-content {
  font-size: 16px;
  text-align: center;
  padding: 0 15px;
  line-height: 35px;
  color: #333;

  /deep/ strong {
    font-weight: bold!important;
  }
}

.poem-meaning-title {
  padding: 10px 15px;
  padding-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.poem-meaning {
  padding: 0 15px;
  font-size: 16px;
  line-height: 36px;
  color: #666;
}

.poem-exble-style {
  font-size: 15px;
}
</style>
