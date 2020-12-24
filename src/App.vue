<template>
  <div id="app">
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-popup v-model="showPopup" get-container="#app" :class="{ 'un-login': !isLogin, 'un-self': isSelf && isLogin }">
      <div class="operate-container">
        <div class="operate-item need-line-bottom" v-if="isLogin && !isSelf">不感兴趣</div>
        <div class="operate-item need-line-bottom" v-if="!isSelf && isLogin">屏蔽：{{ operateAboutUserInfo && operateAboutUserInfo.nickname }}</div>
        <div class="operate-item need-line-bottom">
          <Copy :content=" operateAboutUserInfo && operateAboutUserInfo.content" @copyCallback="copyCallback">复制</Copy>
        </div>
        <div class="operate-item">举报</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      needPopup: false,
      showPopup: false,
      // 用户操作的动态附属的详情
      operateAboutUserInfo: null
    }
  },
  provide () {
    return {
      App: this
    }
  },

  watch: {
    $route (newVal) {
      if (newVal.path === '/dynamic' || newVal.path === '/my-publish') {
        this.needPopup = true
      } else {
        this.needPopup = false
      }
    }
  },

  methods: {
    // 屏蔽用户的所有动态
    hideUser (user) {
      this.operateAboutUserInfo = user
      console.log(user, '用户')
    },

    // 复制文本
    copyCallback () {
      this.showPopup = false
      this.$toast('复制成功')
      this.operateAboutUserInfo.content = ''
    }
  },

  computed: {
    ...mapState(['cachedPages']),
    isLogin () {
      return this.$store.state.token.token
    },

    // 判断是不是自己，因为自己不需要屏蔽自己
    isSelf () {
      // 是自己
      if (this.operateAboutUserInfo) {
        return this.$store.state.token.userId === this.operateAboutUserInfo.u_id && this.isLogin
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;

  /deep/ .van-popup--center {
    left: 35px;
    right: 35px;
    bottom: 0px;
    height: 208px;
    margin-top: 80px;
    border-radius: 10px;
    transform: none;
  }

  /deep/ .van-popup--center.un-login {
    left: 35px;
    right: 35px;
    bottom: 0;
    height: 104px;
    margin-top: 180px;
    border-radius: 10px;
    transform: none;
  }

  /deep/ .van-popup--center.un-self {
    left: 35px;
    right: 35px;
    bottom: 0;
    height: 104px;
    margin-top: 180px;
    border-radius: 10px;
    transform: none;
  }
}

.operate-container {

  .operate-item {
    height: 52px;
    line-height: 52px;
    text-align: center;
    position: relative;
    font-size: 16PX;
    color: #409fea;
  }

  .operate-item.need-line-bottom::before {
    position: absolute;
    content: "";
    left: 12px;
    right: 12px;
    height: 1PX;
    bottom: 0;
    background-color: #e1e1e1;
    transform: scaleY(.5);
  }
}
</style>
