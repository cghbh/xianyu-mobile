<template>
  <div class="xianyu-dictionary">
    <van-sticky>
      <van-nav-bar title="成语词典" sticky left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="xianyu-dictionary-container">
      <div class="dictionary-item" v-for="(item, index) in mock.dic" :key="index">
        <div class="pinyin">{{ item.pinyin }}</div>
        <div class="hanzi">
          <div class="left-line"></div>
          <div class="right-line"></div>
          <div class="top-line"></div>
          <div class="bottom-line"></div>
          <div class="col-line"></div>
          <div class="row-line"></div>
          <div class="word-conatiner">{{ item.hanzi }}</div>
        </div>
      </div>
    </div>
    <div class="word-meaning">
      <div class="meaning-container">{{ mock.meaning }}</div>
      <div class="source">{{ mock.source }}</div>
    </div>
    <divide-area></divide-area>
    <comment-item></comment-item>
    <bottom-comment></bottom-comment>
    <refresh-icon></refresh-icon>
  </div>
</template>

<script>
import BottomComment from '../components/BottomComment/index.vue'
import CommentItem from '../components/BottomComment/comment.vue'
import DivideArea from '../components/PublicComponents/DivideArea.vue'
export default {
  name: 'Dictionary',
  data () {
    return {
      mock: {
        dic: [
          { pinyin: 'jiǒng', hanzi: '迥' },
          { pinyin: 'rán', hanzi: '然' },
          { pinyin: 'bù', hanzi: '不' },
          { pinyin: 'tóng', hanzi: '同' }
        ],
        meaning: '意思是形容差别很大，一点儿也不相同。',
        source: '宋·张戒《岁寒堂诗话》卷上：“文章古今迥然不同，钟嵘《诗品》以古诗第一，子建（曹植）次之，此论诚然。”'
      }
    }
  },
  components: {
    BottomComment,
    CommentItem,
    DivideArea
  }
}
</script>

<style scoped lang="scss">
$distance: 1px;
$color: #aaa;
$fontColor: #000;
.xianyu-dictionary {
  background-color: #fff;

  /deep/ .van-nav-bar,
  /deep/ .van-sticky{
    z-index: 2001;
    background-color: #fff;
  }
}
.xianyu-dictionary-container {
  display: flex;
  padding: 0 20px;
  padding-top: 160px;
  align-items: flex-start;
  box-sizing: border-box;
  .dictionary-item {
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .pinyin {
      width: 50px;
      text-align: center;
      font-size: 14px;
      color: $fontColor;
    }

    .hanzi {
      position: relative;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      margin-top: 5px;

      .left-line,
      .right-line {
        position: absolute;
        top: $distance;
        bottom: $distance;
        width: 2px;
        transform: scaleX(.5);
        background-color: $color;
        z-index: 2000;
      }

      .left-line {
        left: 0;
      }

      .right-line {
        right: 0;
      }

      .top-line,
      .bottom-line {
        position: absolute;
        right: $distance;
        left: $distance;
        background-color: $color;
        height: 2px;
        transform: scaleY(.5);
      }

      .top-line {
        top: 0;
      }

      .bottom-line {
        bottom: 0;
      }

      .row-line {
        position: absolute;
        top: 3px;
        bottom: 3px;
        width: 1px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 1px dashed $color;
      }

      .col-line {
        position: absolute;
        left: 3px;
        right: 3px;
        height: 1px;
        top: 50%;
        transform: translateY(-50%);
        border-top: 1px dashed $color;
      }

      .word-conatiner {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        font-size: 28px;
        font-weight: 600;
        color: $fontColor;
      }
    }
  }
}

.word-meaning {
  padding: 0 20px;
  margin-top: 50px;
  padding-bottom: 40px;

  .meaning-container,
  .source {
    font-size: 16px;
    line-height: 28px;
  }
  .source {
    margin-top: 20px;
  }
}
</style>
