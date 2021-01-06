<template>
  <skeleton class="skeleton-word-list" theme="opacity" bg-color="#dcdbdc">
    <tb-skeleton
      v-for="item in 20"
      class="skeleton-word-list-item"
      width="100%"
      height="35px"
      shape="rect"
      :key="item + Math.random()"
    />
  </skeleton>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.skeleton-word-list {
  padding: 10px 12px 10px 12px;
  &-item {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
