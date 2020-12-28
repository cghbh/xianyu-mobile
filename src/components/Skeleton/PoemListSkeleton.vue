<template>
  <skeleton class="poem-list-skeleton" theme="opacity" bg-color="#dcdbdc">
    <skeleton class="poem-list-skeleton-item" theme="opacity" bg-color="#dcdbdc" v-for="item in 8" :key="item + Math.random()">
      <skeleton class="poem-list-skeleton-item-title" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton width="64%" height="16px" shape="rect"></tb-skeleton>
        <tb-skeleton width="24%" height="13px" shape="rect"></tb-skeleton>
      </skeleton>
      <skeleton class="poem-list-skeleton-item-author" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton width="100px" height="13px" shape="rect"></tb-skeleton>
      </skeleton>
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.poem-list-skeleton {
  &-item {
    padding: 24px 15px 15px 15px;

    &-title {
      display: flex;
      justify-content: space-between;
    }

    &-author {
      margin-top: 16px;
    }
  }
}
</style>
