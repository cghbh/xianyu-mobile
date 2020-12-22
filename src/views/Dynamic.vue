<template>
  <div class="xianyu-home-page">
    <van-tabs v-model="active" sticky animated swipeable title-active-color="#409fea" color="#409fea">
      <van-tab id="van-tabs-scroll" title="推荐">
        <recomend-dynamics></recomend-dynamics>
      </van-tab>
      <van-tab title="最新">
        <latest-dynamics></latest-dynamics>
      </van-tab>
      <van-tab title="关注">
        <follow-dynamics></follow-dynamics>
      </van-tab>
    </van-tabs>
    <i @click="$router.push('/dynamic-publish')" class="iconfont add-word icon-tianxie"></i>
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
      emptyImg: require('../assets/images/empty-image-default.png')
    }
  },

  components: {
    RecomendDynamics,
    FollowDynamics,
    LatestDynamics
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
</style>
