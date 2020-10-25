<template>
  <div class="gold-sentence">
    <van-nav-bar title="金句" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <div class="back-container">
          <i class="iconfont icon-left"></i>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'GoldSentence'
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
