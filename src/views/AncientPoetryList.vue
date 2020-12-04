<template>
  <div class="ancient-list">
    <back-top title="诗词列表"></back-top>
    <div class="ancient-list-container">
      <mt-loadmore
        :bottom-method="pullUpHandle"
        :top-method="pullDownHandle"
        :bottom-all-loaded="finished"
        :auto-fill="false"
        top-pull-text="下拉即可刷新"
        top-drop-text="别老拽着,快放开我"
        top-loading-text="正在飞快刷新中......"
        bottom-pull-text="上拉加载更多"
        bottom-drop-text="别老拽着,快放开我"
        bottom-loading-text="正在加载..."
        ref="loadmore">
        <div class="ancient-item" @click="$router.push('/ancient-poetry/' + item._id)" v-for="(item, index) in poemList" :key="item._id + index">
          <div class="ancient-item-title">
            <h1>{{ item.poem_title }}</h1>
            <p>
              [<span>{{ item.author_dynasty }}</span>]
            </p>
          </div>
          <p class="ancient-item-author">{{ item.poem_author }}</p>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { getPoemList } from '@/api/poem.js'
// import PoemItem from '@/components/PoemItem/index.vue'
export default {
  name: 'AncientPoetryList',
  data () {
    return {
      poemList: [],
      // 下拉刷新状态
      pullDown: false,
      // 上拉加载更多
      pullUp: false,
      // 加载完毕
      finished: false,
      currentPage: 1,
      // 所有的数据条数
      totalPage: 0,
      perPage: 10
    }
  },
  computed: {
    // 当前的数据一共有几页
    pages () {
      return Math.ceil(this.totalPage / this.perPage)
    }
  },
  mounted () {
    this.getPoemHandle()
  },
  methods: {
    async getPoemHandle () {
      const result = await getPoemList(this.currentPage)
      if (result.errno === 0) {
        this.poemList = result.data
        this.totalPage = result.total
      }
    },
    async pullDownHandle () {
      this.currentPage = 1
      const result = await getPoemList(this.currentPage)
      if (result.errno === 0) {
        this.poemList = result.data
        this.totalPage = result.total
        this.$refs.loadmore.onTopLoaded()
      }
    },
    pullUpHandle () {
      setTimeout(() => {
        this.finished = false
        this.$refs.loadmore.onTopLoaded()
      }, 500)
    }
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
