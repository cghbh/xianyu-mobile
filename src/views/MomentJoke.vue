<template>
  <div class="moment-joke">
    <back-top title="开心一刻"></back-top>
    <div class="moment-joke-content">
      话说有一只猴子，死后去见阎罗王！这猴子说，下辈子我不想再做猴子了，想转世为人！阎罗王想了想，说：“好吧。既然你想做人，那么必须把身上的毛全部拔掉。”说完，立马叫来了夜叉，给猴子拔毛。谁知道才刚拔第一根，猴子就痛得大叫，大呼受不了了。阎王哈哈大笑说：“哎，你看你，一毛不拔，如何能做人呢？”
    </div>
    <div class="zan-collect">
      <div class="zan-collect-container" :class="{ 'active': isZan }" @click="isZan = !isZan">

        <i class="iconfont icon-dianzan" v-if="isZan"></i>
        <i class="iconfont icon-dianzan1" v-else></i>
        <span>999</span>
      </div>
      <div class="zan-collect-container" :class="{ 'active': isCollect }" @click="isCollect = !isCollect">

        <i class="iconfont icon-shoucang1" v-if="isCollect"></i>
        <i class="iconfont icon-shoucang" v-else></i>
        <span>收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MomentJoke',
  data () {
    return {
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false
    }
  }
}
</script>

<style lang="scss" scoped>
.moment-joke {
  background-color: #fff;
  height: 100%;
  overflow: auto;
}
.moment-joke-content {
  height: 520px;
  display: flex;
  align-items: center;
  font-size: 17px;
  line-height: 34px;
  padding: 0 20px;
  text-indent: 1.3em;
}

.zan-collect {
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 30px;
  &-container:first-of-type {
    margin-right: 30px;
  }
  &-container {
    padding: 0px 20px;
    height: 35px;
    border: .5px solid rgba(0, 0, 0, .4);
    border-radius: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, .8);

    span {
      margin-left: 6px;
    }
  }

  &-container.active {
    .iconfont {
      color: #409fea;
    }
  }
}
</style>
