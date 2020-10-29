<template>
  <div class="channel-item" :style="{'background-color': BgColor }" v-if="!router">
    <!-- 约定header部分传递h1标题内容，content部分传递p标签内容 select部分放置选择按钮 -->
    <slot name="header"></slot>
    <slot name="content"></slot>
    <div class="channel-item-slot">
      <slot name="select"></slot>
    </div>
  </div>
  <router-link to="/" tag="div" :style="{'background-color': BgColor }" class="channel-item" v-else>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <div class="channel-item-slot">
      <slot name="select"></slot>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'AddChannel',
  props: {
    BgColor: {
      type: String
    },
    // 开启路由模式
    router: {
      type: Boolean,
      default: true
    },
    // 路由跳转地址
    to: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.channel-item {
  width: 47.6%;
  height: 80px;
  border-radius: 3px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #020202;
  position: relative;
}
</style>
