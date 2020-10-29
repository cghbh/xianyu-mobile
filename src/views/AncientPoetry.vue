<template>
  <div class="ancient-poetry">
    <van-sticky>
      <van-nav-bar title="诗词" sticky left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div style="height: 2000px;background-color: skyblue;">123</div>
  </div>
</template>

<script>
export default {
  name: 'AncientPoetry'
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
