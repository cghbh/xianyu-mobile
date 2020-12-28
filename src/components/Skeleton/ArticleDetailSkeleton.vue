<template>
  <skeleton class="skeleton-article-detail" theme="opacity" bg-color="#dcdbdc">
    <tb-skeleton class="skeleton-article-detail-title" width="35%" height="20px" shape="rect"></tb-skeleton>
    <tb-skeleton class="skeleton-article-detail-author" width="60%" height="14px" shape="rect"></tb-skeleton>
    <skeleton class="skeleton-article-detail-avatar" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-article-detail-avatar-detail" width="100%" height="150px" shape="rect"></tb-skeleton>
    </skeleton>
    <skeleton class="skeleton-article-detail-content" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-article-detail-content-detail" width="100%" height="54px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-article-detail-content-detail" width="100%" height="105px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-article-detail-content-detail" width="100%" height="25px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-article-detail-content-detail" width="100%" height="80px" shape="rect"></tb-skeleton>
    </skeleton>
    <skeleton class="skeleton-article-detail-operate" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-article-detail-operate-zan" width="100px" height="35px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-article-detail-operate-collect" width="100px" height="35px" shape="rect"></tb-skeleton>
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.skeleton-article-detail {
  padding: 25px 10px 0 10px;

  &-title {
    margin-bottom: 20px;
  }

  &-author {
    margin-bottom: 16px;
  }

  &-avatar {
    margin-bottom: 24px;
  }

  &-content {
    &-detail {
      margin-bottom: 15px;
    }
  }

  &-operate {
    display: flex;
    margin-top: 28px;
    justify-content: center;

    &-zan,
    &-collect {
      border-radius: 35px;
    }

    &-zan {
      margin-right: 40px;
    }
  }
}
</style>
