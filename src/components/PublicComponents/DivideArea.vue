<template>
  <div class="divide-area" :style="{ 'height': `${height}px`}"></div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style scoped lang="scss">
.divide-area {
  width: 100%;
  background-color: rgba(38, 38, 38, .05);
}
</style>
