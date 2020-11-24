<template>
  <div class="xianyu-register">
    <div class="user-back" @click="userBack">
      <i class="iconfont icon-left"></i>
    </div>
    <h1 class="xianyu-register-title">欢迎注册闲语</h1>
    <p class="xianyu-register-tips">仰望星空，脚踏实地。</p>

    <!-- 注册表单 -->
    <van-row class="reg-row">
      <van-col span="24">
        <van-field
         :error-message="!rightTelephone && telephone ? '请输入正确的手机号' : ''"
         :maxlength="11"
         v-model="telephone"
         autofocus
         type="tel"
         label="手机号"
         placeholder="请输入手机号"/>
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="24">
        <van-field
          :maxlength="11"
          :error-message="!rightNickname && nickname ? '请输入2到10个字的昵称' : ''"
          v-model="nickname"
          autofocus
          label="昵称"
          placeholder="请输入昵称" />
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="16">
        <van-field
          v-model="code"
          label="验证码"
          placeholder="请输入验证码"
          maxlength="6"
        />
      </van-col>
      <van-col span="8">
        <span
          @click="getTelephoneCode"
          v-if="!codeSend"
          :class="{ 'code-send': codeSend }"
          class="get-code"
          style="font-size: 12px;">获取验证码</span>
          <span
            v-else
            :class="{ 'code-send': codeSend }"
            class="get-code get-code-disabled"
            style="font-size: 12px;">{{ countTime }}s再次发送</span>
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="24">
        <van-field
          :error-message="!rightPassword && password ? '请输入6到18位数的密码' : ''"
          v-model="password"
          type="password"
          autofocus
          label="密码"
          placeholder="请输入密码" />
      </van-col>
    </van-row>
    <van-row class="reg-row">
      <van-col span="24">
        <van-field
          :error-message="!checkAgainPassword && againPassword ? '两次密码输入不一致' : ''"
          v-model="againPassword"
          type="password"
          autofocus
          label="确认密码"
          placeholder="请确认密码" />
      </van-col>
    </van-row>
    <div class="register-button-container">
      <van-button @click="register" class="register-code-button" :disabled="telephone === '' || code === ''" type="primary" color="#409fea" round block>立即注册</van-button>
    </div>
  </div>
</template>

<script>
import { userRegister, getTelephoneCodeReg, checkTelephoneCode } from '@/api/user.js'
export default {
  name: 'Register',
  data () {
    return {
      telephone: '',
      code: '',
      password: '',
      againPassword: '',
      nickname: '',
      timerId: null,
      codeSend: false,
      countTime: 90
    }
  },
  computed: {
    // 校验手机号是否合格
    rightTelephone () {
      const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
      return reg.test(this.telephone)
    },
    
    // 校验正确的昵称
    rightNickname () {
      return this.nickname.length >= 2 && this.nickname.length <= 10
    },
    
    // 校验密码格式
    rightPassword () {
      return this.password.length >= 6 && this.password.length <= 18
    },
    
    // 再次确认密码
    checkAgainPassword () {
      return this.password === this.againPassword
    }
  },
  methods: {
    // 获取短信验证码
    async getTelephoneCode () {
      // 验证码发送，此时90s内禁止再次发送
      this.countTime = 90
      if (!this.rightTelephone) {
        return this.$toast({ message: '手机号不正确，无法获取验证码！', duration: 1500 })
      }
      if (!this.rightNickname) {
        return this.$toast({ message: '请填写2到10个字的昵称！', duration: 1500 })
      }
      try {
        const result = await getTelephoneCodeReg({ telephone: this.telephone })
        if (result.errno === 0) {
          this.$toast({ message: '验证码发送成功', duration: 1500 })
          this.codeSend = true
          this.timerId = setInterval(() => {
            this.countTime--
            if (this.countTime === 0) {
              clearInterval(this.timerId)
              this.timerId = null
              this.codeSend = false
            }
          }, 1000)
        } else {
          this.$toast({ message: result.message, duration: 1500 })
        }
      } catch (err) {
        console.log(err, 'err')
      }
    },
    async register () {
      // 提交注册之前校验验证码的正确性
      try {
        const codeResult = await checkTelephoneCode({ telephone: 'register_' + this.telephone, code: this.code })
        // 验证码正确执行注册
        if (codeResult.errno === 0) {
          const regResult = await userRegister({
            telephone: this.telephone,
            password: this.password,
            nickname: this.nickname,
            // 默认的头像
            avatar_url: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png'
          })
          if (regResult.errno === 0) {
            this.$toast({ message: regResult.message, duration: 1000 })
            // 跳转到登录页面
            setTimeout(() => {
              this.$router.push('/login')
            }, 1200)
          } else {
            this.$toast({ message: regResult.message, duration: 1000 })
          }
        } else {
          return this.$toast({ message: codeResult.message, duration: 1500 })
        }
      } catch (err) {
        console.log(err, err)
      }
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
      width: 72px;
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

  .get-code-disabled {
    color: #aaa;
    border: 1px solid #aaa;
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
