<template>
  <!-- 我关注的 -->
  <div class="xianyu-fellowing">
    <van-nav-bar fixed title="我的关注" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <div class="back-container">
          <i class="iconfont icon-left"></i>
        </div>
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="xianyu-fellowing-container" v-if="hasFellowData">
        <van-list
          v-model="loading"
          :finished="finished"
          loading-text="正在飞奔中......"
          finished-text="别刷了,真的没有啦......"
          @load="onLoad"
        >
          <div class="xianyu-fellowing-container-item" v-for="item in list" :key="item._id">
            <div class="xianyu-fellowing-item-left">
              <img src="../assets/images/logo.png">
              <div class="xianyu-fellowing-item-left-user">
                <h1>{{ item.nickname }}</h1>
                <span>{{ item.personal_sign }}</span>
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
import { userFollowing, userCancelFollow, userFollow } from '@/api/user.js'
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
    console.log(this.$store.state.userInfo._id, 'id')
    if (this.$store.state.userInfo._id) {
      this.getFollowingList(this.$store.state.userInfo._id)
    }
  },
  methods: {
    cancelFellow () {
      this.isFellowed = !this.isFellowed
      console.log(this.isFellowed)
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
      const data = await userFollowing(id)
      if (data.code === 200) {
        this.list = data.data
        this.list.map(item => {
          this.$set(item, 'follow', true)
        })
        // this.$set(this.list, 'follow', true)
        console.log(this.list, 'list')
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
      console.log(data)
      // console.log(userCancelFollow)
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
    &-item {
      display: flex;
      align-items: center;
      padding: 18px;
      border-bottom: 1px solid rgba(68, 68, 68, .08);
    }
    &-item:last-of-type {
      border: none;
    }
  }

  &-item {
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
      background-color: rgba(0, 0, 0, .1);
      padding: 4px;
      box-sizing: border-box;
      color: #666;
    }

    &-right.active {
      background-color: #fff;
      color: #409fea;
      border: 1px solid #409fea;
    }
  }
}
</style>
