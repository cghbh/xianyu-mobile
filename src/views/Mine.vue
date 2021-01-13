<template>
  <div class="xianyu-mine">
    <div class="xianyu-mine-header">
      <div class="xianyu-mine-header-container">
        <div class="xianyu-header-top">
          <div 
            class="xianyu-header-top-left-logined" 
            v-if="token"
            @click="$router.push(`/my-detail/${userId}`)"
          >
            <van-image width="56" height="56" round fit="cover" :src="userInfo.avatar_url" />
          </div>
          <div class="xianyu-header-top-left" @click="$router.push('/login')" v-else>
            <img src="../assets/images/user-unlogin.svg" alt="未登录">
          </div>
          <div class="xianyu-header-top-right">
            <h1>{{ token ? userInfo.nickname : '点击头像登录'}}</h1>
            <p>{{ token ? '点击头像查看个人主页' : '登录收藏喜欢的内容'}}</p>
          </div>
        </div>
        <div class="xianyu-header-bottom">
          <div class="xianyu-header-bottom-dynamic" @click="$router.push('/my-publish')">
            <h1>{{ dynamicNumber }}</h1>
            <p>动态</p>
          </div>
          <div class="xianyu-header-bottom-fans" @click="$router.push('/myfans')">
            <h1>{{ fansNumber }}</h1>
            <p>粉丝</p>
          </div>
          <div class="xianyu-header-bottom-follows" @click="$router.push('/fellowing')">
            <h1>{{ followNumber }}</h1>
            <p>关注</p>
          </div>
        </div>
      </div>
    </div>

    <div class="xianyu-mine-settings settings-one">
      <div class="xianyu-mine-settings-item border-bottom" @click="$router.push('/mylike')">
        <div class="xianyu-mine-settings-item-left">
          <i class="iconfont icon-like"></i>
          <span>我的点赞</span>
        </div>
        <div class="xianyu-mine-settings-item-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-settings-item" @click="$router.push('/mycollection')">
        <div class="xianyu-mine-settings-item-left">
          <i class="iconfont icon-shoucang"></i>
          <span>我的收藏</span>
        </div>
        <div class="xianyu-mine-settings-item-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>

    <div class="xianyu-mine-settings settings-two">
      <div class="xianyu-mine-settings-item border-bottom" @click="$router.push('/userinfo-edit')">
        <div class="xianyu-mine-settings-item-left">
          <i class="iconfont icon-ziliao"></i>
          <span>我的资料</span>
        </div>
        <div class="xianyu-mine-settings-item-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="xianyu-mine-settings-item" @click="$router.push('/feedback')">
        <div class="xianyu-mine-settings-item-left">
          <i class="iconfont icon-yijianfankui"></i>
          <span>意见反馈</span>
        </div>
        <div class="xianyu-mine-settings-item-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>

    <div class="xianyu-mine-settings settings-three" @click="$router.push('/setting')">
      <div class="xianyu-mine-settings-item border-bottom">
        <div class="xianyu-mine-settings-item-left">
          <i class="iconfont icon-shezhi1"></i>
          <span>设置</span>
        </div>
        <div class="xianyu-mine-settings-item-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadUserInfo, getMyFans, userFollows, getOwnPublishedDynamics } from '@/api/user.js'
export default {
  name: 'Mine',
  data () {
    return {
      userInfo: {},
      isLogin: false,
      fansNumber: 0,
      followNumber: 0,
      dynamicNumber: 0
    }
  },
  mounted () {
    // 缓存控制
    this.$store.commit('addCachedPages', 'Mine')
    if (this.token) {
      this.isLogin = true
      this.loadUserInfo()
      this.getLoginedFans()
      this.getMyFollows()
      this.getMyDynamics()
    }
  },

  async activated () {
    // 如果数据发生了变化才需要更新触发
    const newResult = await Promise.all([loadUserInfo(), getMyFans(this.userId), userFollows(this.userId), getOwnPublishedDynamics()])
      
    if (newResult[0].errno === 0) {
      if (JSON.stringify(newResult[0].data) !== JSON.stringify(this.userInfo)) {
        this.userInfo = newResult[0].data
      }
    }
    if (newResult[1].errno === 0 && this.fansNumber !== newResult[1].total) {
      this.fansNumber = newResult[1].total
    }
    if (newResult[2].errno === 0 && this.followNumber !== newResult[2].total) {
      this.followNumber = newResult[2].total
    }
    if (newResult[3].errno === 0 && this.dynamicNumber !== newResult[3].data.length) {
      this.dynamicNumber = newResult[3].data.length
    }
  },

  computed: {
    token () {
      return this.$store.state.token.token
    },
    userId () {
      return this.$store.state.token.userId
    }
  },
  methods: {
    // 通过登录的token请求用户的信息
    async loadUserInfo () {
      const result = await loadUserInfo()
      if (result.errno === 0) {
        this.userInfo = result.data
      } else {
        this.$toast('请求用户信息失败')
      }
    },

    // 获取已登录用户的粉丝数量
    async getLoginedFans () {
      const result = await getMyFans(this.userId)
      if (result.errno === 0) {
        this.fansNumber = result.total
      }
    },

    // 获取我的关注的人的数量
    async getMyFollows () {
      const result = await userFollows(this.userId)
      if (result.errno === 0) {
        this.followNumber = result.total
      }
    },

    // 获取我发布的动态的数量
    async getMyDynamics () {
      const result = await getOwnPublishedDynamics()
      if (result.errno === 0) {
        this.dynamicNumber = result.data.length
      }
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-mine {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  background-color: rgba(38, 38, 38, .06);
  &-header {
    height: 145px;
    background-color: #409fea;
    border-radius: 0 0 10px 10px;
    position: relative;

    &-container {
      position: absolute;
      bottom: -60px;
      height: 164px;
      left: 18px;
      right: 18px;
      border-radius: 10px;
      background-color: #fff;
    }
  }
}

.xianyu-mine-header-container {
  .xianyu-header-top {
    display: flex;
    justify-content: flex-start;
    padding: 15px;
    height: 100px;
    box-sizing: border-box;
    align-items: center;

    &-left {
      width: 56px;
      height: 56px;
      padding: 10px;
      box-sizing: border-box;
      background-color: rgba(38, 38, 38, .2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &-left-logined {
      width: 56px;
      height: 56px;
    }

    &-right {
      margin-left: 12px;
      h1 {
        font-size: 18px;
        color: rgba(0, 0, 0, .85);
      }

      p {
        font-size: 15px;
        color: rgba(0, 0, 0, .6);
        margin-top: 10px;
      }
    }
  }

  .xianyu-header-bottom {
    display: flex;
    padding: 10px 30px 20px 30px;
    justify-content: space-between;
    height: 60px;
    box-sizing: border-box;
    align-items: center;

    &-dynamic,
    &-fans,
    &-follows {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      font-size: 17px;
      color: rgba(0, 0, 0, .75);
      font-weight: bold;
    }

    p {
      font-size: 15px;
      color: rgba(0, 0, 0, .65);
      margin-top: 3px;
    }
  }
}

.xianyu-mine-settings {
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 14px;

    &-left,
    &-right {
      display: flex;
      align-items: center;
    }

    .icon-like,
    .icon-shoucang,
    .icon-ziliao,
    .icon-yijianfankui,
    .icon-shezhi1 {
      color: #409fea;
      font-size: 20px;
    }

    .icon-right {
      font-size: 20px;
      color: rgba(0, 0, 0, .7);
    }

    span {
      font-size: 16px;
      margin-left: 10px;
    }
  }
}

.xianyu-mine-settings.settings-one {
  margin: 0 18px;
  background-color: #fff;
  margin-top: 80px;
  border-radius: 10px;
  box-sizing: border-box;
}

.xianyu-mine-settings.settings-two,
.xianyu-mine-settings.settings-three {
  margin: 0 18px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
