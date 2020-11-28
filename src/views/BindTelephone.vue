<template>
  <div class="xianyu-bind-telephone">
    <van-sticky>
      <van-nav-bar title="手机号绑定" sticky left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script>
export default {
  name: 'BindTelephone'
}
</script>

<style scoped lang="scss">
</style>
