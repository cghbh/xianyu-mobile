<template>
  <skeleton class="skeleton-word" theme="opacity" bg-color="#dcdbdc">

    <skeleton class="skeleton-word-detail" theme="opacity" bg-color="#dcdbdc">
      <skeleton 
        v-for="item in 4"
        class="skeleton-word-detail-word" 
        theme="opacity" 
        bg-color="#dcdbdc"
        :key="item + Math.random()">
        <tb-skeleton
          class="skeleton-word-detail-word-pinyin"
          width="42px"
          height="14px"
          shape="rect"
        />
        <tb-skeleton
          class="skeleton-word-detail-word-hanzi"
          width="42px"
          height="42px"
          shape="rect"
        />
      </skeleton>
    </skeleton>

    <skeleton class="skeleton-word-detail-meaning" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton
        class="skeleton-word-detail-meaning-top"
        width="100%"
        height="14px"
        shape="rect"
      />
      <tb-skeleton
        width="80%"
        height="14px"
        shape="rect"
      />
    </skeleton>

    <skeleton v-for="item in 2" :key="item + Math.random()" class="skeleton-word-detail-birth" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton
        class="skeleton-word-detail-meaning-top"
        width="100%"
        height="14px"
        shape="rect"
      />
      <tb-skeleton
        width="60%"
        height="14px"
        shape="rect"
      />
    </skeleton>

    <skeleton class="skeleton-word-detail-story" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton
        class="skeleton-word-detail-meaning-top"
        width="100%"
        height="210px"
        shape="rect"
      />
    </skeleton>

    <skeleton class="skeleton-word-detail-operate" theme="opacity" bg-color="#dcdbdc">
      <tb-skeleton
        v-for="item in 2"
        class="skeleton-word-detail-operate-top"
        width="70px"
        height="35px"
        shape="rect"
        :key="item + Math.random()"
      />
    </skeleton>
  </skeleton>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.skeleton-word {
  &-detail {
    display: flex;
    padding: 80px 16px 0 16px;
    &-word {
      margin-right: 21px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-hanzi {
        margin-top: 10px;
      }
    }

    &-meaning {
      padding: 0 16px;
      margin-top: 40px;

      &-top {
        margin-bottom: 10px;
      }
    }

    &-birth {
      padding: 0 16px;
      margin-top: 18px;

      &-top {
        margin-bottom: 10px;
      }
    }

    &-story {
      padding: 0 16px;
      margin-top: 25px;
    }

    &-operate {
      padding: 0 80px;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;

      &-top {
        border-radius: 35px;
      }
    }
  }
}
</style>
