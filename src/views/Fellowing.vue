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
          <div class="xianyu-fellowing-container-item" v-for="item in list" :key="item">
            <div class="xianyu-fellowing-item-left">
              <img src="../assets/images/logo.png">
              <div class="xianyu-fellowing-item-left-user">
                <h1>林外有山</h1>
                <span>前端开发，优秀CSS开发者代码测试，内容必定移除，溢出隐藏处理</span>
              </div>
            </div>
            <div class="xianyu-fellowing-item-right" :class="{ 'active': isFellowed }" @click="cancelFellow">{{ isFellowed ? '已关注': '关注'}}</div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-empty v-if="!hasFellowData" description="你还没有关注过一个人哟......" />
  </div>
</template>

<script>
export default {
  name: 'MyCollection',
  data () {
    return {
      active: '',
      isFellowed: false,
      hasFellowData: true,
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      loading: false,
      finished: false,
      isLoading: false
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
      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          this.list.push(this.list.length + 1)
        }
      
        // 加载状态结束
        this.loading = false
      
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
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
      width: 291px;
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
      width: 60px;
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
