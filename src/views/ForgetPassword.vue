<template>
  <div class="forget-password">
    <back-top title="忘记密码"></back-top>

    <div class="forget-password-container">
      <van-row class="forget-row">
        <van-col span="24">
          <van-field
            :maxlength="11"
            :error-message="!checkTelephone && tel ? '请输入正确的手机号' : ''"
            autofocus
            v-model="tel"
            label="手机号"
            placeholder="请输入手机号" />
        </van-col>
      </van-row>

      <van-row class="forget-row">
        <van-col span="16">
          <van-field :maxlength="6" label="验证码" placeholder="请输入验证码" v-model="code"/>
        </van-col>
        <van-col span="8">
          <span
            @click="getTelephoneCodeHandle"
            class="get-code"
            v-if="!codeSend"
            :class="{ 'code-send': codeSend }"
            style="font-size: 12px;">获取验证码</span>
          <span class="get-code get-code-disabled" v-else :class="{ 'code-send': codeSend }" style="font-size: 12px;">{{ countTime }}s再次发送</span>
        </van-col>
      </van-row>

      <van-row class="forget-row">
        <van-col span="24">
          <van-field
            :maxlength="18"
            :error-message="!checkPassword && password ? '请输入密码' : ''"
            type="password"
            autofocus
            v-model="password"
            label="密码"
            placeholder="请输入密码"/>
        </van-col>
      </van-row>

      <van-row class="forget-row">
        <van-col span="24">
          <van-field
            :maxlength="18"
            :error-message="!checkAgainPassword && againPassword ? '两次密码不一致' : ''"
            type="password"
            autofocus
            v-model="againPassword"
            label="密码"
            placeholder="请确认密码" />
        </van-col>
      </van-row>

      <div class="forget-button-container">
        <van-button
          @click="confirmReset"
          class="forget-code-button"
          :disabled="tel === '' || code === '' || !checkAgainPassword"
          type="primary"
          color="#409fea"
          round
          block>确认重置</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getTelephoneCodeFindPassword, resetPassword } from '@/api/user.js'
export default {
  name: 'ForgetPassword',
  data () {
    return {
      tel: '',
      code: '',
      password: '',
      againPassword: '',
      codeSend: false,
      countTime: 90,
      timerId: null
    }
  },
  computed: {
    // 校验电话号码的正确性
    checkTelephone () {
      const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
      return reg.test(this.tel)
    },
    checkPassword () {
      return this.password.length > 0 && this.password.length <= 18
    },
    checkAgainPassword () {
      return this.password === this.againPassword
    }
  },
  methods: {
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
    },

    // 提交重置密码
    async confirmReset () {
      const result = await resetPassword({ password: this.password, code: this.code, telephone: this.tel })
      if (result.errno === 0) {
        this.$toast({ message: '密码重置成功，跳转到登录页面中......', duration: 800 })
        setTimeout(() => {
          this.$router.push('/login')
        }, 960)
      } else {
        this.$toast(result.message)
      }
    },

    // 获取短信验证码
    async getTelephoneCodeHandle () {
      // 获取找回密码的验证码
      if (this.checkTelephone) {
        const codeResult = await getTelephoneCodeFindPassword({ telephone: this.tel })
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
      } else {
        this.$toast('手机号不正确，无法获取验证码')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.forget-password {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background-color: #fff;
}
.forget-password-container {
  background-color: #fff;
  padding: 40px 35px 50px 35px;
  box-sizing: border-box;
}
.forget-row {
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

.forget-button-container {
  margin-top: 50px;
}

.forget-code-button {
  margin-top: 40px;
  font-size: 18px;
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
</style>
