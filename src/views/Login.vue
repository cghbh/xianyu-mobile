<template>
  <div class="xianyu-login">
    <div class="xianyu-login-word">
      <h1 class="xianyu-login-word-title">欢迎登录咸鱼社区</h1>
      <p class="xianyu-login-word-tips">即便做咸鱼，也要做最咸的那一条......</p>
    </div>
    <div>
      <van-field label-width="3.2rem" v-model="text" label="文本" />
      <van-field v-model="text" label="文本" />
      <van-row>
        <van-col span="16">
          <van-field v-model="text" label="文本" />
        </van-col>
        <van-col span="8">
          <div style="height: 44px;display: flex;align-items: center;">123</div>
        </van-col>
      </van-row>
    </div>
    <div>手机快捷登录</div>
    <button>立即登录</button>
    <div>
      <span>忘记密码</span>
      <span>注册账号</span>
    </div>
    <div>oauth授权登录部分</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style scoped  lang="scss">
.xianyu-login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-logo {
    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
  }
}
</style>
