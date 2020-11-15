<template>
  <div class="xianyu-home-page">
    <van-tabs v-model="active" sticky animated swipeable title-active-color="#409fea" color="#409fea">
      <van-tab title="推荐">
        <div class="homepage-recommend">
          <homepage-item
            @itemlike="itemLikeHandle"
            @itemunlike="itemUnlikeHandle"
            v-for="(item, index) in recommendDynamics"
            :key="item._id"
            :isFirst="index === 0"
            :itemValue="item"
            :loginUserLikeDynamics="loginUserLikeDynamics"></homepage-item>
        </div>
      </van-tab>
      <!-- <van-tab title="关注">
        <div class="homepage-fellow">
          <homepage-item v-for="(item, index) in 2" :key="index" :isFirst="index === 0"></homepage-item>
        </div>
      </van-tab>
      <van-tab title="最新">
        <div class="homepage-newest">
          <homepage-item v-for="(item, index) in 5" :key="index" :isFirst="item === 0"></homepage-item>
        </div>
      </van-tab> -->
    </van-tabs>
    <i @click="$router.push('/dynamic-publish')" class="iconfont add-word icon-tianxie"></i>
  </div>
</template>

<script>
import HomepageItem from '../components/Homepage/HomepageItem.vue'
import { recommendDynamic } from '@/api/dynamic.js'
import { likeDynamics, userLikeDynamics, unlikeDynamics } from '@/api/user.js'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      recommendDynamics: [],
      // 已登录用户所有点赞过的id
      loginUserLikeDynamics: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    user_login_token () {
      return this.$store.state.token
    }
  },
  mounted () {
    this.getRecommendDyamic()
    this.getUserLikeDynamics()
  },
  methods: {
    async getRecommendDyamic () {
      const result = await recommendDynamic()
      if (result.code === 200) {
        this.recommendDynamics = result.data
      } else {
        this.$toast({ message: '数据获取失败 ', duration: 800 })
      }
    },
    // 获取已登录用户喜欢的动态列表
    async getUserLikeDynamics () {
      if (this.userInfo && this.userInfo._id) {
        const result = await userLikeDynamics(this.userInfo._id)
        if (result.code === 200) {
          this.loginUserLikeDynamics = result.data.map(item => item._id)
        }
      }
    },
    // 子组件点赞操作
    async itemLikeHandle (dynamicId) {
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
      // 点赞操作
      const result = await likeDynamics(dynamicId)

      if (result.code === 200) {
        this.getUserLikeDynamics()
        const index = this.recommendDynamics.findIndex(item => item._id === dynamicId)
        this.$set(this.recommendDynamics[index], 'zan_number', result.data.zan_number)
      }
    },
    // 取消点赞
    async itemUnlikeHandle (dynamicId) {
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
      
      // 判断当前的动态id用户是否点过赞
      const result = await unlikeDynamics(dynamicId)
      if (result.code === 200) {
        this.getUserLikeDynamics()
        const index = this.recommendDynamics.findIndex(item => item._id === dynamicId)
        const idIndex = this.loginUserLikeDynamics.indexOf(dynamicId)
        if (idIndex > -1) { this.loginUserLikeDynamics.splice(index, 1) }
        this.$set(this.recommendDynamics[index], 'zan_number', result.data.zan_number)
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
  height: auto;
  margin-bottom: 52px;
  /deep/ .van-sticky {
    background-color: #fff;
  }

  /deep/ .van-tabs__wrap {
    padding-right: 120px;
  }

  /deep/ .van-tab {
    font-size: 16px;
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
</style>
