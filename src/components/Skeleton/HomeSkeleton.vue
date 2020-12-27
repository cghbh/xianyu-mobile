<template>
  <div class="home-skeleton">
    <skeleton class="skeleton-all-container" theme="opacity" bg-color="#dcdbdc">
      <skeleton theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton class="skeleton-search-input" width="100%" height="32px" shape="rect"></tb-skeleton>
      </skeleton>

      <skeleton theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton class="skeleton-user-tips" width="100%" height="150px" shape="rect"></tb-skeleton>
      </skeleton>

      <skeleton class="skeleton-classify" theme="opacity" bg-color="#dcdbdc">
        <skeleton class="skeleton-classify-item" theme="opacity" bg-color="#dcdbdc" v-for="item in 5" :key="item + Math.random()">
          <tb-skeleton class="skeleton-classify-item-top" width="45px" height="45px" shape="circle"></tb-skeleton>
          <tb-skeleton class="skeleton-classify-item-bottom" width="40px" height="12px" shape="rect"></tb-skeleton>
        </skeleton>
      </skeleton>

      <skeleton class="skeleton-switch" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton class="skeleton-switch-one" width="80px" height="20px" shape="rect"></tb-skeleton>
        <tb-skeleton class="skeleton-switch-two" width="80px" height="17px" shape="rect"></tb-skeleton>
      </skeleton>

      <skeleton class="skeleton-recomend" theme="opacity" bg-color="#dcdbdc" v-for="item in 2" :key="item + Math.random()">
        <skeleton class="skeleton-recomend-left" theme="opacity" bg-color="#dcdbdc">
          <tb-skeleton class="skeleton-recomend-left-title" width="100%" height="20px" shape="rect"></tb-skeleton>
          <tb-skeleton class="skeleton-recomend-left-author" width="40%" height="13px" shape="rect"></tb-skeleton>
          <tb-skeleton class="skeleton-recomend-left-content" width="100%" height="72px" shape="rect"></tb-skeleton>
        </skeleton>
        <skeleton class="skeleton-recomend-right" theme="opacity" bg-color="#dcdbdc">
          <tb-skeleton class="skeleton-recomend-right-pic" width="100px" height="100px" shape="rect"></tb-skeleton>
        </skeleton>
      </skeleton>
    </skeleton>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.home-skeleton {
  .skeleton-all-container {
    padding: 20px 12px 0 12px;
  }

  .skeleton-search-input {
    border-radius: 4px;
  }

  .skeleton-user-tips {
    border-radius: 8px;
    margin-top: 16px;
  }

  .skeleton-classify {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-bottom {
        margin-top: 12px;
      }
    }
  }

  .skeleton-switch {
    display: flex;
    margin-top: 30px;
    &-one {
      margin-right: 15px;
    }
  }

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
}
</style>
