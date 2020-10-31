<template>
  <div class="refresh-icon" @click="refresh">
    <i :class="{ 'active': isRefresh, 'iconfont': true, 'icon-refresh': true }"></i>
  </div>
</template>

<script>
export default {
  name: 'refresh-icon',
  data () {
    // 是否刷新状态
    return {
      isRefresh: false,
      timerId: null
    }
  },
  methods: {
    // 刷新做节流的操作，避免频繁的操作影响服务器的性能问题
    refresh () {
      this.isRefresh = true
      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = null
      }
      this.timerId = setTimeout(() => {
        this.isRefresh = false
      }, 1800)
    }
  }
}
</script>

<style scoped lang="scss">
.refresh-icon {
  position: fixed;
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 50%;
  bottom: 100px;
  right: 12px;
  box-shadow: 0 0 20px 1px #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  .iconfont {
    font-size: 24px;
    color: #409fea;
  }

  .iconfont.active {
      animation: turn 1s linear infinite;
   }

  @keyframes turn {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
}
</style>
