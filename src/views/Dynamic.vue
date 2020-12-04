<template>
  <div class="xianyu-home-page">
    <van-tabs v-model="active" sticky animated swipeable title-active-color="#409fea" color="#409fea">
      <van-tab title="推荐">
        <van-pull-refresh
          v-model="isRecommendLoading"
          @refresh="onRecommendRefresh"
          v-if="recommendDynamics.length > 0"
          loosing-text="别老拽着,快放开我"
          loading-text="正在刷新中"
          success-text="刷新成功">
          <div class="homepage-recommend" style="position: relative;z-index: 99999;overflow: auto;">
            <homepage-item
              @itemlike="itemLikeHandle"
              @itemunlike="itemUnlikeHandle"
              v-for="(item, index) in recommendDynamics"
              :key="item._id"
              :isFirst="index === 0"
              :itemValue="item"
              :loading="isLoading"
              :loginUserLikeDynamics="loginUserLikeDynamics"></homepage-item>
          </div>
        </van-pull-refresh>
        <van-empty v-cloak v-show="!showNoRecommend" description="什么内容都没有" />
      </van-tab>

      <van-tab title="最新">
        <van-pull-refresh
          v-model="isLatestLoading"
          v-if="latestDynamics.length > 0"
          @refresh="onLatestRefresh"
          loosing-text="别老拽着,快放开我"
          loading-text="正在刷新中"
          success-text="刷新成功">
          <div class="homepage-newest">
            <homepage-item
              @itemlike="itemLikeHandle"
              @itemunlike="itemUnlikeHandle"
              v-for="(item, index) in latestDynamics"
              :key="item._id"
              :isFirst="index === 0"
              :itemValue="item"
              :loading="isLoading"
              :loginUserLikeDynamics="loginUserLikeDynamics"></homepage-item>
          </div>
        </van-pull-refresh>
        <van-empty v-if="!showNoLatest" description="什么内容都没有" />
      </van-tab>

      <van-tab title="关注">
        <van-pull-refresh
          v-model="isLatestLoading"
          @refresh="onLatestRefresh"
          loosing-text="别老拽着,快放开我"
          loading-text="正在刷新中"
          success-text="刷新成功">
          <div class="homepage-fellow">
            <!-- <homepage-item v-for="(item, index) in 2" :key="index" :isFirst="index === 0"></homepage-item> -->
          </div>
        </van-pull-refresh>

        <!-- 未登录 -->
        <div class="dynamic-follow-unlogin" v-if="!user_login_token">
          <p class="dynamic-follow-unlogin-tips">需要登录，或登录已过期需要重新登录</p>
          <a class="dynamic-follow-unlogin-link" @click="$router.replace({ path: '/login', query: { redirect: '/dynamic' } })">去登录</a>
        </div>

        <!-- 我的关注空状态 -->
        <van-empty v-if="showNoFollow && user_login_token" description="什么内容都没有" />

        <!-- 正常内容显示 -->
        <div class="xianyu-my-follow-container">
          <homepage-item
            @itemlike="itemLikeHandle"
            @itemunlike="itemUnlikeHandle"
            v-for="(item, index) in followDynamics"
            :key="item._id"
            :isFirst="index === 0"
            :itemValue="item"
            :loading="isLoading"
            :loginUserLikeDynamics="loginUserLikeDynamics"></homepage-item>
        </div>
      </van-tab>

    </van-tabs>
    <i @click="$router.push('/dynamic-publish')" class="iconfont add-word icon-tianxie"></i>
  </div>

</template>

<script>
import HomepageItem from '../components/Homepage/HomepageItem.vue'
import { getDynamics } from '@/api/dynamic.js'
import { likeDynamics, userLikeDynamics, unlikeDynamics } from '@/api/user.js'
export default {
  name: 'Dynamic',
  data () {
    return {
      active: 0,
      dynamics: [],
      // 没有动态数据的补充
      showNoRecommend: true,
      // 推荐的动态
      recommendDynamics: [],
      // 没有最新数据
      showNoLatest: true,
      // 最新的动态
      latestDynamics: [],
      // 关注的人没有动态
      showNoFollow: false,
      // 关注者的动态
      followDynamics: [],
      // 已登录用户所有点赞过的id
      loginUserLikeDynamics: [],
      // 推荐内容的刷新状态
      isRecommendLoading: true,
      isLoading: true,
      // 最新内容的刷新状态
      isLatestLoading: true
    }
  },
  watch: {
    active: {
      async handler (newVal) {
        if (newVal === 0 || newVal === 1) {
          const result = await getDynamics(newVal)
          if (result.errno === 0) {
            if (newVal === 0) {
              this.recommendDynamics = result.data
              this.recommendDynamics.length === 0 ? this.showNoRecommend = false : this.showNoRecommend = true
            } else if (newVal === 1) {
              this.latestDynamics = result.data
              this.latestDynamics.length === 0 ? this.showNoLatest = false : this.showNoLatest = true
            }
          } else {
            this.$toast({ message: '数据获取失败 ', duration: 800 })
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    user_login_token () {
      return this.$store.state.token.token
    }
  },
  beforeCreate () {
    this.isLoading = false
  },
  mounted () {
    this.getUserLikeDynamics()
  },
  methods: {
    // 获取已登录用户喜欢的动态列表
    async getUserLikeDynamics () {
      if (this.userInfo && this.userInfo._id) {
        const result = await userLikeDynamics(this.userInfo._id)
        if (result.code === 200) {
          this.loginUserLikeDynamics = result.data.map(item => item._id)
        }
      }
    },

    checkUserLogin () {
      // 先判断用户是否登录
      if (!this.user_login_token) {
        return this.$dialog({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.push({ name: 'Login' })
        })
          .catch(() => {})
      }
    },
    // 子组件点赞操作
    async itemLikeHandle (dynamicId) {
      this.checkUserLogin()
      // 点赞操作
      const result = await likeDynamics(dynamicId)

      if (result.code === 0) {
        this.getUserLikeDynamics()
        const index = this.dynamics.findIndex(item => item._id === dynamicId)
        this.$set(this.dynamics[index], 'zan_number', result.data.zan_number)
      }
    },

    // 取消点赞
    async itemUnlikeHandle (dynamicId) {
      this.checkUserLogin()
      // 判断当前的动态id用户是否点过赞
      const result = await unlikeDynamics(dynamicId)
      if (result.code === 0) {
        this.getUserLikeDynamics()
        const index = this.dynamics.findIndex(item => item._id === dynamicId)
        const idIndex = this.loginUserLikeDynamics.indexOf(dynamicId)
        if (idIndex > -1) { this.loginUserLikeDynamics.splice(index, 1) }
        this.$set(this.dynamics[index], 'zan_number', result.data.zan_number)
      }
    },

    // 推荐内容的刷新事件，重新请求推荐内容
    async onRecommendRefresh () {
      const result = await getDynamics(0)

      if (result.errno === 0) {
        this.recommendDynamics = result.data
        this.isRecommendLoading = false
      } else {
        this.$toast({ message: '数据获取失败 ', duration: 800 })
      }
    },

    // 最新动态的刷新事件
    async onLatestRefresh () {
      const result = await getDynamics(1)
      if (result.errno === 0) {
        this.dynamics = result.data
        this.isLatestLoading = false
      } else {
        this.$toast({ message: '数据获取失败 ', duration: 800 })
      }
    }
  },
  components: {
    HomepageItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-home-page {
  position: fixed;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
  /deep/ .van-sticky {
    background-color: #fff;
  }

  /deep/ .van-skeleton__row, .van-skeleton__title {
    background-color: #f2f3f5;
    height: 20px;
  }

  /deep/ .van-tabs__wrap {
    padding-right: 120px;
  }

  /deep/ .van-tab {
    font-size: 16px;
  }

  /deep/ .van-empty {
    padding-top: 120px;
    .van-empty__image {
      width: 240px;
      height: 240px;
    }
    img {
      width: 240px;
    }
  }
}

.add-word {
  position: fixed;
  bottom: 100px;
  right: 30px;
  font-size: 32px;
  color: #fff;
  background-color: #409fea;
  border-radius: 50%;
  padding: 10px;
}

.dynamic-follow-unlogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  &-tips {
    font-size: 16px;
    margin-top: 240px;
  }

  &-link {
    font-size: 14px;
    margin-top: 30px;
    padding: 10px 20px;
    background-color: #409fea;
    color: #fff;
    border-radius: 6px;
  }
}
</style>
