<template>
  <div class="user-detail">
    <div class="user-detail-header" ref="header">
      <div class="user-detail-header-left">
        <i ref="i" class="iconfont icon-left" @click="$router.go(-1)"></i>
        <span ref="user" class="user-name">{{ userInfo.nickname }}</span>
      </div>
      <div class="edit-user" ref="edit" v-show="isSelf" @click="$router.push('/userinfo-edit')">编辑资料</div>
    </div>
    <div 
      class="user-detail-img" 
      id="img"
    >
      <van-image 
        width="100%" 
        height="180" 
        fit="cover"
        :src="userInfo.background" />
    </div>

    <!-- 用户信息展示 -->
    <div class="user-detail-info">
      <div class="user-detail-info-avatar">
        <img :src="userInfo.avatar_url">
      </div>
      <div class="user-detail-info-set">
        <button v-if="isSelf" @click="$router.push('/userinfo-edit')">编辑资料</button>
        <button class="un-follow" v-if="!isSelf && !loginUserFollowId.includes(routeId)">关注</button>
        <button class="follow" v-if="!isSelf && loginUserFollowId.includes(routeId)">已关注</button>
      </div>
      <h1 class="user-detail-name">{{ userInfo.nickname }}</h1>
      <p class="personal_sign">{{ userInfo.personal_sign }}</p>
      <div class="number">
        <span><b>{{ fans }}</b>粉丝</span>
        <span><b>{{ follow }}</b>关注</span>
        <span><b>{{ zanNumber }}</b>获赞</span>
      </div>
    </div>

    <div class="user-dynamic-container">
      <dynamic-item
        v-for="item in dynamics"
        :item-value="item"
        :key="item._id"
      />
    </div>
  </div>
</template>

<script>
import DynamicItem from '@/components/DynamicItem/index.vue'
import { getUserInfoById, userFollows } from '@/api/user.js'
export default {
  name: 'UserDetail',
  data () {
    return {
      activeName: 'a',
      userInfo: [],
      // 已登录用户关注的用户的id
      loginUserFollowId: [],
      // 获赞数
      zanNumber: 0,
      // 关注数
      follow: 0,
      // 粉丝数
      fans: 0,
      dynamics: []
    }
  },

  watch: {
    routeId (newVal) {
      if (newVal) {
        if (this.isSelf) {
          this.getUserInfo(this.userId)
        } else {
          this.getUserInfo(newVal)
        }
      }
    }
  },

  methods: {
    // 屏幕滚动事件的监听操作
    screenScroll () {
      const img = document.getElementById('img')
      // 图片的高度
      const imgHeight = img.offsetHeight
      // 滚动的高度
      const height = document.body.scrollTop || document.documentElement.scrollTop
      if (height > imgHeight) {
        this.$refs.header.style.backgroundColor = `rgba(255, 255, 255, ${height / imgHeight})`
        this.$refs.user.style.opacity = height / imgHeight
        this.$refs.edit.style.opacity = height / imgHeight
        this.$refs.i.style.filter = 'invert(100%)'
        this.$refs.i.style.opacity = height / imgHeight
      } else if (height > 10 && height <= imgHeight) {
        this.$refs.header.style.backgroundColor = `rgba(255, 255, 255, ${height / imgHeight})`
        this.$refs.user.style.opacity = height / imgHeight
        this.$refs.edit.style.opacity = height / imgHeight
        this.$refs.i.style.filter = 'invert(100%)'
        this.$refs.i.style.opacity = height / imgHeight
        this.$refs.header.style.boxShadow = '0px 0px 0px 1px rgba(138, 138, 138, .01)'
      } else if (height <= 10) {
        this.$refs.i.style.color = '#fff'
        this.$refs.i.style.filter = ''
        this.$refs.i.style.opacity = 1
        this.$refs.user.style.opacity = 0
        this.$refs.edit.style.opacity = 0
        this.$refs.header.style.backgroundColor = 'transparent'
      }
    },

    // 获取用户的信息
    async getUserInfo (id) {
      const result = await getUserInfoById(id, this.isPrivate)
      if (result.errno === 0) {
        this.userInfo = result.data
        this.zanNumber = result.zan_number
        this.fans = result.fans
        this.follow = result.following
        this.dynamics = result.dynamics
      }
    },

    async getUserFollows () {
      const result = await userFollows(this.userId)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => tempArray.push(item._id))
        this.loginUserFollowId = tempArray
      }
    }
  },

  computed: {
    // 路由传递过来的个人信息的id
    routeId () {
      return this.$route.params.userId
    },

    // 已登录用户的个人的id
    userId () {
      return this.$store.state.token.userId
    },

    // 判断页面的内容是否是自己
    isSelf () {
      return this.routeId === this.userId
    },

    // 如果不是自己访问的个人主页，隐私动态不予展示
    isPrivate () {
      return this.isSelf ? '1' : '0'
    }
  },

  mounted () {
    if (this.isSelf) {
      this.getUserInfo(this.userId)
    } else {
      this.getUserInfo(this.routeId)
    }

    if (this.userId) {
      this.getUserFollows()
    }
    window.addEventListener('scroll', this.screenScroll)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.screenScroll)
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.user-detail {
  
  &-header {
    position: fixed;
    width: 100%;
    display: flex;
    height: auto;
    align-items: center;
    height: 50px;
    padding: 0 20px 0 10px;
    box-sizing: border-box;
    justify-content: space-between;
    z-index: 10000;

    &-left {
      display: flex;
      align-items: center;
      .iconfont {
        color: #fff;
        font-size: 24px;
        margin-right: 5px;
      }

      .user-name {
        color: #000;
        font-size: 16px;
        opacity: 0;
      }
    }

    .edit-user {
      font-size: 16px;
      color: #409fea;
      opacity: 0;
    }
  }

  &-img {
    width: 100%;
    max-height: 180px;
  }

  .user-detail-name {
    margin-top: 18px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 28px;
  }

  .personal_sign {
    padding-left: 28px;
    margin-top: 15px;
    font-size: 15px;
  }

  .number {
    padding-left: 28px;
    margin-top: 18px;
    font-size: 15px;

    span {
      margin-right: 10px;

      b {
        font-weight: 700;
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }

  &-info {
    position: relative;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 28px;

    &-avatar {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      position: absolute;
      top: -40px;
      left: 25px;
      background-color: #fff;
      padding: 3px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    &-set {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;

      button {
        width: 70px;
        height: 28px;
        font-size: 13px;
        border-radius: 5px;
        background-color: #fff;
        border: 1px solid #409fea;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #409fea;
      }

      button.un-follow {
        color: #409fea;
      }

      button.follow {
        color: #fff;
        background-color: #409fea;
      }
    }
  }
}

.user-dynamic-container {
  background-color: #F0F5FB;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
