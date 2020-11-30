<template>
  <div class="ancient-poetry">
    <back-top title="诗词"></back-top>
    <div class="ancient-poetry-container" style="min-height: 400px;font-size: 14px; text-align: center;line-height: 32px;padding-top: 15px; color: #555;">
      <h1 style="font-size: 20px;font-weight: bold;">蝶恋花·出塞</h1>
      <p style="font-size: 16px; color: #666;">纳兰性德</p>
      <p style="font-size: 16px;">今古河山无定据。画角声中，牧马频来去。</p>
      <p style="font-size: 16px;">满目荒凉谁可语？西风吹老丹枫树。</p>
      <p style="font-size: 16px;">从前幽怨应无数。铁马金戈，青冢黄昏路。</p>
      <strong style="font-weight: bold;font-size: 16px;"> 一往情深深几许？深山夕照深秋雨。</strong>
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
  name: 'AncientPoetry',
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

<style scoped lang="scss">
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }
}

.ancient-poetry {
  background-color: #fff;
  height: 100%;
  overflow: auto;
}

.ancient-poetry-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.zan-collect {
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
  margin-top: 20px;
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
