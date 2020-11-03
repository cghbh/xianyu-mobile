<template>
  <div class="xianyu-register">
    <div class="user-back" @click="userBack">
      <i class="iconfont icon-left"></i>
    </div>
    <h1 class="xianyu-register-title">欢迎注册闲语</h1>
    <p class="xianyu-register-tips">仰望星空，脚踏实地。</p>
    <van-row class="reg-row">
      <van-col span="24">
        <van-field :maxlength="11" autofocus v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="16">
        <van-field label="验证码" placeholder="请输入验证码" v-model="code"/>
      </van-col>
      <van-col span="8">
        <span class="get-code" :class="{ 'code-send': codeSend }" style="font-size: 12px;">{{ codeSend ? '59s再次发送': '获取验证码' }}</span>
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="24">
        <van-field type="password" autofocus v-model="password" label="密码" placeholder="请输入密码" />
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="24">
        <van-field type="password" autofocus v-model="againPassword" label="密码" placeholder="请确认密码" />
      </van-col>
    </van-row>
    <div class="register-button-container">
      <van-button @click="register" class="register-code-button" :disabled="tel === '' || code === ''" type="primary" color="#409fea" round block>立即注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      tel: '',
      code: '',
      password: '',
      againPassword: '',
      timerId: null,
      codeSend: true
    }
  },
  methods: {
    register () {
      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = null
      }
      this.timerId = setTimeout(() => {
        this.$toast('注册成功！\n正在跳转到登录页面......')
      }, 400)
    },
    userBack () {
      if (this.tel || this.code || this.password || this.againPassword) {
        this.$dialog.confirm({
          message: '确定要退出注册吗？\n退出后当前内容将不被保存。',
          confirmButtonText: '继续注册',
          confirmButtonColor: '#409fea',
          cancelButtonText: '确定',
          cancelButtonColor: '#323233'
        })
          .then(() => {})
          .catch(() => {
            this.$router.go(-1)
          })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-register {
  background-color: #fff;
  height: 100%;
  padding: 20px 35px 50px 35px;
  box-sizing: border-box;
  position: relative;

  .user-back {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon-left {
      font-size: 25px;
    }
  }

  &-title {
    font-size: 22px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: 21px;
  }
  &-tips {
    font-size: 15px;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, .6);
  }

  .reg-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;

    /deep/ .van-cell__title {
      font-size: 16px;
    }

    /deep/ .van-field__label {
      width: 60px;
    }

    /deep/ .van-cell {
      padding: 20px 16px 10px 0px
    }

    /deep/ .van-col.van-col--8 {
      text-align: right;
      font-size: 15px;
      margin-top: 5px;
      display: flex;
      justify-content: flex-end;
    }

    /deep/ .van-field__control {
      font-size: 15px;
    }
  }

  .register-button-container {
    margin-top: 45px;
  }

  .get-code {
    display: inline-block;
    min-width: 90px;
    height: 30px;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #409fea;
    color: #409fea;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .get-code.code-send {
    width: 92px;
    font-size: 12px;
  }

  .register-code-button {
    margin-top: 40px;
    font-size: 18px;
  }
}
</style>
