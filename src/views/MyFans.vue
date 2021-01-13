<template>
  <div class="xianyu-fans">
    <back-top title="我的粉丝"></back-top>
    <div class="xianyu-fans-container" id="xianyu-fans-container" ref="xianyu-fans-container">
      <div class="xianyu-fans-skeleton" v-if="showSkeleton">
        <poem-skeleton v-for="item in 9" :key="item + Math.random()"></poem-skeleton>
      </div>
      <van-pull-refresh v-model="pullDown" @refresh="onPullDownRefresh" v-if="hasFansData && !showSkeleton">
        <van-list
          v-model="loadMore"
          :finished="loadMoreFinished"
          :immediate-check="false"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoadMoreHandle"
        >
          <follow-item
            v-for="item in fansList"
            :user="item"
            :key="item._id"
            :is-follow="followListId.some(item1 => item1 === item._id)"
            @goDetail="$router.push(`/my-detail/${item._id}`)"
            @cancelFollow="cancelFollow(item._id)"
            @followMyFans="userFollowHandle(item._id)"
          />
        </van-list>
      </van-pull-refresh>

      <van-empty :image="emptyImg" v-if="!hasFansData && tag" description="还没有一个人关注过你哟......" />
    </div>
    
  </div>
</template>

<script>
import { loadUserInfo, getMyFans, userFollows, userCancelFollow, userFollow } from '@/api/user.js'
import FollowItem from '@/components/FansItem/index.vue'
import PoemSkeleton from '@/components/Skeleton/FollowSkeleton.vue'
import { debounce } from 'lodash'
export default {
  name: 'MyFans',
  data () {
    return {
      // 我的粉丝列表
      fansList: [],
      // 我的关注列表的id
      followListId: [],
      userId: null,
      tag: false,
      emptyImg: require('../assets/images/empty-image-default.png'),
      pullDown: false,
      loadMore: false,
      loadMoreFinished: false,
      currentPage: 1,
      total: 0,
      perPage: 20,
      scrollTop: 0,
      showSkeleton: true
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.token.token
    },
    // 是否有人关注
    hasFansData () {
      return this.fansList.length
    },
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  watch: {
    userId (newVal) {
      if (newVal) {
        this.getUserFollowsHandle(newVal)
        this.getMyfollow(newVal)
      }
    }
  },
  mounted () {
    // 缓存控制
    this.$store.commit('addCachedPages', 'MyFans')
    this.loadUserInfoHandle()
    this.$refs['xianyu-fans-container'].addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },

  beforeDestroy () {
    this.$refs['xianyu-fans-container'].removeEventListener('scroll', this.scrollTopHandle, true)
  },

  activated () {
    this.$refs['xianyu-fans-container'].scrollTop = this.scrollTop
  },
  methods: {
    // 根据用户的token加载用户的id信息
    async loadUserInfoHandle () {
      const result = await loadUserInfo()
      if (result.errno === 0) {
        this.userId = result.data._id
      }
    },

    // 加载我的粉丝
    async getUserFollowsHandle (id) {
      const result = await getMyFans(id, this.currentPage)
      if (result.errno === 0) {
        this.tag = true
        this.fansList = result.data
        this.total = result.total
        setTimeout(() => {
          this.showSkeleton = false
        }, 30)
      }
    },

    // 获取我的关注
    async getMyfollow (id) {
      // 1表示从第一页获取数据，2则是后端是否分页的区分
      const result = await userFollows(id, 1, '2')
      if (result.errno === 0) {
        result.data.forEach(item => {
          this.followListId.push(item._id)
        })
      }
    },

    // 取消关注 debounce节流
    cancelFollow: debounce(async function cancelFollow (id) {
      const result = await userCancelFollow(id)
      if (result.errno === 0) {
        const index = this.followListId.indexOf(id)
        // 存在才可以删除
        if (index > -1) {
          this.followListId.splice(index, 1)
        }
        this.$toast('取消关注成功')
      }
    }, 80),

    // 用户关注操作，debounce节流
    userFollowHandle: debounce(async function (id) {
      const result = await userFollow(id)
      if (result.errno === 0) {
        // 如果关注列表有的话不需要push
        if (!this.followListId.includes(id)) {
          this.followListId.push(id)
        }
        this.$toast('关注成功')
      }
    }, 80),

    // 下拉刷新
    async onPullDownRefresh () {
      this.currentPage = 1
      this.loadMoreFinished = false
      this.loadMore = false
      const result = await getMyFans(this.userId, this.currentPage)
      if (result.errno === 0) {
        this.fansList = result.data
        this.pullDown = false
        this.total = result.total
      }
    },

    // 上拉加载更多
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getMyFans(this.userId, ++this.currentPage)
      if (result.errno === 0) {
        this.loadMore = false
        this.fansList = [...this.fansList, ...result.data]
      }
    },

    // 记住滚动到顶部的距离
    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-fans-container'].scrollTop
    }
  },
  components: {
    FollowItem,
    PoemSkeleton
  }
}
</script>

<style scoped lang="scss">
.xianyu-fans-skeleton {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.xianyu-fans-container {
  position: fixed;
  background-color: #fff;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  /deep/ .van-empty {
    padding: 150px 0 100px 0;
  }

  &-container {
    margin-bottom: 20px;

    &-item {
      display: flex;
      align-items: center;
      padding: 18px;
      border-bottom: 1px solid rgba(68, 68, 68, .08);

      &-left {
        width: 270px;
        display: flex;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 8px;
        }

        &-user {
          width: 221px;
          display: flex;
          flex-direction: column;

          h1 {
            font-size: 16px;
            margin-bottom: 8px;
          }
          
          span {
            display: inline-block;
            width: 100%;
            font-size: 13px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      &-right {
        width: 80px;
        height: 28px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        background-color: #409fea;
        color: #fff;
        padding: 4px;
        box-sizing: border-box;
        color: #fff;
      }

      &-right.active {
        background-color: #fff;
        color: #409fea;
        border: 1px solid #409fea;
      }
    }

    &-item:last-of-type {
      border: none;
    }
  }
}
</style>
