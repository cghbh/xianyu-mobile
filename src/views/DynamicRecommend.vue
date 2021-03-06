<template>
  <div 
    class="xianyu-dynamic-recommend-r" 
    ref="xianyu-dynamic-recommend-r" 
    id="xianyu-dynamic-recommend-r">
    <dynamic-skeleton v-if="skeletonLoading"></dynamic-skeleton>
    <van-pull-refresh
      v-model="pullDown"
      @refresh="onPullDownRefresh"
      v-if="recommendDynamics.length > 0"
      loosing-text="别老拽着,快放开我"
      loading-text="正在刷新中"
      success-text="刷新成功">
        <van-list
          v-model="loadMore"
          :finished="loadMoreFinished"
          :immediate-check="false"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoadMoreHandle"
        >
          <dynamic-item
            v-for="(item, index) in recommendDynamics"
            :key="item._id + Math.random()"
            :is-first="index === 0"
            :item-value="item"
            :is-like="isLogin && userZanedId.includes(item._id)"
            @unlike="userCancelZan(item._id)"
            @like="userZanHandle(item._id)"
            @operate="recommendOperate"
          />
        </van-list>
      </van-pull-refresh>
    <van-empty v-cloak v-show="showNoRecommend && !showDynamicsTag" description="什么内容都没有哟" />
  </div>
</template>

<script>
import { getDynamics } from '@/api/dynamic.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
import { debounce } from 'lodash' 
import { unlikeDynamics, likeDynamics } from '@/api/user.js'
import DynamicSkeleton from '../components/Skeleton/DynamicSkeleton'
export default {
  name: 'DynamicRecommend',
  data () {
    return {
      // 下拉刷新的状态
      pullDown: false,
      // 是否点赞的状态
      isLike: true,
      // 避免出现没有数据的空状态闪烁
      showDynamicsTag: true,
      currentPage: 1,
      perPage: 30,
      // 上拉加载的状态
      loadMore: false,
      // 上拉加载完成状态
      loadMoreFinished: false,
      scrollTop: 0,
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 控制骨架屏的显示与隐藏
      skeletonLoading: true
    }
  },
  
  computed: {
    showNoRecommend () {
      return this.recommendDynamics.length <= 0
    },
    totalPage () {
      return Math.ceil(this.total / this.perPage)
    },
    userId () {
      return this.$store.state.token.userId
    },
    isLogin () {
      return this.$store.state.token.token
    },

    // 推荐的动态
    recommendDynamics () {
      return this.$store.state.recommendDynamics.data
    },

    // 总的数据条数
    total () {
      return this.$store.state.recommendDynamics.total
    },

    // 从vuex取得所有点赞过的动态id
    userZanedId () {
      return this.$store.state.loginUserZanDynamicsId
    }
  },

  mounted () {
    this.getRecommendDynamics()
    this.$refs['xianyu-dynamic-recommend-r'] && this.$refs['xianyu-dynamic-recommend-r'].addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },
  activated () {
    this.$refs['xianyu-dynamic-recommend-r'] && (this.$refs['xianyu-dynamic-recommend-r'].scrollTop = this.scrollTop)
  },

  beforeDestroy () {
    this.$refs['xianyu-dynamic-recommend-r'] && this.$refs['xianyu-dynamic-recommend-r'].removeEventListener('scroll', this.scrollTopHandle, true)
  },

  methods: {
    async getRecommendDynamics () {
      const result = await getDynamics(0, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.$store.commit('modifyRecommendDynamics', { data: result.data, total: result.total })
        this.recommendDynamics.length > 0 ? (this.showDynamicsTag = true) : (this.showDynamicsTag = false)
        this.skeletonLoading = false
      }
    },

    // 下拉刷新
    async onPullDownRefresh () {
      this.currentPage = 1
      this.loadMore = false
      this.loadMoreFinished = false
      const result = await getDynamics(0, this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.$store.commit('modifyRecommendDynamics', { data: result.data, total: result.total })
        this.pullDown = false
        this.recommendDynamics.length > 0 ? (this.showDynamicsTag = true) : (this.showDynamicsTag = false)
        this.$toast('刷新成功')
      }
    },

    // 上拉加载操作
    async onLoadMoreHandle () {
      if (this.totalPage <= this.currentPage) {
        this.loadMoreFinished = true
        return
      }
      const result = await getDynamics(0, ++this.currentPage, this.perPage)
      if (result.errno === 0) {
        this.$store.commit('modifyRecommendDynamics', { data: [...this.recommendDynamics, ...result.data], total: result.total })
        this.loadMore = false
      }
    },

    // 滚动距离记录
    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-dynamic-recommend-r'].scrollTop
    },

    // 取消点赞
    async userCancelZan (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdIndex = this.userZanedId.indexOf(id)
        const index = this.recommendDynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          const newDynamic = JSON.parse(JSON.stringify(this.recommendDynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.recommendDynamics, index, newDynamic)
          this.userZanedId.splice(zanIdIndex, 1)
        }
      }
    },

    // 用户点赞操作
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
          const index = this.recommendDynamics.findIndex(item => item._id === id)
          const newDynamic = JSON.parse(JSON.stringify(this.recommendDynamics[`${index}`]))
          newDynamic.zan_number++
          this.$set(this.recommendDynamics, index, newDynamic)
        }
      }
    },

    // 推荐内容的操作
    recommendOperate (value) {
      this.$emit('recommend', value)
    }
  },

  components: {
    DynamicItem,
    DynamicSkeleton
  }
}
</script>

<style scoped lang="scss">
.wrapper-skeleton {
  /deep/ .van-skeleton__content {
    padding-top: 30px;

    .van-skeleton__row {
      height: 30px;
    }

    .van-skeleton__row:last-of-type{
      width: 100%!important;
    }
  }
}
.xianyu-dynamic-recommend-r {
  overflow-y: auto;
  background-color: #F0F5FB;
  height: calc(100vh - 94px);
}
</style>
