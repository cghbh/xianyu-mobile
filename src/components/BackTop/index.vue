<template>
  <van-sticky>
    <van-nav-bar :title="title" sticky :left-arrow="back" @click-left="to ? $router.push(`${to}`): $router.go(-1)">
      <template #left v-if="back">
        <div class="back-container">
          <i :class="[ 'iconfont iconfont-back-top-xianyu', iconType === 1 ? 'icon-left': 'icon-guanbi']"></i>
        </div>
      </template>
    </van-nav-bar>
  </van-sticky>
</template>

<script>
// 顶部返回栏
export default {
  name: 'BackTop',
  props: {
    title: {
      type: String,
      required: true
    },
    // 是否需要返回按钮图标
    back: {
      type: Boolean,
      default: true
    },
    // 返回的图标，有<和X两种,1-<,2-X
    iconType: {
      type: Number,
      default: 1
    },
    to: {
      type: String
    }
  },
  mounted () {
    console.log(this.to)
  }
}
</script>

<style scoped lang="scss">
.van-nav-bar {
  background-color: #409fea!important;
  color: #fff;

  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
.iconfont-back-top-xianyu {
  font-size: 20px;
}
</style>
