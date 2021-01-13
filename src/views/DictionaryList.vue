<template>
  <div class="xianyu-dictionary-detail">
    <back-top title="成语列表"></back-top>
    <div class="xianyu-dictionary-detail-container" id="dictionary-list-container" ref="dictionary-list-container">
      <div v-if="showSkeleton" class="xianyu-word-list-skeleton">
        <list-skeleton/>
      </div>
      
      <!-- 下拉刷新 -->
      <van-pull-refresh v-else v-model="pullDown" @refresh="onPullDownRefresh">

        <!-- 列表组件，上拉加载更多 -->
        <van-list
          v-model="loadMore"
          :finished="loadMoreFinished"
          :immediate-check="false"
          :offset="50"
          finished-text="我也是有底线的~"
          @load="onLoadMoreLoad"
        >
          <!-- 诗词列表组件 -->
          <dictionary-item
            v-for="(item, index) in dictionarys"
            :dictionary="item.word_title"
            :key="item._id"
            :no-margin-bottom="index === (dictionarys.length - 1)"
            @click="$router.push(`/dictionary-detail/${item._id}`)"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import DictionaryItem from '@/components/DictionaryItem/index.vue'
import ListSkeleton from '@/components/Skeleton/DictionaryListSkeleton.vue'
import { getDictionaryList } from '@/api/dictionary.js'
import { debounce } from 'lodash'
export default {
  name: 'DictionaryList',
  data () {
    return {
      currentPage: 1,
      // 每页返回的数据
      perPage: 20,
      dictionarys: [],
      total: 0,
      // 下拉刷新
      pullDown: false,
      // 上拉加载更多
      loadMore: false,
      // 上拉加载结束
      loadMoreFinished: false,
      // 列表的滚动的高度
      dictionaryListScrollTop: 0,
      showSkeleton: true
    }
  },

  mounted () {
    // 缓存控制
    this.$store.commit('addCachedPages', 'DictionaryList')
    this.getDictionaryListHandle()
    this.$refs['dictionary-list-container'].addEventListener('scroll', debounce(this.scrollHandle, 30))
  },

  activated () {
    this.$refs['dictionary-list-container'].scrollTop = this.dictionaryListScrollTop
  },

  computed: {
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    getDictionaryListHandle () {
      getDictionaryList(this.currentPage).then(res => {
        if (res.errno === 0) {
          this.dictionarys = res.data
          this.total = res.total
          setTimeout(() => {
            this.showSkeleton = false
          }, 30)
        }
      }).catch(() => {})
    },
    onPullDownRefresh () {
      this.currentPage = 1
      this.loadMoreFinished = false
      this.loadMore = false
      getDictionaryList(this.currentPage).then(res => {
        if (res.errno === 0) {
          this.dictionarys = res.data
          this.total = res.total
          this.pullDown = false
          this.$toast('刷新成功')
        }
      }).catch(() => {})
    },
    // 上拉加载更多
    async onLoadMoreLoad () {
      if (this.currentPage >= this.totalPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getDictionaryList(++this.currentPage)
      if (result.errno === 0) {
        this.dictionarys = [...this.dictionarys, ...result.data]
        this.loadMore = false
      }
    },
    scrollHandle () {
      this.dictionaryListScrollTop = this.$refs['dictionary-list-container'].scrollTop
    }
  },
  components: {
    DictionaryItem,
    ListSkeleton
  }
}
</script>

<style scoped lang="scss">
.xianyu-dictionary-detail-container {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(38, 38, 38, .05);
  overflow-y: auto;
}

.xianyu-word-list-skeleton {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  overflow-y: hidden;
}
</style>
