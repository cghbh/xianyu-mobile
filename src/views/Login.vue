<template>
  <div class="xianyu-login">
    <div class="user-back" @click="$router.go(-1)">
      <i class="iconfont icon-left"></i>
    </div>
    <div class="xianyu-login-code">
      <h1 class="xianyu-login-word-title">欢迎登录闲语</h1>
      <p class="xianyu-login-tips">仰望星空，脚踏实地。</p>
      <van-row class="border-tel">
        <van-col span="24">
          <van-field :maxlength="11" autofocus v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
        </van-col>
      </van-row>
      <van-row class="border-code">
        <van-col span="16">
          <van-field label="验证码" placeholder="请输入验证码" v-model="code"/>
        </van-col>
        <van-col span="8">
          <span>获取验证码</span>
        </van-col>
      </van-row>
      <van-button class="login-code-button" type="primary" color="#409fea" round block>登录</van-button>
      <div class="login-button-bottom">
        <a>其他登录方式</a>
        <a>用户注册</a>
      </div>
    </div>

    <!-- 三方登录 -->
    <div class="auth-other">
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
export default {
  name: 'Login',
  data () {
    return {
      tel: '',
      code: ''
    }
  }
}
</script>

<style scoped  lang="scss">
.xianyu-login {
  height: 100%;
  background-color: #fff;
  padding: 20px 30px 50px 30px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .user-back {
    position: absolute;
    top: 20px;
    left: 30px;
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
    padding-left: 16px;
    margin-top: 70px;
    margin-bottom: 21px;
  }

  &-tips {
    padding-left: 16px;
    font-size: 15px;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, .6);
  }

  .border-tel {
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
      padding: 20px 16px 10px 16px
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
      padding: 20px 16px 10px 16px
    }

    /deep/ .van-col.van-col--8 {
      text-align: right;
      font-size: 15px;
      margin-top: 5px;
    }
  }

  .login-code-button {
    margin-top: 40px;
    font-size: 18px;
  }

  .login-button-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 76px;
    padding-left: 5px;
    font-size: 15px;
    color: #409fea;
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
        background-color: rgba(0, 0, 0, .2);
      }

      &::after {
        content: "";
        position: absolute;
        width: 105px;
        left: 85px;
        top: 50%;
        height: 1px;
        transform: translateY(-50%) scaleY(.5);
        background-color: rgba(0, 0, 0, .2);
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
