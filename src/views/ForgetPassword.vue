<template>
  <div class="forget-password">
    <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="$router.go(-1)">
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
  name: 'ForgetPassword'
}
</script>

<style scoped lang="scss">
</style>
