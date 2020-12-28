<template>
  <skeleton class="skeleton-user-item" theme="opacity" bg-color="#dcdbdc">
    <skeleton class="skeleton-user-item-avatar" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton width="48px" height="48px" shape="circle"></tb-skeleton>
    </skeleton>
    <skeleton class="skeleton-user-item-about" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton width="50%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton width="100%" height="13px" shape="rect"></tb-skeleton>
    </skeleton>
    <skeleton class="skeleton-user-item-operate" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-user-item-operate-follow" width="70px" height="28px" shape="rect"></tb-skeleton>
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.skeleton-user-item {
  display: flex;
  align-items: center;
  padding: 18px 12px;

  &-avatar {
    margin-right: 10px;
  }

  &-about {
    flex: 1;
    margin-right: 15px;
    display: flex;
    height: 50px;
    padding: 3px 0;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
  }

  &-operate-follow {
    border-radius: 5px;
  }
}
</style>
