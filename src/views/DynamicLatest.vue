<template>
  <div class="xianyu-dynamic-latest-r">
    <van-pull-refresh
      v-model="pullDown"
      v-if="latestDynamics.length > 0"
      @refresh="onLatestRefresh"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
      <div class="homepage-newest">
        <homepage-item
          @itemlike="itemLikeHandle"
          @itemunlike="itemUnlikeHandle"
          v-for="(item, index) in latestDynamics"
          :key="item._id"
          :is-first="index === 0"
          :item-value="item"></homepage-item>
      </div>
    </van-pull-refresh>
    <van-empty v-if="!showNoLatest" description="什么内容都没有" />
  </div>
</template>

<script>
export default {
  name: 'DynamicLatest',
  data () {
    return {
      latestDynamics: []
    }
  },
  computed: {
    showNoLatest () {
      return this.latestDynamics.length <= 0
    }
  },
  methods: {
    itemLikeHandle () {},
    itemUnlikeHandle () {}
  }
}
</script>

<style>
</style>
