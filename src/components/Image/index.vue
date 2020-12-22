<template>
  <div class="xianyu-image-component">
      <img 
        class="xianyu-image-component-img" 
        :class="{'round': round }"
        :style="{ width: `${width}px`, height: `${height}px`}" 
        :src="img"
        @click="$emit('click')"
      />
  </div>
</template>

<script>
export default {
  name: 'XianyuImage',
  props: {
    img: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    round: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-image-component {
  margin: 0 6px 6px 0;
  &-img {
    object-fit: cover;
  }

  &-img.round {
    border-radius: 50%;
  }
}
</style>
