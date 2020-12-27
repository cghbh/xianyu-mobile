<template>
  <skeleton class="skeleton-recomend" theme="opacity" bg-color="#dcdbdc">
    <skeleton class="skeleton-recomend-left" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton
        class="skeleton-recomend-left-title"
        width="100%"
        height="20px"
        shape="rect"
      ></tb-skeleton>
      <tb-skeleton
        class="skeleton-recomend-left-author"
        width="40%"
        height="13px"
        shape="rect"
      ></tb-skeleton>
      <tb-skeleton
        class="skeleton-recomend-left-content"
        width="100%"
        height="72px"
        shape="rect"
      ></tb-skeleton>
    </skeleton>
    <skeleton
      class="skeleton-recomend-right"
      theme="opacity"
      bg-color="#dcdbdc"
    >
      <tb-skeleton
        class="skeleton-recomend-right-pic"
        width="100px"
        height="100px"
        shape="rect"
      ></tb-skeleton>
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.skeleton-recomend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  &-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 12px;

    &-title {
      margin-bottom: 10px;
    }

    &-author {
      margin-bottom: 10px;
    }
  }

  &-right-pic {
    border-radius: 2px;
  }
}
</style>
