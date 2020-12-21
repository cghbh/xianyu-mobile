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
      <div class="meaning-container"><strong class="word-strong">释义：</strong>{{ dictionaryData.meaning }}</div>
      <div class="source"><strong class="word-strong">出处：</strong>{{ dictionaryData.source }}</div>
      <div class="story" v-if="dictionaryData.story && dictionaryData.story.trim().length > 0"><strong class="word-strong">成语故事：</strong>{{ dictionaryData.story }}</div>
    </div>
    <div class="zan-collect">
      <div class="zan-collect-container" :class="{ 'active': zanState }" @click="userZanOrCancel">

        <i class="iconfont icon-dianzan" v-if="zanState"></i>
        <i class="iconfont icon-dianzan1" v-else></i>
        <span class="word-exble-style">{{ zanNumber }}</span>
      </div>
      <div class="zan-collect-container" :class="{ 'active': collectState }" @click="userCollectOrCancel">

        <i class="iconfont icon-shoucang1" v-if="collectState"></i>
        <i class="iconfont icon-shoucang" v-else></i>
        <span class="word-exble-style">{{ collectNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDictionaryById } from '@/api/dictionary.js'
import { loadUserInfo, getUserZanedWordHandle, getUserCollectedWordHandle, userCancelCollectHandle, userCollectWordHandle, userCancelZanWordHandle, userZanWordHandle } from '@/api/user.js'

export default {
  name: 'Dictionary',
  data () {
    return {
      dictionaryData: {},
      userId: null,
      // 用户点赞过的成语id
      userLikeWordsId: [],
      // 用户收藏过的成语的id
      userCollectWordsId: [],
      zanNumber: 0,
      collectNumber: 0
    }
  },

  watch: {
    userId (newVal) {
      if (newVal) {
        this.getUserLikeWords(newVal)
        this.getUserCollectWords(newVal)
      }
    }
  },

  mounted () {
    this.getDictionaryDetail()
    if (this.isLogin) {
      this.getUserId()
    }
  },

  computed: {
    // 用户是否登陆的token
    isLogin () {
      return this.$store.state.token.token
    },
    
    // 成语的id 
    wordId () {
      return this.$route.params.dicId
    },

    // 点赞的状态，如果登陆同时已经点赞，则为进行时的状态
    zanState () {
      return this.isLogin && this.userLikeWordsId.includes(this.wordId)
    },

    // 收藏的状态
    collectState () {
      return this.isLogin && this.userCollectWordsId.includes(this.wordId)
    }
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
          this.zanNumber = result.data.zan_number
          this.collectNumber = result.data.collect_number
          this.dictionaryData = {
            dic: dic,
            meaning: result.data.word_meaning,
            source: result.data.word_birth,
            zan_number: result.data.zan_number,
            collect_number: result.data.collect_number,
            story: result.data.word_story
          }
        }
      } catch (err) {
        console.log(err, '错误捕获')
        this.$toast('请求的数据不存在')
        this.$router.push('/dictionary-list')
      }
    },

    // 获取用户的id
    async getUserId () {
      const result = await loadUserInfo()
      if (result.errno === 0) {
        this.userId = result.data._id
      }
    },
    
    // 获取已登陆用户点赞的成语
    async getUserLikeWords (id) {
      const result = await getUserZanedWordHandle(id)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => tempArray.push(item._id))
        this.userLikeWordsId = tempArray
      }
    },

    async getUserCollectWords (id) {
      const result = await getUserCollectedWordHandle(id)
      if (result.errno === 0) {
        const tempArray = []
        result.data.forEach(item => tempArray.push(item._id))
        this.userCollectWordsId = tempArray
      }
    },

    // 用户收藏或者取消收藏
    async userCollectOrCancel () {
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        if (this.collectState) {
          // 取消收藏
          const result = await userCancelCollectHandle(this.wordId)
          if (result.errno === 0) {
            this.$toast('取消收藏成功')
            const index = this.userCollectWordsId.indexOf(this.wordId)
            if (index > -1) {
              this.userCollectWordsId.splice(index, 1)
              const newResult = await getDictionaryById(this.wordId)
              if (newResult.errno === 0) {
                this.collectNumber = newResult.data.collect_number
              }
            }
          }
        } else {
          // 加入收藏
          const result = await userCollectWordHandle(this.wordId)
          if (result.errno === 0 && !this.userCollectWordsId.includes(this.wordId)) {
            this.$toast('收藏成功')
            this.userCollectWordsId.push(this.wordId)
            const newResult = await getDictionaryById(this.wordId)
            if (newResult.errno === 0) {
              this.collectNumber = newResult.data.collect_number
            }
          }
        }
      }
    },

    // 用户点赞或者取消点赞
    async userZanOrCancel () {
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        if (this.zanState) {
          const result = await userCancelZanWordHandle(this.wordId)
          if (result.errno === 0) {
            this.$toast('取消点赞成功')
            const index = this.userLikeWordsId.indexOf(this.wordId)
            if (index > -1) {
              this.userLikeWordsId.splice(index, 1)
            }
            const newResult = await getDictionaryById(this.wordId)
            if (newResult.errno === 0) {
              this.zanNumber = newResult.data.zan_number
            }
          }
        } else {
          const result = await userZanWordHandle(this.wordId)
          if (result.errno === 0 && !this.userLikeWordsId.includes(this.wordId)) {
            this.userLikeWordsId.push(this.wordId)
            this.$toast('点赞成功')
            const newResult = await getDictionaryById(this.wordId)
            if (newResult.errno === 0) {
              this.zanNumber = newResult.data.zan_number
            }
          }
        }
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
  padding-bottom: 20px;

  /deep/ .van-nav-bar,
  /deep/ .van-sticky{
    z-index: 2001;
    background-color: #fff;
  }
}

.xianyu-dictionary-container {
  display: flex;
  padding: 0 20px;
  padding-top: 75px;
  align-items: flex-start;
  box-sizing: border-box;
  flex-wrap: wrap;

  .dictionary-item {
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 12px;

    .pinyin {
      width: 50px;
      text-align: center;
      font-size: 18px;
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

  .story {
    margin-top: 20px;
    font-size: 16px;
    line-height: 32px;
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

.word-strong {
  font-weight: bold;
  font-size: 16px;
}

.word-exble-style {
  font-size: 15px;
}
</style>
