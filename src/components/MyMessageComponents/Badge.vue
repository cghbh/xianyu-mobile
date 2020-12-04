<template>
  <div class="xianyu-message-badge">
    <div @click="$emit('click')" class="xianyu-message-badge-icon" :style="{ 'color': iconcolor }">
      <span v-if="count > 0" class="xianyu-message-badge-number">{{ count > 99 ? '99+' : count }}</span>
      <i :class="['iconfont', 'right-i-tag', icon]"></i>
    </div>
    <div class="xianyu-message-badge-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'MessageBadge',
  props: {
    title: {
      type: String
    },
    count: {
      type: Number,
      default: 0
    },
    iconcolor: {
      type: String
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-message-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-icon {
    width: 54px;
    height: 54px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 4px #eaeaea;
    border-radius: 15px;
    position: relative;

    .iconfont {
      font-size: 28px;
    }
  }

  &-title {
    margin-top: 16px;
    font-size: 16px;
    color: #666;
    font-weight: 600;
  }
}

.xianyu-message-badge-number {
  position: absolute;
  top: -5px;
  right: -5px;
  color: #fff;
  background-color: #ee0124;
  height: 18px;
  line-height: 18px;
  padding: 0px 5px;
  border-radius: 18px;
  font-size: 10px;
  min-width: 9px;
  text-align: center;
}
</style>
