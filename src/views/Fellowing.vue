<template>
  <!-- 我关注的 -->
  <div class="xianyu-fellowing" v-cloak>
    <back-top title="我的关注"></back-top>
    <div class="xianyu-fellowing-container" ref="xianyu-fellowing-container" id="xianyu-fellowing-container">
      <div class="xianyu-follow-skeleton" v-if="showSkeleton">
        <skeleton-item v-for="item in 9" :key="item + Math.random()"></skeleton-item>
      </div>

      <van-pull-refresh v-if="hasFellowData && !showSkeleton" v-model="pullDown" @refresh="onPullDownRefresh">
        <van-list
          v-model="loadMore"
          :finished="loadMoreFinished"
          :immediate-check="false"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoadMoreHandle"
        >
          <follow-item
            v-for="item in followingList"
            :key="item._id"
            :user="item"
            @cancelFollow="cancelFellowHandle(item.nickname, item._id)"
            @click="$router.push('/my-detail')"
          />
        </van-list>
      </van-pull-refresh>
    </div>
    <van-empty :image="emptyImg" v-if="!hasFellowData && tag" description="你还没有关注过一个人哟......" />
  </div>
</template>

<script>
import FollowItem from '@/components/FollowItem/index.vue'
import SkeletonItem from '@/components/Skeleton/FollowSkeleton.vue'
import { userFollows, loadUserInfo, userCancelFollow } from '@/api/user.js'
// 滚动性能节流处理
import { debounce } from 'lodash'
export default {
  name: 'Following',
  data () {
    return {
      // 下拉刷新
      pullDown: false,
      // 我关注的人
      followingList: [],
      // 上拉加载更多
      loadMore: false,
      // 上拉加载更多结束
      loadMoreFinished: false,
      // 用户登录的id号
      userId: null,
      // 避免初始化情况下没有数据，展示的是空状态图，后面数据来了之后，展示的却是列表，这种矛盾的问题
      // 也就是说默认情况下不展示，处分监听到的数据是空的，就展示空的占位图
      tag: false,
      // 数据从第一页开始
      currentPage: 1,
      // 总的关注条数
      total: 0,
      // 每页展示的数据
      perPage: 20,
      // 记录缓存页面返回的高度
      scrollTop: 0,
      emptyImg: require('../assets/images/empty-image-default.png'),
      showSkeleton: true
    }
  },
  mounted () {
    this.getUserId()
    document.getElementById('xianyu-fellowing-container').addEventListener('scroll', debounce(this.getScrollTopHandle, 30))
  },

  activated () {
    document.getElementById('xianyu-fellowing-container').scrollTop = this.scrollTop
  },

  // 组件销毁之前卸载事件
  beforeDestroy () {
    document.getElementById('xianyu-fellowing-container').removeEventListener('scroll', this.getScrollTopHandle, true)
  },

  watch: {
    userId (newVal) {
      if (newVal) {
        this.getUserFollows(newVal)
      }
    },
    
    followingList (newVal) {
      if (newVal.length <= 0) {
        this.tag = true
      }
    }
  },
  computed: {
    hasFellowData () {
      return this.followingList.length > 0
    },

    isLogin () {
      return this.$store.state.token.token
    },

    // 关注者的id，如果取消关注就删除这个id
    followsId () {
      const arrayId = []
      this.followingList.forEach(item => {
        arrayId.push(item._id)
      })
      return arrayId
    },

    // 总的数据条数/ 每页展示的数据
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    // 获取用户的id
    async getUserId () {
      const result = await loadUserInfo()
      if (result.errno === 0) {
        this.userId = result.data._id
      }
    },

    // 获取我关注的人
    async getUserFollows (id) {
      const result = await userFollows(id)
      if (result.errno === 0) {
        this.followingList = result.data
        this.total = result.total
        setTimeout(() => {
          this.showSkeleton = false
        }, 30)
      }
    },

    // 下拉刷新操作
    async onPullDownRefresh () {
      this.currentPage = 1
      this.loadMoreFinished = false
      this.loadMore = false
      const result = await userFollows(this.userId, this.currentPage)
      if (result.errno === 0) {
        this.followingList = result.data
        this.total = result.total
        this.pullDown = false
      }
    },

    // 上拉加载更多操作
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await userFollows(this.userId, ++this.currentPage)
      if (result.errno === 0) {
        this.followingList = [...this.followingList, ...result.data]
        this.loadMore = false
      }
    },

    cancelFellowHandle (name, id) {
      this.$dialog.confirm({
        title: `确定要取消关注${name}吗？`,
        width: '280px',
        confirmButtonText: '取消关注',
        cancelButtonText: '放弃'
      }).then(async () => {
        const result = await userCancelFollow(id)
        if (result.errno === 0) {
          const index = this.followingList.findIndex(item => item._id === id)
          this.followingList.splice(index, 1)
          this.$toast('取消关注成功')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getScrollTopHandle () {
      this.scrollTop = document.getElementById('xianyu-fellowing-container').scrollTop
    }
  },
  components: {
    FollowItem,
    SkeletonItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-follow-skeleton {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
[v-cloak]{
  display: none;
}
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }
}
.xianyu-fellowing {
  /deep/ .van-empty {
    padding: 150px 0 100px 0;
  }
  background-color: #fff;

  &-container {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
