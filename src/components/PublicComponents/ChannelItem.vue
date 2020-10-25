<template>
  <div class="channel-item" :style="{'background-color': BgColor }">
    <!-- 约定header部分传递h1标题内容，content部分传递p标签内容 select部分放置选择按钮 -->
    <slot name="header"></slot>
    <slot name="content"></slot>
    <div class="channel-item-slot">
      <slot name="select"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddChannel',
  props: {
    BgColor: {
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
  
  h1 {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 700;
    color: rgba(0, 0, 0, .75);
  }
  p {
    font-size: 13px;
    color: rgba(0, 0, 0, .85);
  }
}
</style>
