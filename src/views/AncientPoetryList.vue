<template>
  <div class="ancient-list">
    <back-top title="诗词列表"></back-top>
    
    <div class="ancient-list-container" id="ancient-list-container" ref="ancient-list-container">
      <van-pull-refresh
        loosing-text="别老拽着,快放开我"
        loading-text="正在刷新中"
        success-text="刷新成功"
        v-model="pullDown"
        @refresh="pullDownRefresh">
        <div class="poem-list-container">
          <van-list
            :finished="lodeMoreFinished"
            :immediate-check="false"
            v-model="lodeMore"
            finished-text="没有更多了"
            @load="onLoadMoreHandle"
          >
            <poem-item
              @click="$router.push('/ancient-poetry/' + item._id)"
              v-for="(item, index) in poemList"
              :itemvalue="item"
              :key="item._id"
              :no-margin="index === poemList.length - 1 "
            />
          </van-list>
        </div>
      </van-pull-refresh>
    </div>

  </div>
</template>

<script>
import { getPoemList } from '@/api/poem.js'
import { debounce } from 'lodash'
import PoemItem from '@/components/PoemItem/index.vue'
export default {
  name: 'AncientPoetryList',
  data () {
    return {
      poemList: [],
      // 下拉刷新状态
      pullDown: false,
      // 上拉加载更多
      lodeMore: false,
      // 加载完毕
      lodeMoreFinished: false,
      currentPage: 1,
      // 所有的数据条数
      total: 0,
      perPage: 20,
      // 记录滚动的距离
      listScrollTop: 0
    }
  },

  computed: {
    // 当前的数据一共有几页
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },

  mounted () {
    this.getPoemHandle()
    document.getElementById('ancient-list-container').addEventListener('scroll', debounce(this.listScrollHandle, 30))
  },
  activated () {
    this.$refs['ancient-list-container'].scrollTop = this.listScrollTop
  },
  beforeDestroy () {
    // 第三个参数必须为true，否则不能卸载事件
    document.getElementById('ancient-list-container').removeEventListener('scroll', this.listScrollHandle, true)
  },

  methods: {
    async getPoemHandle () {
      const result = await getPoemList(this.currentPage)
      if (result.errno === 0) {
        this.poemList = result.data
        this.total = result.total
      }
    },
    // 下拉刷新
    async pullDownRefresh () {
      this.currentPage = 1
      this.lodeMoreFinished = false
      this.loadMore = true
      const result = await getPoemList(this.currentPage)
      if (result.errno === 0) {
        this.poemList = result.data
        this.total = result.total
        this.pullDown = false
        this.lodeMore = false
        this.$toast('刷新成功')
      }
    },

    // 上拉加载更多
    async onLoadMoreHandle () {
      if (this.currentPage >= this.totalPage) {
        this.lodeMoreFinished = true
        return
      }
      const result = await getPoemList(++this.currentPage)
      if (result.errno === 0) {
        this.poemList = [...this.poemList, ...result.data]
        this.lodeMore = false
      }
    },
    listScrollHandle () {
      this.listScrollTop = this.$refs['ancient-list-container'].scrollTop
    }
  },

  components: {
    PoemItem
  }
}
</script>

<style scoped lang="scss">
.ancient-list-container {
  background-color: rgba(38, 38, 38, .05);
  touch-action: manipulation;
  overflow: auto;
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}

.ancient-item {
  padding: 20px 15px 15px 15px;
  margin-bottom: 12px;
  background-color: #fff;
  
  &-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    h1 {
      font-size: 16px;
    }

    p {
      font-size: 13px;
      display: flex;
      align-items: center;

      span {
        margin: 0 1px;
      }
    }
  }

  &-author {
    font-size: 13px;
    color: #666;
  }
}

.ancient-item.no-margin {
  margin-bottom: 0;
}

.ancient-list /deep/ .mint-loadmore-bottom,
.ancient-list /deep/ .mint-loadmore-top {
  text-align: center;
  font-size: 14px;
}
</style>
