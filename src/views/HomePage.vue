<template>
  <div class="xianyu-home-page">
    <van-tabs v-model="active" sticky animated swipeable title-active-color="#409fea" color="#409fea">
      <van-tab title="推荐">
        <div class="homepage-recommend">
          <homepage-item v-for="item in 20" :key="item" :isFirst="item === 1"></homepage-item>
        </div>
      </van-tab>
      <van-tab title="关注">
        <div class="homepage-fellow">
          <homepage-item v-for="item in 1" :key="item" :isFirst="item === 1"></homepage-item>
        </div>
      </van-tab>
      <van-tab title="最新">
        <div class="homepage-newest">
          <homepage-item v-for="item in 10" :key="item" :isFirst="item === 1"></homepage-item>
        </div>
      </van-tab>
    </van-tabs>
    <i @click="$router.push('/dynamic-publish')" class="iconfont add-word icon-tianxie"></i>
  </div>
</template>

<script>
import HomepageItem from '../components/Homepage/HomepageItem.vue'
export default {
  name: 'Home',
  data () {
    return {
      active: 0
    }
  },
  components: {
    HomepageItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-home-page {
  height: auto;
  margin-bottom: 52px;
  /deep/ .van-sticky {
    background-color: #fff;
  }
  
  /deep/ .van-tabs__wrap {
    padding-right: 120px;
  }
  
  /deep/ .van-tab {
    font-size: 16px;
  }
}

.add-word {
  position: fixed;
  bottom: 80px;
  right: 30px;
  font-size: 32px;
  color: #fff;
  background-color: #409fea;
  border-radius: 50%;
  padding: 10px;
}
</style>
