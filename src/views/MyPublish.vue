<template>
  <div class="xianyu-publish">
    <van-nav-bar title="我的发表" left-text="返回" left-arrow @click-left="$router.go(-1)">
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
  name: 'MyPublish'
}
</script>

<style scoped lang="scss">
</style>
