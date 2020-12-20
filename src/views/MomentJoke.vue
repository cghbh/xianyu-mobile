<template>
  <div class="moment-joke">
    <van-sticky>
      <van-nav-bar
        title="开心一刻"
        right-text="换一个"
        sticky
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="switchOne">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="moment-joke-content">{{ joke.content }}</div>
  </div>
</template>

<script>
import { getJokeRandom } from '@/api/joke.js'
import { debounce } from 'lodash'
export default {
  name: 'MomentJoke',
  data () {
    return {
      joke: {}
    }
  },
  mounted () {
    this.getJokeRandomHandle()
  },
  methods: {
    async getJokeRandomHandle () {
      const result = await getJokeRandom()
      if (result.errno === 0) {
        this.joke = result.data
        this.$store.commit('addReadJokes', result.data._id)
      }
    },
    switchOne: debounce(function () {
      getJokeRandom().then(result => {
        if (result.errno === 0) {
          this.joke = result.data
          this.$store.commit('addReadJokes', result.data._id)
        }
      })
    }, 150)
  }
}
</script>

<style lang="scss" scoped>
.moment-joke {
  background-color: #fff;
  height: 100%;
  overflow: auto;

  /deep/ .van-nav-bar {
    background-color: #409fea;
    color: #fff;
  }

  /deep/ .van-nav-bar__title {
    color: #fff;
  }

  /deep/ .van-nav-bar__text {
    color: #fff;
    font-size: 16px;
  }
}
.moment-joke-content {
  min-height: 320px;
  margin-top: 100px;
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
