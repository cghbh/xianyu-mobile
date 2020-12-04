<template>
  <div class="xianyu-dictionary">
    <back-top title="成语词典"></back-top>
    <div class="xianyu-dictionary-container" v-cloak>
      <div class="dictionary-item" v-for="(item, index) in dictionaryData.dic" :key="index.toString() + Math.random()">
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
      <div class="meaning-container">释义：{{ dictionaryData.meaning }}</div>
      <div class="source">出处：{{ dictionaryData.source }}</div>
    </div>
    <div class="zan-collect">
      <div class="zan-collect-container" :class="{ 'active': isZan }" @click="isZan = !isZan">

        <i class="iconfont icon-dianzan" v-if="isZan"></i>
        <i class="iconfont icon-dianzan1" v-else></i>
        <span>{{ dictionaryData.zan_number }}</span>
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
import { getDictionaryById } from '@/api/dictionary.js'
export default {
  name: 'Dictionary',
  data () {
    return {
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false,
      dictionaryData: {}
    }
  },
  mounted () {
    this.getDictionaryDetail()
  },
  methods: {
    // 根据id获取成语的详细内容
    async getDictionaryDetail () {
      try {
        const result = await getDictionaryById(this.$route.params.dicId)
        if (result.errno === 0) {
          const pinyin = result.data.word_pinyin.trim().split(' ')
          const hanzi = result.data.word_title.trim().split('')
          const dic = []
          pinyin.forEach((item, index) => {
            dic.push({ pinyin: item, hanzi: hanzi[index] })
          })
          this.dictionaryData = {
            dic: dic,
            meaning: result.data.word_meaning,
            source: result.data.word_birth,
            zan_number: result.data.zan_number,
            collect_number: result.data.collect_number
          }
        }
      } catch (err) {
        console.log(err, '错误捕获')
        this.$toast('请求的数据不存在')
        this.$router.push('/dictionary-list')
      }
    }
  }
}
</script>

<style scoped lang="scss">
$distance: 1px;
$color: #aaa;
$fontColor: #000;

[v-cloak] {
  display: none;
}

.xianyu-dictionary {
  background-color: #fff;
  height: 100%;

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
