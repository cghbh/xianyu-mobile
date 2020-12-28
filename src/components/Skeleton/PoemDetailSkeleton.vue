<template>
  <skeleton class="skeleton-poem-detail" theme="opacity" bg-color="#dcdbdc">
    <skeleton class="skeleton-poem-detail-content" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-poem-detail-content-title" width="64%" height="24px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-author" width="30%" height="14px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-p" width="100%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-p" width="100%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-p" width="100%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-p" width="100%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-p" width="100%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-detail-content-p" width="100%" height="17px" shape="rect"></tb-skeleton>
    </skeleton>
    <skeleton class="skeleton-poem-divide" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-poem-divide-line" width="33%" height="1px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-divide-title" width="24%" height="15px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-divide-line" width="33%" height="1px" shape="rect"></tb-skeleton>
    </skeleton>
    <skeleton class="skeleton-poem-meaning" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton class="skeleton-poem-meaning-p" width="72%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-meaning-p" width="50%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-meaning-p" width="66%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-meaning-p" width="61%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-meaning-p" width="88%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-meaning-p" width="98%" height="17px" shape="rect"></tb-skeleton>
      <tb-skeleton class="skeleton-poem-meaning-p" width="48%" height="17px" shape="rect"></tb-skeleton>
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.skeleton-poem-detail {
  padding: 21px 15px 0 15px;
  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-title {
      margin-bottom: 15px;
    }

    &-author {
      margin-bottom: 20px;
    }

    &-p {
      margin-bottom: 20px;
    }
  }
}

.skeleton-poem-divide {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.skeleton-poem-meaning {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  &-p {
    margin-bottom: 20px;
  }
}
</style>
