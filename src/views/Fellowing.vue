<template>
  <!-- 我关注的 -->
  <div class="xianyu-fellowing" v-cloak>
    <back-top title="我的关注"></back-top>
    <div class="xianyu-fellowing-container">
      <van-pull-refresh v-model="pullDown" @refresh="onPullDownRefresh" v-if="hasFellowData">
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
            @cancelFollow="cancelFellowHandle(item.nickname, item._id)"></follow-item>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-empty v-if="!hasFellowData && tag" description="你还没有关注过一个人哟......" />
  </div>
</template>

<script>
import FollowItem from '@/components/FollowItem/index.vue'
// import { userFollows, userCancelFollow, userFollow } from '@/api/user.js'
import { userFollows, loadUserInfo, userCancelFollow } from '@/api/user.js'
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
      loadMoreFinished: true,
      // 用户登录的id号
      userId: null,
      // 避免初始化情况下没有数据，展示的是空状态图，后面数据来了之后，展示的却是列表，这种矛盾的问题
      // 也就是说默认情况下不展示，处分监听到的数据是空的，就展示空的占位图
      tag: false,
      // 数据从第一页开始
      currentPage: 1,
      // 总的关注条数
      total: 0
    }
  },
  mounted () {
    this.getUserId()
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
      }
    },

    // 下拉刷新操作
    async onPullDownRefresh () {
      const result = await userFollows(this.userId)
      if (result.errno === 0) {
        this.followingList = result.data
        this.total = result.total
        this.pullDown = false
      }
    },

    // 上拉加载更多操作
    onLoadMoreHandle () {},

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
        console.log(result, '取消的结果')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    FollowItem
  }
}
</script>

<style scoped lang="scss">
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
    height: 100%!important;
  }
  background-color: #fff;
}
</style>
