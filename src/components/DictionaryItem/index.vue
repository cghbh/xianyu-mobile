<template>
  <div class="xianyu-dictionary-item" :class="{ 'no-mragin-bottom-dic': noMarginBottom }">{{ dictionary }}</div>
</template>

<script>
export default {
  name: 'DictionaryItem',
  props: {
    dictionary: {
      type: String,
      required: false
    },
    noMarginBottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-dictionary-item {
  height: 64px;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 64px;
  padding-left: 20px;
  color: #555;
}

.xianyu-dictionary-item.no-mragin-bottom-dic {
  margin-bottom: 0!important;
}
</style>
