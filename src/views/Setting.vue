<template>
  <div class="xianyu-settings">
    <back-top title="设置"></back-top>
    <div class="xianyu-setting-container">
      <van-cell-group>
        <van-cell class="xianyu-settings-cell" is-link title="账号注销" />
      </van-cell-group>

      <van-cell-group class="xianyu-settings-logout">
        <van-cell @click="logout" title="退出登录" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  methods: {
    logout () {
      this.$dialog.confirm({
        width: '315px',
        confirmButtonColor: '#e92322',
        cancelButtonColor: '#555',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        allowHtml: true,
        message: '<h1 style="color: #555; line-height: 24px;font-size:16px">确定要退出登录吗？</h1>'
      })
        .then(() => {
          this.$store.commit('setUserLoginState', { token: null, userId: null })
          this.$store.commit('removeCachedPages', 'Dynamic')
          this.$store.commit('removeCachedPages', 'Mine')
          this.$store.commit('updateLoginUserZanDynamicsId', [])
          this.$toast('退出成功')
          this.$router.push('/mine')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-setting-container {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(38, 38, 38, .08);
}

.xianyu-settings-cell {
  line-height: 36px;
  display: flex;
  align-items: center;

  /deep/ .van-cell__title {
    font-size: 16px;
  }
}

.xianyu-settings-logout {
  margin-top: 40px;

  /deep/ .van-cell {
    color: #e92322;
    font-size: 16px;
    font-weight: bold;
  }

  /deep/ .van-cell__title {
    display: flex;
    justify-content: center;
  }
}
</style>
