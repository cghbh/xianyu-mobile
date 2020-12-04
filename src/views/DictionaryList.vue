<template>
  <div class="xianyu-dictionary-detail">
    <back-top title="成语列表"></back-top>
    <div class="xianyu-dictionary-detail-container">
      <dictionary-item v-for="item in 20" :dictionary="item + '成语词典'" :key="item" :no-margin-bottom="item === 20"></dictionary-item>
    </div>
  </div>
</template>

<script>
import DictionaryItem from '@/components/DictionaryItem/index.vue'
export default {
  name: 'DictionaryList',
  components: {
    DictionaryItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-dictionary-detail-container {
  position: fixed;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(38, 38, 38, .05);
  overflow-y: auto;
}
</style>
