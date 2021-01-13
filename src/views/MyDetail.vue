<template>
  <div class="user-detail">
    <div class="user-detail-header" ref="header">
      <div class="user-detail-header-left">
        <i ref="i" class="iconfont icon-left" @click="$router.go(-1)"></i>
        <span ref="user" class="user-name">{{ userInfo.nickname }}</span>
      </div>
      <div 
        class="edit-user" 
        ref="edit" 
        v-if="isSelf" 
        @click="$router.push('/userinfo-edit')"
      >
        编辑资料
      </div>
      <div 
        class="edit-user" 
        ref="edit" 
        v-if="!isSelf && !loginUserFollowId.includes(routeId)" 
        @click="followHandle"
      >
        关注
      </div>
      <div 
        class="edit-user" 
        ref="edit" 
        v-if="!isSelf && loginUserFollowId.includes(routeId)" 
        @click="unfollowHandle"
      >
        已关注
      </div>
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
        :is-like="isLogin && userZanedId.includes(item._id)"
        @operate="userOperateHandle(item)"
        @unlike="userCancelZan(item._id)"
        @like="userZanHandle(item._id)"
      />
    </div>

    <van-empty :image="emptyImg" v-if="!hasPublishData && showTag" description="还没有发表过任何动态哟" />

    <!-- 弹出层操作 -->
    <van-popup
      v-model="showPopup"
    >
      <div class="my-detail-operate">
        <div class="my-detail-operate-item user-report" v-if="!isSelf" @click="userReport">
          <div class="line"></div>
          举报
        </div>
        <div class="my-detail-operate-item copy-operate">
          <div class="line"></div>
          <Copy
            :content="selectDynamic.content && selectDynamic.content.replace(/<br>/g, '\n')" 
            @copyCallback="copyCallback">
            复制
          </Copy>
        </div>
        <div class="my-detail-operate-item delete-operate" v-if="isSelf" @click="userDeleteHandle">
          <div class="line"></div>
          删除
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import DynamicItem from '@/components/DynamicItem/index.vue'
import { getUserInfoById, userFollows, userFollow, userCancelFollow, likeDynamics, unlikeDynamics } from '@/api/user.js'
import { deleteDynamic } from '../api/dynamic.js'
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
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 展示用户操作的弹框
      showPopup: false,
      // 选中的需要操作的动态
      selectDynamic: {}
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
      let imgHeight
      if (img) {
        // 图片的高度
        imgHeight = img.offsetHeight
      }
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
    },

    // 复制文本
    copyCallback () {
      this.showPopup = false
      this.$toast('复制成功')
      this.selectDynamic = {}
    },

    // 点击出现更多操作选项
    userOperateHandle (item) {
      this.selectDynamic = item
      this.showPopup = true
    },

    // 删除动态
    userDeleteHandle () {
      this.showPopup = false
      this.$dialog.confirm({
        width: '315px',
        confirmButtonColor: '#666',
        cancelButtonColor: '#e92322',
        confirmButtonText: '取消',
        cancelButtonText: '确定',
        allowHtml: true,
        message: '<h1 style="color: #555; line-height: 24px;font-size:16px">确定要删除这条动态吗？</h1>'
      })
        .then(() => {
          console.log('确定')
        })
        .catch(async () => {
          console.log(this.selectDynamic._id, 'this.selectDynamic._id')
          const result = await deleteDynamic(this.selectDynamic._id)
          if (result.errno === 0) {
            const detailIndex = this.dynamics.findIndex(item => item._id === this.selectDynamic._id)
            console.log(detailIndex, 'detailIndex')
            if (detailIndex > -1) {
              this.dynamics.splice(detailIndex, 1)
            }
            const newLatestDynamics = JSON.parse(JSON.stringify(this.$store.state.latestDynamics))
            const newRecommendDynamics = JSON.parse(JSON.stringify(this.$store.state.recommendDynamics))
            let latestTotal = newLatestDynamics.total
            let recommendTotal = newRecommendDynamics.total
            const newLatestData = newLatestDynamics.data
            const newRecommendData = newRecommendDynamics.data
            const latestIndex = newLatestData.findIndex(item => item._id === this.selectDynamic._id)
            const recommendIndex = newRecommendData.findIndex(item => item._id === this.selectDynamic._id)
            if (latestIndex > -1) {
              newLatestData.splice(latestIndex, 1)
            }
            if (recommendIndex > -1) {
              newRecommendData.splice(recommendIndex, 1)
            }
            latestTotal -= 1
            recommendTotal -= 1
            this.$store.commit('modifyLatestDynamics', { data: newLatestData, total: latestTotal })
            this.$store.commit('modifyRecommendDynamics', { data: newRecommendData, total: recommendTotal })
            this.$toast('删除成功')
          }
          console.log('取消')
        })
    },

    // 用户举报的操作
    userReport () {
      this.showPopup = false
      this.$toast('举报成功')
    },

    // 用户取消点赞
    async userCancelZan (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdArray = JSON.parse(JSON.stringify(this.userZanedId))
        const zanIdIndex = zanIdArray.indexOf(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          zanIdArray.splice(zanIdIndex, 1)
          this.$store.commit('updateLoginUserZanDynamicsId', zanIdArray)
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.dynamics, index, newDynamic)
        }
      }
    },

    // 用户点赞
    async userZanHandle (id) {
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
        const result = await likeDynamics(id)
        if (result.errno === 0 && !this.userZanedId.includes(id)) {
          const zanIdArray = JSON.parse(JSON.stringify(this.$store.state.loginUserZanDynamicsId))
          zanIdArray.push(id)
          this.$store.commit('updateLoginUserZanDynamicsId', zanIdArray)
          const detailIndex = this.dynamics.findIndex(item => item._id === id)
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${detailIndex}`]))
          newDynamic.zan_number++
          console.log(newDynamic, 'newDynamic')
          this.$set(this.dynamics, detailIndex, newDynamic)
          // 找到store中的最新和推荐数据进行修改
          const recommendDynamics = JSON.parse(JSON.stringify(this.$store.state.recommendDynamics)).data
          const latestDynamics = JSON.parse(JSON.stringify(this.$store.state.latestDynamics)).data
          const recommendIndex = recommendDynamics.findIndex(item => item._id === id)
          const latestIndex = latestDynamics.findIndex(item => item._id === id)
          recommendDynamics[recommendIndex].zan_number++
          latestDynamics[latestIndex].zan_number++
          this.$store.commit('modifyRecommendDynamics', { data: recommendDynamics })
          this.$store.commit('modifyLatestDynamics', { data: latestDynamics })
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
    },

    // 从vuex取得所有点赞过的动态id
    userZanedId () {
      return this.$store.state.loginUserZanDynamicsId
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

.user-detail {
  /deep/ .van-popup {
    height: 112px;
    width: 280px;
    margin-top: 214px;
    border-radius: 12px;
    z-index: 10002!important;
  }

  /deep/ .van-overlay {
    z-index: 10001!important;
  }
}

.my-detail-operate {
  &-item {
    height: 56px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, .75);
    align-items: center;
    position: relative;
  }

  &-item.copy-operate {
    color: #409fea;
  }

  &-item.delete-operate {
    color: #e92322;
  }
}

.my-detail-operate.is-self {
  height: 112px;
}

.user-report .line,
.copy-operate .line {
  position: absolute;
  left: 15px;
  right: 15px;
  height: 1px;
  bottom: 0;
  background-color: #f3f3f3;
  transform: scaleY(1);
}
</style>
