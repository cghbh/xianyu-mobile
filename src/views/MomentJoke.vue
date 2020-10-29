<template>
  <div class="moment-joke">
    <van-sticky>
      <van-nav-bar title="开心一刻" sticky left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div style="height: 2000px;background-color: pink;">123</div>
  </div>
</template>

<script>
</script>

<style>
</style>
