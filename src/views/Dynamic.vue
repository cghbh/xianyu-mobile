<template>
  <div class="xianyu-home-page">
    <van-tabs v-model="active" sticky animated swipeable title-active-color="#409fea" color="#409fea">
      <van-tab id="van-tabs-scroll" title="推荐">
        <recomend-dynamics @recommend="recommendOperate"></recomend-dynamics>
      </van-tab>

      <van-tab title="最新">
        <latest-dynamics @latest="latestOperate"></latest-dynamics>
      </van-tab>

      <van-tab title="关注">
        <follow-dynamics @follow="followOperate"></follow-dynamics>
      </van-tab>
      
    </van-tabs>

    <van-popup v-model="showPopup" :class="{ 'unlogin': !isLogin, 'login-self': isSelf, 'follow': isPopupFollow }">
      <div class="dynamic-operate">
        <div 
          class="dynamic-operate-item" 
          v-if="isLogin && !isSelf && !isPopupFollow"
          @click="noInterestingHandle">不感兴趣</div>
        <div class="van-hairline--bottom" v-if="isLogin"></div>
        <div 
          class="dynamic-operate-item" 
          v-if="isLogin && !isSelf && !isPopupFollow"
          @click="shieldHandle">屏蔽：{{ operateDynamic.nickname }}</div>
        <div class="van-hairline--bottom" v-if="isLogin"></div>
        <div class="dynamic-operate-item" @click="reportHandle" v-if="isLogin && !isSelf">举报</div>
        <div class="van-hairline--bottom" v-if="isLogin"></div>
        <div class="dynamic-operate-item copy-operate">
          <Copy
            :content="operateDynamic.content && operateDynamic.content.replace(/<br>/g, '\n')" 
            @copyCallback="copyCallback">
            复制
          </Copy>
        </div>
        <div class="van-hairline--bottom" v-if="isLogin && isSelf"></div>
        <div class="dynamic-operate-item delete-operate" v-if="isLogin && isSelf">删除</div>
      </div>
    </van-popup>

    <i 
      class="iconfont add-word icon-tianxie"
      @click="$router.push('/dynamic-publish')"
    >
    </i>
  </div>

</template>

<script>
import RecomendDynamics from './DynamicRecommend.vue'
import FollowDynamics from './DynamicFollow.vue'
import LatestDynamics from './DynamicLatest.vue'
export default {
  name: 'Dynamic',
  data () {
    return {
      active: 0,
      dynamics: [],
      // 没有动态数据的补充
      showNoRecommend: true,
      // 推荐的动态
      recommendDynamics: [],
      // 没有最新数据
      showNoLatest: true,
      // 最新的动态
      latestDynamics: [],
      // 关注的人没有动态
      // showNoFollow: false,
      // 关注者的动态
      followDynamics: [],
      // 推荐内容的刷新状态
      isRecommendLoading: true,
      isLoading: true,
      // 最新内容的刷新状态
      isLatestLoading: true,
      showPopup: false,
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 操作的是哪一条动态
      operateDynamic: {},
      // 如果是我的关注的内容，不需要屏蔽和不感兴趣的功能
      isPopupFollow: false
    }
  },

  computed: {
    // 判断是否是自己，如果是自己，则只有删除和复制，如果未登录的话，只有复制功能，如果登录看到的不是自己的动态，则有屏蔽功能和不想看到这条动态的功能，如果是自己关注的人，则只有复制和举报的功能
    isSelf () {
      return this.operateDynamic.u_id === this.userId
    },

    // 是否登录
    isLogin () {
      return this.$store.state.token.token
    },

    userId () {
      return this.$store.state.token.userId
    }
  },

  components: {
    RecomendDynamics,
    FollowDynamics,
    LatestDynamics
  },

  methods: {
    // 最新动态的操作
    latestOperate (value) {
      this.showPopup = true
      this.isPopupFollow = false
      this.operateDynamic = value
      console.log('latest', value)
    },

    // 推荐内容的操作
    recommendOperate (value) {
      this.showPopup = true
      this.isPopupFollow = false
      this.operateDynamic = value
      console.log('recommend', value)
    },

    // 我的关注的操作
    followOperate (value) {
      this.showPopup = true
      this.isPopupFollow = true
      this.operateDynamic = value
      console.log('follow', value)
    },

    // 复制文本
    copyCallback () {
      this.showPopup = false
      this.$toast('复制成功')
      this.operateDynamic.content = ''
    },

    // 举报操作
    reportHandle () {
      this.showPopup = false
      this.$toast('举报成功')
    },

    // 屏蔽操作
    shieldHandle () {
      this.$toast('屏蔽成功')
      this.showPopup = false
    },

    // 不感兴趣
    noInterestingHandle () {
      this.$toast('此动态将不再出现')
      this.showPopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-home-page {
  position: fixed;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
  /deep/ .van-sticky {
    background-color: #fff;
  }

  /deep/ .van-skeleton__row, .van-skeleton__title {
    background-color: #f2f3f5;
    height: 20px;
  }

  /deep/ .van-tabs__wrap {
    padding-right: 120px;
  }

  /deep/ .van-tab {
    font-size: 16px;
  }

  /deep/ .van-empty {
    padding-top: 120px;
    .van-empty__image {
      width: 240px;
      height: 240px;
    }
    img {
      width: 240px;
    }
  }
}

.add-word {
  position: fixed;
  bottom: 100px;
  right: 30px;
  font-size: 32px;
  color: #fff;
  background-color: #409fea;
  border-radius: 50%;
  padding: 10px;
}

.xianyu-home-page {
  /deep/ .van-popup {
    height: 224px;
    width: 280px;
    margin-top: 128px;
    border-radius: 10px;
  }

  /deep/ .van-popup.unlogin {
    height: 56px;
    margin-top: 200px;
  }

  // 已登录的判断是否是自己
  /deep/ .van-popup.login-self {
    height: 112px;
    margin-top: 180px;
  }

  /deep/ .van-popup.follow {
    height: 112px;
    margin-top: 180px;
  }

  /deep/ .van-popup--center {
    bottom: 0!important;
  }

  /deep/ .van-hairline--bottom {
    margin: 0 15px;
  }
}

.dynamic-operate {
  &-item {
    height: 56px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, .75);
    align-items: center;
  }

  &-item.delete-operate {
    color: #e92322;
  }

  &-item.copy-operate {
    color: #409fea;
  }
}
</style>
