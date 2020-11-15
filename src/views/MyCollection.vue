<template>
  <div class="xianyu-collection">
    <back-top title="我的收藏"></back-top>
    <van-tabs v-model="active" animated swipeable>
      <van-tab title="好文">
        <div style="height: 300px;background-color: pink;">内容</div>
      </van-tab>
      <van-tab title="新闻">
        <div style="height: 300px;background-color: pink;">内容</div>
      </van-tab>
      <van-tab title="诗词">
        <div style="height: 300px;background-color: pink;">内容</div>
      </van-tab>
      <van-tab title="词典">
        <div style="height: 300px;background-color: pink;">内容</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'MyCollection',
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style scoped lang="scss">
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }
}
</style>
