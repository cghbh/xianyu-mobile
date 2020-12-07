<template>
  <div class="xianyu-search">
    <van-search
      @click="$router.push('/search')"
      @search="onSearch"
      @cancel="$router.go(-1)"
      v-model="searchValue"
      input-align="left"
      placeholder="请输入搜索关键词"
      show-action
      background="#409fea"/>
    <div class="xianyu-search-container">
      <div class="xianyu-search-container-history" v-if="searchKeyWords.length">
        <div class="xianyu-search-container-history-title">
          <h2>历史记录</h2>
          <i @click="askClearSearchHistory" class="iconfont icon-delete"></i>
        </div>
        <div class="xianyu-search-container-history-container">
          <div class="xianyu-search-container-history-item" v-for="item in searchKeyWords" :key="item">{{ item }}</div>
        </div>
      </div>
      <divide-area v-if="searchKeyWords.length"></divide-area>
      <div class="xianyu-search-topic">
        <div class="xianyu-search-topic-title">热门好文</div>
        <div class="xianyu-search-topic-container">
          <div class="xianyu-search-topic-container-item"
            v-for="(item, index) in hotArticles"
            @click="$router.push('/article-detail/' + item._id)"
            :key="item._id">
            <i :style="{ 'background-color': index === 0 ? '#FE2D46': index === 1 ? '#F60': index === 2 ? '#FAA90E': '#409fea'}" class="iconfont icon-huati1"></i>
            <span>{{ item.article_title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DivideArea from '../components/PublicComponents/DivideArea.vue'
import { getHotArticle } from '@/api/article.js'
export default {
  name: 'Search',
  data () {
    return {
      searchValue: '',
      mockSearchHistory: [
        '算法',
        'Node.js博客系统',
        'Vue3造轮子',
        'Typescript',
        'React17-RC最新版',
        'Webpack5',
        'HTML5'
      ],
      hotArticles: []
    }
  },
  computed: {
    searchKeyWords () {
      return this.$store.state.searchKeyWords
    }
  },
  mounted () {
    this.genHotArticleHandle()
  },
  methods: {
    // 回车搜索
    onSearch () {
      this.$store.commit('addSearchKeyWords', this.searchValue)
    },
    async genHotArticleHandle () {
      const result = await getHotArticle()
      if (result.errno === 0) {
        this.hotArticles = result.data
      }
    },
    // 询问是否删除搜索历史
    askClearSearchHistory () {
      this.$dialog.confirm({
        title: '是否清除历史记录？',
        width: '280px'
      })
        .then((e) => {
          this.$store.commit('clearSearchKeyWords')
          // 提示用户清楚历史记录成功
          setTimeout(() => {
            this.$toast({
              message: '清除成功！',
              position: 'top'
            })
          }, 200)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  components: {
    DivideArea
  }
}
</script>

<style scoped lang="scss">
.xianyu-search /deep/ .van-search__action {
  background-color: transparent;
  color: #fff;
}

.xianyu-search-container {
  background-color: #fff;

  &-history {
    padding: 15px 15px 0 15px;
    &-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      h2 {
        font-size: 16px;
        font-weight: 700;
        color: rgba(0, 0, 0, .6);
        user-select: none;
      }

      .iconfont {
        font-size: 17px;
        color: #e92322;
      }
    }
    &-container {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      font-size: 12px;
      color: #555;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      padding: 5px 10px;
      margin-right: 10px;
      user-select: none;
      border-radius: 4px;
    }
  }
}

.xianyu-search-topic {
  padding: 0 15px 15px 15px;
  &-title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, .6);
    user-select: none;
    padding-top: 18px;
    margin-bottom: 8px;
  }
  &-container {
    &-item {
      font-size: 14px;
      color: #555;
      margin-top: 15px;
      font-weight: 400;
      user-select: none;
      display: flex;
      align-items: center;
      padding: 3px;
      border-radius: 4px;
      color: rgba(0, 0, 0, .6);

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .iconfont {
        color: #fff;
        font-size: 11px;
        padding: 4px;
        background-color: #409fea;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
  }
}
</style>
