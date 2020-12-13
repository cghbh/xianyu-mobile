<template>
  <div class="xianyu-dynamic-my-follow">
    <van-pull-refresh
      v-model="pullDown"
      @refresh="pullDownRefresh"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
      <!-- 正常的内容显示 -->
      <homepage-item
        @itemlike="itemLikeHandle"
        @itemunlike="itemUnlikeHandle"
        v-for="(item, index) in followDynamics"
        :key="item._id"
        :isFirst="index === 0"
        :itemValue="item"
        :loading="isLoading"
        :is-like="false"/>
    </van-pull-refresh>

     <!-- 未登录 -->
    <div class="dynamic-follow-unlogin" v-if="!isLogin">
       <p class="dynamic-follow-unlogin-tips">需要登录，或登录已过期需要重新登录</p>
       <a class="dynamic-follow-unlogin-link"
         @click="$router.replace({ path: '/login', query: { redirect: '/dynamic' } })"
       >
        去登录
      </a>
    </div>

    <!-- 我的关注空状态 -->
    <van-empty
      v-if="showNoFollow && isLogin"
      description="什么内容都没有"
      :image="emptyImg"
    />
  </div>
</template>

<script>
export default {
  name: 'DynamicFollow',
  data () {
    return {
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 下拉刷新状态
      pullDown: false,
      followDynamis: []
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.token.token()
    },
    showNoFollow () {
      return this.followDynamis.length <= 0
    }
  },
  methods: {
    pullDownRefresh () {},
    itemLikeHandle () {},
    itemUnlikeHandle () {}
  }
}
</script>

<style>
</style>
