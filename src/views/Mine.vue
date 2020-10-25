<template>
  <div class="xianyu-mine">
    <div class="xianyu-mine-unlogin" v-if="!isLogined">
      <img src="../assets/images/user-unlogin.svg">
      <div class="content">
        <h1>点击头像登录</h1>
        <p>登录收藏喜欢的内容</p>
      </div>
    </div>
    <div class="xianyu-mine-login" v-if="isLogined">
      <div class="xianyu-mine-login-user">
        <img src="../assets/images/logo.png">
        <div class="content">
          <h1>打不死的小强</h1>
          <p>点击查看个人主页</p>
        </div>
      </div>
      <div class="xianyu-mine-login-about" v-if="false">
        <div class="number">
          <h1>2</h1>
          <span>关注</span>
        </div>
        <i class="iconfont icon-vertical_line"></i>
        <div class="number">
          <h1>0</h1>
          <span>粉丝</span>
        </div>
        <i class="iconfont icon-vertical_line"></i>
        <div class="number">
          <h1>8</h1>
          <span>喜欢</span>
        </div>
      </div>
    </div>
    <div class="xianyu-mine-base">
      <div class="xianyu-mine-base-item" @click="$router.push('/my-publish')">
        <div class="left">
          <i class="iconfont left-i-tag icon-shuxiebianji"></i>
          <span>我发表的</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-base-item" @click="$router.push('/mylike')">
        <div class="left">
          <i class="iconfont left-i-tag icon-dianzan1"></i>
          <span>我的点赞</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-base-item" @click="$router.push('/mycollection')">
        <div class="left">
          <i class="iconfont left-i-tag icon-shoucang"></i>
          <span>我的收藏</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-base-item" @click="$router.push('/browser-history')">
        <div class="left">
          <i class="iconfont left-i-tag icon-lishijilu"></i>
          <span>浏览历史</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
    </div>
    <div class="xianyu-mine-extend">
      <div class="xianyu-mine-extend-item" @click="$router.push('/mymessage')">
        <div class="left">
          <i class="iconfont left-i-tag icon-xiaoxi1"></i>
          <span>我的消息</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-extend-item" @click="$router.push('/fellowing')">
        <div class="left">
          <i class="iconfont left-i-tag icon-guanzhu" style="font-weight: bold;"></i>
          <span>我的关注</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-extend-item" @click="$router.push('/myfans')">
        <div class="left">
          <i class="iconfont left-i-tag icon-wode-wodefensi" style="font-weight: 500;"></i>
          <span>我的粉丝</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
    </div>
    <div class="xianyu-mine-setting" v-if="isLogined">
      <div class="xianyu-mine-setting-item" @click="$router.push('/setting')">
        <div class="left">
          <i class="iconfont left-i-tag icon-shezhi1"></i>
          <span>设置</span>
        </div>
        <div class="right">
          <i class="iconfont right-i-tag icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      // 是否登录过了
      isLogined: true
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-mine {
  height: auto;
  margin-bottom: 60px;
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
  }

  &-base,
  &-extend,
  &-setting {
    background-color: #fff;
    margin-top: 10px;

    &-item:last-of-type {
      border: none;
    }

    &-item {
      display: flex;
      padding: 16px 15px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(38, 38, 38, .05);

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        user-select: none;
      }

      .left-i-tag {
        font-size: 22px;
        color: rgba(0, 0, 0, .4);
        margin-right: 8px;
      }

      span {
        font-size: 15px;
      }

      .right-i-tag {
        color: rgba(0, 0, 0, 8);
        font-size: 18px;
      }
    }
  }
}
</style>
