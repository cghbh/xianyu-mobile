<template>
  <div class="xianyu-message">
    <van-nav-bar title="我的消息" left-text="返回" left-arrow @click-left="$router.go(-1)">
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
  name: 'MyMessage'
}
</script>

<style scoped lang="scss">
</style>
