<template>
  <div class="forget-password">
    <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="userBack">
      <template #left>
        <div class="back-container">
          <i class="iconfont icon-left"></i>
        </div>
      </template>
    </van-nav-bar>

    <div class="forget-password-container">
      <van-row class="forget-row">
        <van-col span="24">
          <van-field :maxlength="11" autofocus v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
        </van-col>
      </van-row>
      <van-row class="forget-row">
        <van-col span="16">
          <van-field label="验证码" placeholder="请输入验证码" v-model="code"/>
        </van-col>
        <van-col span="8">
          <span class="get-code" :class="{ 'code-send': codeSend }" style="font-size: 12px;">{{ codeSend ? '59s再次发送': '获取验证码' }}</span>
        </van-col>
      </van-row>
      <van-row class="forget-row">
        <van-col span="24">
          <van-field type="password" autofocus v-model="password" label="密码" placeholder="请输入密码" />
        </van-col>
      </van-row>
      <van-row class="forget-row">
        <van-col span="24">
          <van-field type="password" autofocus v-model="againPassword" label="密码" placeholder="请确认密码" />
        </van-col>
      </van-row>
      <div class="forget-button-container">
        <van-button @click="register" class="forget-code-button" :disabled="tel === '' || code === ''" type="primary" color="#409fea" round block>登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data () {
    return {
      tel: '',
      code: '',
      password: '',
      againPassword: '',
      codeSend: true
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

.get-code.code-send {
  width: 92px;
  font-size: 12px;
}
</style>
