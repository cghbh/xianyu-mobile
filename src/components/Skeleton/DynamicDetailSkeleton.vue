<template>
  <skeleton class="skeleton-dynamic-detail" theme="opacity" bg-color="#dcdbdc">
    <skeleton class="skeleton-dynamic-detail-user" theme="opacity" bg-color="#dcdbdc">
      <skeleton class="skeleton-dynamic-detail-user-about" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton class="skeleton-dynamic-detail-user-about-avatar" width="48px" height="48px" shape="circle"></tb-skeleton>
        <skeleton class="skeleton-dynamic-detail-user-about-content" theme="opacity" bg-color="#dcdbdc">
          <tb-skeleton width="100px" height="16px" shape="rect"></tb-skeleton>
          <tb-skeleton width="150px" height="12px" shape="rect"></tb-skeleton>
        </skeleton>
      </skeleton>
      <skeleton class="skeleton-dynamic-detail-user-follow" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton class="skeleton-dynamic-detail-user-follow-tab" width="80px" height="30px" shape="rect"></tb-skeleton>
      </skeleton>
    </skeleton>

    <skeleton class="skeleton-dynamic-detail-cont" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton 
        class="skeleton-dynamic-detail-cont-item" 
        width="100%" 
        height="15px" 
        shape="rect"
        v-for="item in 5"
        :key="item + Math.random()"
      >
      </tb-skeleton>

      <skeleton class="skeleton-dynamic-detail-pics" theme="opacity" bg-color="#dcdbdc">
        <tb-skeleton 
          class="skeleton-dynamic-detail-pic-item" 
          width="100px" 
          height="100px" 
          shape="rect"
          v-for="item in 3"
          :key="item + Math.random()"
        >
        </tb-skeleton>
      </skeleton>

      <skeleton class="skeleton-dynamic-detail-commenttitle" theme="opacity" bg-color="#dcdbdc">
        <skeleton class="skeleton-dynamic-detail-commenttitle-left" theme="opacity" bg-color="#dcdbdc">
          <tb-skeleton width="80px" height="16px" shape="rect"></tb-skeleton>
        </skeleton>
        <skeleton class="skeleton-dynamic-detail-commenttitle-right" theme="opacity" bg-color="#dcdbdc">
          <tb-skeleton width="50px" height="16px" shape="rect"></tb-skeleton>
          <tb-skeleton width="50px" height="16px" shape="rect"></tb-skeleton>
        </skeleton>
      </skeleton>

      <skeleton class="skeleton-dynamic-detail-comment" theme="opacity" bg-color="#dcdbdc">
        <skeleton class="skeleton-dynamic-detail-comment-avatar" theme="opacity" bg-color="#dcdbdc">
          <tb-skeleton width="48px" height="48px" shape="circle"></tb-skeleton>
        </skeleton>

        <skeleton class="skeleton-dynamic-detail-comment-about" theme="opacity" bg-color="#dcdbdc">
          <skeleton class="skeleton-dynamic-detail-comment-about-user" theme="opacity" bg-color="#dcdbdc">
            <tb-skeleton width="116px" height="16px" shape="rect"></tb-skeleton>
            <tb-skeleton width="64px" height="14px" shape="rect"></tb-skeleton>
          </skeleton>

          <tb-skeleton class="skeleton-dynamic-detail-comment-p" width="100%" height="15px" shape="rect"></tb-skeleton>
          <tb-skeleton class="skeleton-dynamic-detail-comment-p" width="100%" height="15px" shape="rect"></tb-skeleton>
          <tb-skeleton class="skeleton-dynamic-detail-comment-p" width="100%" height="15px" shape="rect"></tb-skeleton>

          <skeleton class="skeleton-dynamic-detail-comment-reply" theme="opacity" bg-color="#dcdbdc">
            <tb-skeleton width="24%" height="14px" shape="rect"></tb-skeleton>
            <tb-skeleton width="70%" height="13px" shape="rect"></tb-skeleton>
          </skeleton>
          <skeleton class="skeleton-dynamic-detail-comment-reply" theme="opacity" bg-color="#dcdbdc">
            <tb-skeleton width="25%" height="14px" shape="rect"></tb-skeleton>
            <tb-skeleton width="70%" height="13px" shape="rect"></tb-skeleton>
          </skeleton>
          <skeleton class="skeleton-dynamic-detail-comment-reply" theme="opacity" bg-color="#dcdbdc">
            <tb-skeleton width="23%" height="14px" shape="rect"></tb-skeleton>
            <tb-skeleton width="70%" height="13px" shape="rect"></tb-skeleton>
          </skeleton>
          <skeleton class="skeleton-dynamic-detail-comment-reply" theme="opacity" bg-color="#dcdbdc">
            <tb-skeleton width="22%" height="14px" shape="rect"></tb-skeleton>
            <tb-skeleton width="70%" height="13px" shape="rect"></tb-skeleton>
          </skeleton>
          <skeleton class="skeleton-dynamic-detail-comment-reply" theme="opacity" bg-color="#dcdbdc">
            <tb-skeleton width="100%" height="13px" shape="rect"></tb-skeleton>
          </skeleton>
        </skeleton>
      </skeleton>
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.skeleton-dynamic-detail {
  padding: 15px 12px 0 15px;
  &-user {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-about {
      display: flex;
      flex: 1;
      align-items: center;

      &-avatar {
        margin-right: 10px;
      }

      &-content {
        height: 48px;
        padding: 4px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    &-follow {
      width: 80px;
      margin-right: 12px;

      &-tab {
        border-radius: 4px;
      }
    }
  }
}

.skeleton-dynamic-detail-cont {
  margin-top: 20px;

  &-item {
    margin-top: 16px;
  }
}

.skeleton-dynamic-detail-pics {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.skeleton-dynamic-detail-commenttitle {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  &-left {
    margin-left: 10px;
  }

  &-right {
    display: flex;
    width: 120px;
    justify-content: space-between;
  }
}

.skeleton-dynamic-detail-comment {
  padding: 0 8px;
}

.skeleton-dynamic-detail-comment {
  display: flex;
  margin-top: 10px;

  &-avatar {
    width: 48px;
    height: 48px;
    margin-right: 14px;
  }

  &-about {
    flex: 1;
    align-items: flex-start;
    display: flex;
    flex-direction: column;

    &-user {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 8px;
    }
  }
}

.skeleton-dynamic-detail-comment-p {
  margin-top: 15px;
}

.skeleton-dynamic-detail-comment-reply {
  padding-left: 12px;
  margin-top: 14px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
</style>
