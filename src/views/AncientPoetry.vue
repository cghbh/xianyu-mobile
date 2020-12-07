<template>
  <div class="ancient-poetry">
    <back-top title="诗词"></back-top>
    <div class="ancient-poetry-container" style="min-height: 300px;font-size: 14px; text-align: center;line-height: 32px;padding-top: 15px; color: #555;">
      <h1 style="font-size: 18px;font-weight: bold;">{{ poemObj.poem_title }}</h1>
      <p style="font-size: 15px; color: #666; margin: 8px 0;">{{ poemObj.poem_author }}</p>
      <div class="poem-content" v-html="poemObj.poem_content"></div>
    </div>
    <h1 class="poem-meaning-title">诗词释义:</h1>
    <div class="poem-meaning" v-html="poemObj.poem_appreciation"></div>
    <div class="zan-collect">
      <div class="zan-collect-container" :class="{ 'active': isZan }" @click="isZan = !isZan">

        <i class="iconfont icon-dianzan" v-if="isZan"></i>
        <i class="iconfont icon-dianzan1" v-else></i>
        <span>{{ poemObj.zan_number }}</span>
      </div>
      <div class="zan-collect-container" :class="{ 'active': isCollect }" @click="isCollect = !isCollect">

        <i class="iconfont icon-shoucang1" v-if="isCollect"></i>
        <i class="iconfont icon-shoucang" v-else></i>
        <span>{{ poemObj.collect_number }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getPoemById } from '@/api/poem.js'
export default {
  name: 'AncientPoetry',
  data () {
    return {
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false,
      poemObj: {}
    }
  },
  computed: {
    poemId () {
      return this.$route.params.poemId
    }
  },
  mounted () {
    this.getPoemHandle()
  },
  methods: {
    async getPoemHandle () {
      try {
        const result = await getPoemById(this.poemId.toString())
        if (result.errno === 0) {
          result.data.poem_content = result.data.poem_content.replace(/[\n\r]/g, '<br>')
          result.data.poem_appreciation = result.data.poem_appreciation.replace(/[\n\r]/g, '<br>')
          this.poemObj = result.data
        }
      } catch (err) {
        this.$toast('请求的数据不存在')
        this.$router.go(-1)
      }
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

.poem-content {
  font-size: 17px;
  text-align: center;
  padding: 0 15px;
  line-height: 35px;
  color: #333;

  /deep/ strong {
    font-weight: bold!important;
  }
}

.poem-meaning-title {
  padding: 10px 15px;
  padding-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.poem-meaning {
  padding: 0 15px;
  font-size: 16px;
  line-height: 36px;
  color: #666;
}
</style>
