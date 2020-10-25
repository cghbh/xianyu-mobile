<template>
  <div class="xianyu-setting">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <div class="back-container">
          <i class="iconfont icon-left"></i>
        </div>
      </template>
    </van-nav-bar>
    <div>
      <div>修改资料</div>
      <div>隐私政策</div>
      <div>关于咸鱼</div>
      <div>用户协议</div>
      <div>退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting'
}
</script>

<style scoped lang="scss">
</style>
