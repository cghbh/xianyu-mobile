<template>
  <div class="xianyu-search-empty-state">
    <van-empty
      class="custom-image"
      :image="image"
      :image-size="88"
      description="什么都没有哟"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchEmpty',
  data () {
    return {
      image: require('@/assets/images/custom-empty-image.png')
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-search-empty-state {
  /deep/ .van-empty {
    padding-top: 150px;
  }

  /deep/ .van-empty__description {
    margin-top: 35px;
    font-size: 16px;
  }
}
</style>
