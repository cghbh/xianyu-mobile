<template>
  <div class="xianyu-mine">
    <div class="xianyu-mine-unlogin" v-if="!isLogin" @click="$router.push('/login')">
      <img src="../assets/images/user-unlogin.svg">
      <div class="content">
        <h1>点击头像登录</h1>
        <p>登录收藏喜欢的内容</p>
      </div>
    </div>
    <div class="xianyu-mine-login" v-else>
      <div class="xianyu-mine-login-user" @click="$router.push('/user-detail')">
        <!-- <img :src="userInfo.avatar_url ? userInfo.avatar_url : 'img/logo.619055bf.png'" alt=""> -->
        <van-image width="70" height="70" fit="cover" round src="http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_aa3171f1021eec318efdf3179f89d7af.jpg"/>
        <div class="content">
          <h1>{{ userInfo.nickname }}</h1>
          <p>点击查看个人主页</p>
        </div>
      </div>
    </div>

    <div class="xianyu-mine-base">
      <van-cell-group @click="$router.push('/my-publish')">
        <van-cell title="我发表的" border class="iconfont icon-shuxiebianji">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group @click="$router.push('/mylike')">
        <van-cell title="我的点赞" border class="iconfont icon-dianzan1">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group @click="$router.push('/mycollection')">
        <van-cell title="我的收藏" border class="iconfont icon-shoucang">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="xianyu-mine-extend">
      <van-cell-group @click="$router.push('/fellowing')">
        <van-cell title="我的关注" border class="iconfont icon-guanzhu">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group @click="$router.push('/myfans')">
        <van-cell title="我的粉丝" border class="iconfont icon-wode-wodefensi">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group @click="$router.push('/mycollection')">
        <van-cell title="我的收藏" border class="iconfont icon-shoucang">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="xianyu-mine-setting" v-if="isLogin" >
      <van-cell-group @click="$router.push('/setting')">
        <van-cell title="设置" border class="iconfont icon-shoucang">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="xianyu-mine-feedback">
      <van-cell-group @click="$router.push('/feedback')">
        <van-cell title="意见反馈" border class="iconfont icon-shoucang">
          <template #right-icon>
            <i class="iconfont right-i-tag icon-right"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      // 是否登录过了
      isLogined: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.token !== null && this.$store.state.userInfo !== null
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-mine {
  position: relative;
  height: 100%;
  overflow: hidden;
  /deep/ .van-cell {
    padding: 16px 16px;
  }

  /deep/ .van-cell__title {
    padding-left: 10px;
    font-size: 15px;
  }

  .iconfont {
    font-size: 21px;
  }

  .iconfont.right-i-tag {
    color: rgba(0, 0, 0, 8);
    font-size: 18px;
  }
}
.xianyu-mine {
  &-unlogin {
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 108px;
    user-select: none;
    padding-left: 20px;

    img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin-right: 16px;
      padding: 8px;
      box-sizing: border-box;
      background-color: rgba(38, 38, 38, .2);
    }

    .content {
      user-select: none;

      h1 {
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 10px;
        color: rgba(0, 0, 0, .75);
      }

      p {
        font-size: 14px;
        color: rgba(0, 0, 0, .7);
      }
    }
  }

  &-login {
    height: 108px;
    user-select: none;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-shadow: 0 0 3px rgba(38, 38, 38, .05);;

    &-user {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1;

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 16px;
      }

      .content {
        user-select: none;
        margin-left: 15px;

        h1 {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 14px;
          color: rgba(0, 0, 0, .75);
        }

        p {
          font-size: 14px;
          color: rgba(0, 0, 0, .7);
        }
      }
    }
  }

  &-base,
  &-extend,
  &-setting {
    background-color: #fff;
    margin-top: 10px;
  }
}
</style>
