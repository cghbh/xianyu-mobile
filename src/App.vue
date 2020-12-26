<template>
  <div id="app">
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-popup v-model="showPopup" get-container="#app" :class="{ 'un-login': !isLogin, 'un-self': isSelf && isLogin }">
      <div class="operate-container">
        <div 
          class="operate-item need-line-bottom" 
          v-if="isLogin && !isSelf"
          @click="notInteresting">不感兴趣</div>
        <div 
          class="operate-item need-line-bottom" 
          v-if="!isSelf && isLogin"
          @click="hideUserHandle">屏蔽：{{ operateAboutUserInfo && operateAboutUserInfo.nickname }}</div>
        <div class="operate-item need-line-bottom">
          <Copy :content=" operateAboutUserInfo && operateAboutUserInfo.content" @copyCallback="copyCallback">复制</Copy>
        </div>
        <div 
          class="operate-item need-line-bottom user-delete" 
          v-if="isLogin && isSelf"
          @click="deleteDynamic">删除</div>
        <div 
          class="operate-item"
          @click="userReport"
          v-if="isLogin && !isSelf">举报</div>
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
      operateAboutUserInfo: null,
      // 如果点击弹窗删除的话，xiugaiAPP根组件的值传递到指定的组件内watch判断
      isDelete: false
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
    operateUser (user) {
      this.operateAboutUserInfo = user
    },

    // 复制文本
    copyCallback () {
      this.showPopup = false
      this.$toast('复制成功')
      this.operateAboutUserInfo.content = ''
    },

    // 删除动态
    deleteDynamic () {
      this.showPopup = false
      this.$dialog.confirm({
        message: '<p style="font-size: 18px;line-height: 25px">确定删除该动态？</p>',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        confirmButtonColor: '#e92322',
        cancelButtonText: '取消',
        cancelButtonColor: '#666'
      }).then(() => {
        this.isDelete = true
      }).catch(err => { console.log(err) })
    },

    notInteresting () {
      this.showPopup = false
      this.$toast('此条动态将不再出现')
    },

    // 屏蔽用户
    hideUserHandle () {
      this.showPopup = false
      this.$toast(`已屏蔽：${this.operateAboutUserInfo.nickname}`)
    },

    // 举报
    userReport () {
      this.showPopup = false
      this.$toast('举报成功')
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
    margin-top: 65px;
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
    margin-top: 160px;
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

  .user-delete {
    color: #e92322;
  }
}
</style>
