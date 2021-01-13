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
        <van-image 
          :src="userInfo.avatar_url && userInfo.avatar_url"
          width="75"
          height="75"
          round
          object-fit="cover"
        />
      </div>
      <div class="user-detail-info-set">
        <button v-if="isSelf" @click="$router.push('/userinfo-edit')">编辑资料</button>
        <button 
          v-if="!isSelf && !loginUserFollowId.includes(routeId)" 
          class="un-follow" 
          @click="followHandle"
        >
          关注
        </button>

        <button 
          v-if="!isSelf && loginUserFollowId.includes(routeId)"
          class="follow" 
          @click="unfollowHandle"
        >
          已关注
        </button>
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

    <van-empty :image="emptyImg" v-if="!hasPublishData && showTag" description="还没有发表过任何动态哟" />
  </div>
</template>

<script>
import DynamicItem from '@/components/DynamicItem/index.vue'
import { getUserInfoById, userFollows, userFollow, userCancelFollow } from '@/api/user.js'
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
      dynamics: [],
      // 缺省图片的标记
      showTag: false,
      emptyImg: require('../assets/images/empty-image-default.png')
    }
  },

  mounted () {
    // 缓存控制
    this.$store.commit('addCachedPages', 'UserDetail')
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

  activated () {
    this.userInfo = {}
    this.zanNumber = 0
    this.fans = 0
    this.follow = 0
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
    },

    dynamics (newVal) {
      if (newVal.length <= 0) {
        this.showTag = true
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

    // 获取用户关注的人的id
    async getUserFollows () {
      const result = await userFollows(this.userId)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => tempArray.push(item._id))
        this.loginUserFollowId = tempArray
      }
    },

    // 关注用户
    async followHandle () {
      // 判断用户是否登录，没有登录的话跳转到登录页面，并且携带当前的路径
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        const result = await userFollow(this.routeId)
        if (result.errno === 0 && !this.loginUserFollowId.includes(this.routeId)) {
          this.loginUserFollowId.push(this.routeId)
          this.$toast('关注成功')
        }
      }
    },

    // 取消关注用户
    async unfollowHandle () {
      const result = await userCancelFollow(this.routeId)
      if (result.errno === 0) {
        const index = this.loginUserFollowId.indexOf(this.routeId)
        if (index > -1) {
          this.loginUserFollowId.splice(index, 1)
          this.$toast('已取消关注')
        }
      }
    }
  },

  computed: {
    // 用户是否登录
    isLogin () {
      return this.$store.state.token.token
    },

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
    },

    // 是否有发布的动态
    hasPublishData () {
      return this.dynamics.length > 0
    }
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.user-detail {
  height: 100%;
  background-color: #F0F5FB;
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
    line-height: 24px;
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
      display: flex;
      justify-content: center;
      align-items: center;
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
