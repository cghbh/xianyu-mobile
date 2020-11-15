<template>
  <div class="xianyu-home-page">
    <van-tabs v-model="active" sticky animated swipeable title-active-color="#409fea" color="#409fea">
      <van-tab title="推荐">
        <div class="homepage-recommend">
          <homepage-item v-for="(item, index) in recommendDynamics" :key="item._id" :isFirst="index === 0" :itemValue="item"></homepage-item>
        </div>
      </van-tab>
      <!-- <van-tab title="关注">
        <div class="homepage-fellow">
          <homepage-item v-for="(item, index) in 2" :key="index" :isFirst="index === 0"></homepage-item>
        </div>
      </van-tab>
      <van-tab title="最新">
        <div class="homepage-newest">
          <homepage-item v-for="(item, index) in 5" :key="index" :isFirst="item === 0"></homepage-item>
        </div>
      </van-tab> -->
    </van-tabs>
    <i @click="$router.push('/dynamic-publish')" class="iconfont add-word icon-tianxie"></i>
  </div>
</template>

<script>
import HomepageItem from '../components/Homepage/HomepageItem.vue'
import { recommendDynamic } from '@/api/dynamic.js'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      recommendDynamics: []
    }
  },
  mounted () {
    this.getRecommendDyamic()
  },
  methods: {
    async getRecommendDyamic () {
      const result = await recommendDynamic()
      if (result.code === 200) {
        this.recommendDynamics = result.data
      } else {
        this.$toast({ message: '数据获取失败 ', duration: 800 })
      }
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
  bottom: 100px;
  right: 30px;
  font-size: 32px;
  color: #fff;
  background-color: #409fea;
  border-radius: 50%;
  padding: 10px;
}
</style>
