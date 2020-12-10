<template>
  <!-- 我关注的 -->
  <div class="xianyu-fellowing">
    <back-top title="我的关注"></back-top>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="xianyu-fellowing-container" v-if="hasFellowData">
        <van-list
          v-model="loading"
          :finished="finished"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoad"
        >
          <div class="xianyu-fellowing-container-item" v-for="item in 10" :key="item">
            <div class="xianyu-fellowing-item-left">
              <img src="../assets/images/logo.png">
              <div class="xianyu-fellowing-item-left-user">
                <h1>用户昵称</h1>
                <span>用户个性签名</span>
              </div>
            </div>
            <!-- <div class="xianyu-fellowing-item-right"  @click="cancelFellow">{{ isFellowed ? '已关注': '关注'}}</div> -->
            <div class="xianyu-fellowing-item-right" @click="cancelFollow(item._id)" v-if="item.follow">取消关注</div>
            <div class="xianyu-fellowing-item-right active" :class="{ 'active': !item.follow }" @click="userFollowHandle(item._id)" v-else>关注</div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-empty v-if="!hasFellowData" description="你还没有关注过一个人哟......" />
  </div>
</template>

<script>
import { userFollows, userCancelFollow, userFollow } from '@/api/user.js'
export default {
  name: 'MyCollection',
  data () {
    return {
      active: '',
      isFellowed: false,
      hasFellowData: true,
      list: [],
      loading: false,
      finished: true,
      isLoading: false
    }
  },
  mounted () {
    if (this.$store.state.userInfo._id) {
      this.getFollowingList(this.$store.state.userInfo._id)
    }
  },
  methods: {
    cancelFellow () {
      this.isFellowed = !this.isFellowed
      if (!this.isFellowed) {
        this.$dialog.confirm({
          title: '确定要取消关注XXX吗？',
          width: '280px',
          confirmButtonText: '取消关注',
          cancelButtonText: '放弃'
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onLoad () {
      // setTimeout(() => {
      //   for (let i = 0; i < 8; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 获取用户的关注
    async getFollowingList (id) {
      const data = await userFollows(id)
      if (data.code === 200) {
        this.list = data.data
        this.list.map(item => {
          this.$set(item, 'follow', true)
        })
      }
    },
    // 取消关注
    async cancelFollow (id) {
      const data = await userCancelFollow(id)
      if (data.code === 200) {
        const index = this.list.findIndex(item => item._id === id)
        if (index > -1) {
          this.list[index].follow = false
        }
        this.$toast({
          message: '取消关注成功！',
          duration: 1500
        })
      }
    },
    async userFollowHandle (id) {
      const data = await userFollow(id)
      if (data.code === 200) {
        const index = this.list.findIndex(item => item._id === id)
        if (index > -1) {
          this.list[index].follow = true
        }
        this.$toast({
          message: '关注成功！',
          duration: 1500
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
  // 这个根据是否有内容决定是否需要显示100%的高度
  height: 100%;
  overflow: auto;
  /deep/ .van-empty {
    height: 100%!important;
  }
  background-color: #fff;
  &-container {
    margin-top: 46px;
    margin-bottom: 20px;
  }
}
</style>
