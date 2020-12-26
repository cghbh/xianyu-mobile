<template>
  <div class="skeleton-wrapper">
    <skeleton
      theme="opacity"
      bg-color="#dcdbdc"
      v-for="item in 3"
      :key="item + Math.random()"
    >
      <skeleton class="skeleton-user-avatar" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton width="48px" height="48px" shape="circle"></tb-skeleton>
        <skeleton
          class="skeleton-user-avatar-title"
          theme="opacity"
          bg-color="#dcdbdc"
        >
          <tb-skeleton width="85%" height="16px" shape="rect"></tb-skeleton>
          <tb-skeleton
            class="skeleton-user-avatar-title-time"
            width="100%"
            height="12px"
            shape="rect"
          ></tb-skeleton>
        </skeleton>
      </skeleton>
      <skeleton class="skeleton-content" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton width="100%" height="80px" shape="rect"></tb-skeleton>
      </skeleton>
      <skeleton class="skeleton-operate" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton
          class="skeleton-operate-item"
          height="14px"
          shape="rect"
        ></tb-skeleton>
        <tb-skeleton
          class="skeleton-operate-item"
          height="14px"
          shape="rect"
        ></tb-skeleton>
        <tb-skeleton
          class="skeleton-operate-item"
          height="14px"
          shape="rect"
        ></tb-skeleton>
      </skeleton>
    </skeleton>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
// 下面是骨架屏的配置
.skeleton-user-avatar {
  display: flex;
  padding: 10px 25px 10px 12px;

  &-title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 8px;
    padding: 5px 0;
    box-sizing: border-box;
    flex: 1;
  }

  &-time {
    margin-top: 10px;
  }
}

.skeleton-content {
  padding: 10px 18px 10px 18px;
}

.skeleton-operate {
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;

  &-item {
    width: 30%!important;
  }
}
</style>
