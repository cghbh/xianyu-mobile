<template>
  <div class="xianyu-dynamic-latest-r" ref="xianyu-dynamic-latest-r">
    <van-pull-refresh
      v-model="pullDown"
      v-if="latestDynamics.length > 0"
      @refresh="onLatestRefresh"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
      <div class="homepage-newest">
        <van-list
          v-model="loadMore"
          :finished="loadMoreFinished"
          :immediate-check="false"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoadMoreHandle">
          <dynamic-item
            v-for="(item, index) in latestDynamics"
            :key="item._id"
            :is-first="index === 0"
            :item-value="item"
            :is-collect="isLogin && userCollectedId.includes(item._id)"
            :is-like="isLogin && userZanedId.includes(item._id)"
            @unlike="userCancelZanHandle(item._id)"
            @like="userZanHandle(item._id)"
            @uncollect="userCancelCollect(item._id)"
            @collect="userCollectHandle(item._id)"
            @operate="latestOperate"
          />
        </van-list>
      </div>
    </van-pull-refresh>
    <van-empty v-if="showNoLatest && showTag" description="什么内容都没有" />
  </div>
</template>

<script>
import { getDynamics } from '@/api/dynamic.js'
import { unlikeDynamics, likeDynamics, userCancelCollectDynamics, userCollectDynamics } from '@/api/user.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
import { debounce } from 'lodash'
export default {
  name: 'DynamicLatest',
  data () {
    return {
      // latestDynamics: [],
      // 下拉刷新
      pullDown: false,
      currentPage: 1,
      // 总的页数
      // total: 0,
      // 每页展示的数据
      perPage: 30,
      // 避免初始情况下数据加载出现没有数据的空白展示页
      showTag: false,
      // 上拉加载更多
      loadMore: false,
      // 上拉加载结束
      loadMoreFinished: false,
      // 滚动高度纪录
      scrollTop: 0,
      userCollectedId: []
    }
  },
  mounted () {
    this.getLatestDynamics()
    this.$refs['xianyu-dynamic-latest-r'].addEventListener('scroll', debounce(this.pageScrollTop, 30))
  },

  watch: {
    latestDynamics (newVal) {
      if (newVal.length <= 0) {
        this.showTag = true
      } else {
        this.showTag = false
      }
    }
  },

  activated () {
    this.$refs['xianyu-dynamic-latest-r'].scrollTop = this.scrollTop
  },

  beforeDestroy () {
    this.$refs['xianyu-dynamic-latest-r'].removeEventListener('scroll', this.pageScrollTop, true)
  },

  computed: {
    showNoLatest () {
      return this.latestDynamics.length <= 0
    },
    // 总页数
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    },
    // 用户的id
    userId () {
      return this.$store.state.token.userId
    },
    // 用户的登陆状态
    isLogin () {
      return this.$store.state.token.token
    },

    latestDynamics () {
      return this.$store.state.latestDynamics.data
    },

    total () {
      return this.$store.state.latestDynamics.total
    },

    // 从vuex取得所有点赞过的动态id
    userZanedId () {
      return this.$store.state.loginUserZanDynamicsId
    }
  },
  methods: {
    // 获取最新的动态
    async getLatestDynamics () {
      const result = await getDynamics(1, this.currentPage)
      if (result.errno === 0) {
        this.$store.commit('modifyLatestDynamics', { data: result.data, total: result.total })
        if (this.latestDynamics.length <= 0) {
          this.showTag = true
        }
      }
    },
    
    // 纪录滚动的高度
    pageScrollTop () {
      this.scrollTop = this.$refs['xianyu-dynamic-latest-r'].scrollTop
    },
    
    // 下拉刷新
    async onLatestRefresh () {
      this.currentPage = 1
      const result = await getDynamics(1, this.currentPage)
      if (result.errno === 0) {
        this.$store.commit('modifyLatestDynamics', { data: result.data, total: result.total })
        this.pullDown = false
        this.$toast({ message: '刷新成功', duration: 800 })
      }
    },

    // 上拉加载更多
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getDynamics(1, ++this.currentPage)
      if (result.errno === 0) {
        this.$store.commit('modifyLatestDynamics', { data: [...this.latestDynamics, ...result.data], total: result.total })
        this.loadMore = false
      }
    },

    // 取消点赞
    async userCancelZanHandle (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdIndex = this.userZanedId.indexOf(id)
        const index = this.latestDynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.latestDynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.latestDynamics, index, newDynamic)
          this.userZanedId.splice(zanIdIndex, 1)
        }
      }
    },

    // 点赞操作
    async userZanHandle (id) {
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
        const result = await likeDynamics(id)
        if (result.errno === 0 && !this.userZanedId.includes(id)) {
          this.userZanedId.push(id)
          const index = this.latestDynamics.findIndex(item => item._id === id)
          const newDynamic = JSON.parse(JSON.stringify(this.latestDynamics[`${index}`]))
          newDynamic.zan_number++
          this.$set(this.latestDynamics, index, newDynamic)
        }
      }
    },

    // 取消收藏
    async userCancelCollect (id) {
      const result = await userCancelCollectDynamics(id)
      if (result.errno === 0) {
        const collectIdIndex = this.userCollectedId.indexOf(id)
        const index = this.latestDynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (collectIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.latestDynamics[`${index}`]))
          newDynamic.collect_number--
          this.$set(this.latestDynamics, index, newDynamic)
          this.userCollectedId.splice(collectIdIndex, 1)
        }
      }
    },

    // 收藏，先判断是否登陆
    async userCollectHandle (id) {
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
        const result = await userCollectDynamics(id)
        if (result.errno === 0 && !this.userCollectedId.includes(id)) {
          this.userCollectedId.push(id)
          const index = this.latestDynamics.findIndex(item => item._id === id)
          const newDynamic = JSON.parse(JSON.stringify(this.latestDynamics[`${index}`]))
          newDynamic.collect_number++
          this.$set(this.latestDynamics, index, newDynamic)
        }
      }
    },

    // 最新动态的操作
    latestOperate (value) {
      this.$emit('latest', value)
    }
  },
  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-dynamic-latest-r {
  height: calc(100vh - 94px);
  overflow-y: auto;
  background-color: #F0F5FB;
}
</style>
