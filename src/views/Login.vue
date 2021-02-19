<template>
  <div class="xianyu-login">
    <div class="user-back" @click="$router.go(-1)">
      <i class="iconfont icon-left"></i>
    </div>
    <!-- 验证码登录 -->
    <div class="xianyu-login-code" v-if="codeLogin">
      <h1 class="xianyu-login-word-title">欢迎登录闲语</h1>
      <p class="xianyu-login-tips">仰望星空，脚踏实地。</p>
      <van-row class="border-tel">
        <van-col span="24">
          <van-field
            :maxlength="11"
            :error-message="!checkTelephone1 && telephone1 ? '请输入正确的手机号' : ''"
            autofocus
            v-model="telephone1"
            type="tel"
            label="手机号"
            placeholder="请输入手机号" />
        </van-col>
      </van-row>
      <br>
      <van-row class="border-code">
        <van-col span="16">
          <van-field label="验证码"  :maxlength="6" type="number" placeholder="请输入验证码" v-model="code"/>
        </van-col>
        <van-col span="8">
          <span class="get-code" @click="getTelephoneCodeLoginHandle" v-if="!codeSend" :class="{ 'code-send': codeSend }" style="font-size: 12px;">获取验证码</span>
          <span class="get-code get-code-disabled" v-else :class="{ 'code-send': codeSend }" style="font-size: 12px;">{{ countTime }}s再次发送</span>
        </van-col>
      </van-row>
      <van-button class="login-code-button" @click="loginByTelephoneCode" :disabled="telephone1 === '' || code === ''" type="primary" color="#409fea" round block>登录</van-button>
      <div class="login-button-bottom">
        <a @click="codeLogin = false">密码登录</a>
        <a @click="$router.push('/register')">用户注册</a>
      </div>
    </div>

    <!-- 密码登录，前提是该手机号已经注册了，否则提示未注册 -->
    <div class="xianyu-login-password" v-else>
      <h1 class="xianyu-login-password-title">欢迎登录闲语</h1>
      <p class="xianyu-login-password-tips">仰望星空，脚踏实地。</p>
      <van-row class="login-password">
        <van-col>
          <van-field
            :maxlength="11"
            :error-message="!checkTelephone2 && telephone2 ? '请输入正确的手机号' : ''"
            autofocus
            v-model="telephone2"
            type="tel"
            label="手机号"
            placeholder="请输入手机号" />
        </van-col>
      </van-row>
      <van-row class="login-password">
        <van-col>
          <van-field
            :maxlength="18"
            :error-message="!checkPassword && password ? '密码不能为空' : ''"
            type="password"
            autofocus
            v-model="password"
            label="密码"
            placeholder="请输入密码" />
        </van-col>
      </van-row>
      <van-row class="login-password">
        <van-col span="16">
          <van-field
            :maxlength="4"
            :error-message="!checkSvg && userCaptcha ? '验证码不正确' : ''"
            autofocus
            v-model="userCaptcha"
            label="验证码"
            placeholder="请输入验证码" />
        </van-col>
        <van-col span="8" v-html="captcha" @click="reloadCaptcha">
        </van-col>
      </van-row>
      <van-button
        class="login-code-button"
        :disabled="loginByPasswordDisabled"
        type="primary"
        color="#409fea"
        round
        block
        @click="loginByPassword">登录</van-button>
      <div class="login-button-bottom">
        <a @click="codeLogin = true">短信登录</a>
        <a @click="$router.push('/forget-password')">忘记密码？</a>
      </div>
    </div>

    <!-- 三方登录 暂时不实现这个功能 -->
    <div class="auth-other" v-if="false">
      <div class="auth-other-tips">
        <span>第三方登录</span>
      </div>
      <div class="auth-other-container">
        <i class="iconfont icon-wechat-fill"></i>
        <i class="iconfont icon-QQ-circle-fill"></i>
        <i class="iconfont icon-github-fill"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha, getTelephoneCodeLogin } from '@/api/user.js'
const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
export default {
  name: 'Login',
  data () {
    return {
      telephone1: '',
      telephone2: '',
      code: '',
      password: '',
      codeLogin: true,
      // 用户输入的图形验证码
      userCaptcha: '',
      // 验证码是否已经发送，每90秒获取一次
      codeSend: false,
      captcha: '',
      rightCaptcha: '',
      // 验证码倒计时
      countTime: 90,
      // 定时器标识
      timerId: null
    }
  },
  computed: {
    // 使用密码登录按钮的点击状态控制,已登录的不允许再次点击
    loginByPasswordDisabled () {
      return this.telephone2 === '' || this.password === '' || this.userCaptcha === ''
    },

    // 检查验证码登录的手机号是否正确
    checkTelephone1 () {
      return reg.test(this.telephone1)
    },

    // 校验密码登录的手机号是否正确
    checkTelephone2 () {
      return reg.test(this.telephone2)
    },

    // 校验密码
    checkPassword () {
      return this.password.length > 0 && this.password.length <= 18
    },

    // 校验图形验证码
    checkSvg () {
      return this.userCaptcha.length === 4
    }
  },
  watch: {
    codeLogin (newVal) {
      if (!newVal) {
        this.getCaptcha()
      }
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    // 获取图形验证码
    async getCaptcha () {
      try {
        const captcha = await getCaptcha()
        this.captcha = captcha.data.data
        this.rightCaptcha = captcha.data.text
      } catch (error) {
        console.log(error, '错误捕获')
      }
    },

    // 获取登陆验证码
    async getTelephoneCodeLoginHandle () {
      if (!this.checkTelephone1) {
        return this.$toast('手机号不正确，无法获取验证码')
      }
      try {
        const codeResult = await getTelephoneCodeLogin({ telephone: this.telephone1 })
        if (codeResult.errno === 0) {
          this.codeSend = true
          this.countTime = 90
          this.$toast('验证码发送成功')
          this.timerId = setInterval(() => {
            this.countTime--
            if (this.countTime === 0) {
              clearInterval(this.timerId)
              this.timerId = null
              this.codeSend = false
            }
          }, 1000)
        } else {
          this.$toast(codeResult.message)
        }
      } catch (err) {
        console.log(err, 'err')
      }
    },

    // 短信登录
    async loginByTelephoneCode () {
      try {
        const codeResult = await this.$store.dispatch('logonAsyncByCode', { telephone: this.telephone1, code: this.code })
        console.log(codeResult, 'codeResult')
        if (codeResult.errno === 0) {
          this.$toast({ message: codeResult.message + '，正在飞速跳转中', duration: 400 })
          setTimeout(() => {
            this.$router.push(this.$route.query.redirect || '/')
            this.telephone1 = ''
            this.code = ''
          }, 500)
        } else {
          this.$toast({ message: codeResult.message, duration: 1000 })
        }
      } catch (err) {
        this.$toast({ message: err.message, duration: 1000 })
      }
    },

    // 密码登陆
    async loginByPassword () {
      if (this.userCaptcha.toLocaleLowerCase() !== this.rightCaptcha.toLocaleLowerCase()) {
        // 验证码输入错误重新获取，防止暴力撞库登陆
        this.$toast({ message: '验证码错误' })
        this.getCaptcha()
        return
      }
      try {
        const result = await this.$store.dispatch('loginAsyncByPassword', { telephone: this.telephone2, password: this.password })
        if (result.errno === 0) {
          this.$toast({
            message: result.message + '，正在飞速跳转中',
            duration: 400
          })
          setTimeout(() => {
            this.$router.push(this.$route.query.redirect || '/')
            this.userCaptcha = ''
            this.telephone2 = ''
            this.password = ''
          }, 500)
        }
      } catch (err) {
        this.$toast(err.message)
      }
    },

    reloadCaptcha () {
      this.getCaptcha()
    }
  }
}
</script>

<style scoped  lang="scss">
.xianyu-login {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  padding: 20px 35px 50px 35px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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

  &-word-title {
    font-size: 22px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: 25px;
  }

  &-tips {
    font-size: 15px;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, .6);
  }

  .border-tel {
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
      padding: 20px 16px 10px 0px;
    }

    /deep/ .van-field__control {
      font-size: 15px;
    }
  }

  .border-code {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;

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

    .get-code {
      display: inline-block;
      width: 92px;
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

    .get-code-disabled {
      color: #aaa;
      border: 1px solid #aaa;
    }

    .get-code.code-send {
      width: 92px;
      font-size: 12px;
    }
  }

  .login-code-button {
    margin-top: 50px;
    font-size: 18px;
  }

  .login-button-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    padding-left: 5px;
    font-size: 15px;
    color: #409fea;
  }
}

.xianyu-login-password {
  &-title {
    font-size: 22px;
    font-weight: 700;
    margin-top: 70px;
    margin-bottom: 25px;
  }
  &-tips {
    font-size: 15px;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, .6);
  }

  .login-password {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;

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
    }
  }
}

.auth-other {
  &-tips {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    span {
      position: relative;
      font-size: 15px;
      color: rgba(0, 0, 0, .6);
      &::before {
        content: "";
        position: absolute;
        width: 105px;
        right: 85px;
        top: 50%;
        height: 1px;
        transform: translateY(-50%) scaleY(.5);
        background-color: rgba(0, 0, 0, .15);
      }

      &::after {
        content: "";
        position: absolute;
        width: 105px;
        left: 85px;
        top: 50%;
        height: 1px;
        transform: translateY(-50%) scaleY(.5);
        background-color: rgba(0, 0, 0, .15);
      }
    }
  }

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;

    .iconfont {
      font-size: 40px;
    }

    .iconfont.icon-wechat-fill {
      color: #07c160;
    }

    .iconfont.icon-QQ-circle-fill {
      color: #109fea;
    }

    .iconfont.icon-github-fill {
      color: #1989fa;
    }
  }
}
</style>
