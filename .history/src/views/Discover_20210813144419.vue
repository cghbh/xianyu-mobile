<template>
  <div class="homepage-container">
    <div class="xianyu-discover" ref="discover" id="xianyu-discover">
      <home-skeleton v-if="showSkeleton"></home-skeleton>

      <div v-else class="xianyu-discover-content-container">
        <van-search
          @click="$router.push('/search')"
          input-align="center"
          placeholder="搜索好文/诗词/成语/用户"
          readonly
          disabled
        />
        <div style="padding: 0 15px; margin-top: 15px; border-radius: 10px;overflow: hidden;height: 180px">
          <img style="width:100%; height: 100%; border-radius: 6px; object-fit: cover;" src="../assets/images/poem_demo.jpeg" alt="">
        </div>
        <!-- <div class="xianyu-discover-touser" v-if="false">
          <h1>致用户大人</h1>
          <h2>如何玩转新版闲语</h2>
        </div> -->
      
        <div class="xianyu-classify">
          <div class="xianyu-classify-item" @click="$router.push('/article-list')">
            <i class="iconfont icon-huokewenzhang"></i>
            <span>好文</span>
          </div>
          <div class="xianyu-classify-item" @click="$router.push('/ancient-poetrylist')">
            <i class="iconfont icon-wenxue"></i>
            <span>诗词</span>
          </div>
          <div class="xianyu-classify-item" @click="$router.push('/dictionary-list')">
            <i class="iconfont icon-datiqia"></i>
            <span>词典</span>
          </div>
          <div class="xianyu-classify-item" @click="$router.push('/joke')">
            <i class="iconfont icon-xiaolian"></i>
            <span>开心一刻</span>
          </div>
        </div>

        <div class="title-container">
          <h1 class="xianyu-discover-title-recommend" :class="{ 'active': activeIndex === 1 }" @click="activeIndex = 1">推荐好文</h1>
          <h1 class="xianyu-discover-title-recommend" :class="{ 'active': activeIndex === 2 }" @click="activeIndex = 2">推荐诗词</h1>
        </div>

        <div class="article-recommend-container" v-if="activeIndex === 1">
          <article-item
            v-for="(item, index) in recommendArticles"
            :article="item"
            :no-margin-bottom="index === (recommendArticles.length - 1)"
            @click="$router.push(`/article-detail/${item._id}`)"
            :key="item._id"
          >
          </article-item>
        </div>

        <div class="poem-recommend-container" v-if="activeIndex === 2">
          <poem-item
            @click="$router.push('/ancient-poetry/' + item._id)"
            v-for="(item, index) in recommendPoems"
            :itemvalue="item"
            :key="item._id"
            :no-margin="index === recommendPoems.length - 1 "
          >
          </poem-item>
        </div>
      </div>
      <div class="keep-record-container ">
        <a class="keep-record" href="https://beian.miit.gov.cn/">鄂ICP备2020021583号-1</a>
      </div>
    </div>
    
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem/index.vue'
import PoemItem from '@/components/PoemItem/index.vue'
import HomeSkeleton from '@/components/Skeleton/HomeSkeleton.vue'
import { getHotArticle } from '@/api/article.js'
import { recommendPoem } from '@/api/poem.js'
import { debounce } from 'lodash'
import Meta from '@/config/vueMetaInfo.js'
export default {
  name: 'Discover',
  metaInfo: Meta.Discover,
  data () {
    return {
      activeIndex: 1,
      recommendArticles: [],
      recommendPoems: [],
      scrollTop: 0,
      showSkeleton: true
    }
  },

  watch: {
    activeIndex: {
      handler (newVal) {
        if (newVal === 1) {
          this.getRecommendArticle()
        } else {
          this.getrecommendPoem()
        }
      },
      immediate: true
    }
  },
  mounted () {
    // 缓存控制
    this.$store.commit('addCachedPages', 'Discover')
    this.$refs.discover && this.$refs.discover.addEventListener('scroll', debounce(this.discoverPageScroll, 30))
  },

  activated () {
    this.$refs.discover && (this.$refs.discover.scrollTop = this.scrollTop)
  },

  beforeDestroy () {
    this.$refs.discover && this.$refs.discover.removeEventListener('scroll', this.discoverPageScroll, true)
  },

  methods: {
    // 推荐好文
    async getRecommendArticle () {
      const result = await getHotArticle()
      if (result.errno === 0) {
        this.recommendArticles = result.data
        setTimeout(() => {
          this.showSkeleton = false
        }, 30)
      }
    },
    
    async getrecommendPoem () {
      const result = await recommendPoem()
      if (result.errno === 0) {
        this.recommendPoems = result.data
      }
    },

    discoverPageScroll () {
      const scrollTop = this.$refs.discover.scrollTop
      this.scrollTop = scrollTop
    }
  },

  components: {
    ArticleItem,
    PoemItem,
    HomeSkeleton
  }
}
</script>

<style scoped lang="scss">
.doge {
  width: 140px!important;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}

.xianyu-discover {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.xianyu-discover {
  padding-top: 8px;

  /deep/ .van-swipe {
    border-radius: 6px;
  }

  /deep/ .van-search {
    padding: 15px 12px 6px 12px;
  }

  /deep/ .van-search__content {
    border-radius: 5px;
  }

  /deep/ .van-field__control:disabled {
    -webkit-text-fill-color: #323233;
  }

  /deep/ .van-pull-refresh {
    height: 100%;
  }

  /deep/ .van-swipe-item {
    height: 28.4vh;
    overflow: hidden;
  }

  /deep/ .xianyu-article-item {
    padding-left: 12px;
  }

  /deep/ .divide-area {
    background-color: rgba(38, 38, 38, .05);
  }
}

.xianyu-discover {
  background-color: #fff;
}

.xianyu-discover-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
}

.xianyu-classify {
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .iconfont {
      width: 54px;
      height: 54px;
      color: #fff;
      display: flex;
      font-size: 18px;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-bottom: 15px;
    }

    .iconfont.icon-huokewenzhang {
      background-color: #4FBFAB;
      font-size: 24px;
    }

    .iconfont.icon-wenxue {
      background-color: #FB7D77;
      font-size: 20px;
    }

    .iconfont.icon-datiqia {
      background-color: #878EF3;
      font-size: 19px;
    }

    .iconfont.icon-bisai {
      background-color: #409fdc;
      font-size: 22px;
    }

    .iconfont.icon-xiaolian {
      background-color: #6B9BFE;
      font-size: 24px;
    }

    span {
      font-size: 15px;
    }
  }
}

.xianyu-discover-touser {
  display: flex;
  padding: 0 15px;
  height: 150px;
  background-color: rgba(45,162,255, .8);
  margin: 15px 12px 5px 12px;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  letter-spacing: 1.5px;

  h1 {
    margin-bottom: 12px;
    font-size: 22px;
  }

  h2 {
    font-size: 18px;
  }
}

.title-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
}

.xianyu-discover-title-recommend {
  margin-left: 12px;
  font-size: 17px;
  color: #555;
  padding-bottom: 10px;
}

.xianyu-discover-title-recommend.active {
  font-size: 20px;
  color: #409fea;
  font-weight: bold;
}

.article-recommend-container {
  background-color: rgba(38, 38, 38, 0.05);
}

.poem-recommend-container {
  background-color: rgba(38, 38, 38, 0.05);
}

/* 底部备案 */
.keep-record-container {

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  .keep-record {
    font-size: 14px;
    position: relative;
    color: #aaa;
    display: block;
  }

  .keep-record::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 1px;
    background-color: red;
    top: 50%;
    left: -60px;
  }
}
</style>
