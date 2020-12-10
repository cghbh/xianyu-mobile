<template>
  <div class="user-detail">
    <div class="user-detail-header" ref="header">
      <div class="user-detail-header-left">
        <i ref="i" class="iconfont icon-left" @click="$router.go(-1)"></i>
        <span ref="user" class="user-name">咸鱼一条</span>
      </div>
      <div class="edit-user" ref="edit">编辑资料</div>
    </div>
    <div class="user-detail-img" id="img">
      <!-- <img src="../assets/images/095314-150898279496ba.jpg" alt=""> -->
    </div>

    <!-- 用户信息展示 -->
    <div class="user-detail-info">
      <div class="user-detail-info-avatar">
        <img src="../assets/images/courage.png">
      </div>
      <div class="user-detail-info-set">
        <button v-if="true">编辑资料</button>
        <button v-else>关注</button>
      </div>
      <h1 class="user-detail-name">名称</h1>
      <p class="personal_sign">我的人参我自己煮宰！</p>
      <div class="number">
        <span><b>0</b>粉丝</span>
        <span><b>0</b>关注</span>
        <span><b>0</b>获赞</span>
      </div>
    </div>
    <divide-area></divide-area>

    <!-- 用户的动态与收藏部分 -->
    <div class="user-dynamic">
      <van-sticky offset-top="49">
        <van-tabs v-model="activeName" animated swipeable>
          <van-tab title="动态" name="a"><div style="height: 1000px;background-color: skyblue;">1</div></van-tab>
          <van-tab title="收藏" name="b"><div style="height: 1000px;background-color: skyblue;">2</div></van-tab>
        </van-tabs>
      </van-sticky>

    </div>
  </div>
</template>

<script>
import DivideArea from '../components/PublicComponents/DivideArea.vue'
export default {
  name: 'UserDetail',
  data () {
    return {
      activeName: 'a'
    }
  },
  methods: {
    // 屏幕滚动事件的监听操作
    screenScroll () {
      const img = document.getElementById('img')
      // 图片的高度
      const imgHeight = img.offsetHeight
      // 滚动的高度
      const height = document.body.scrollTop || document.documentElement.scrollTop
      if (height > imgHeight) {
      } else if (height > 10 && height <= imgHeight) {
        this.$refs.header.style.backgroundColor = `rgba(255, 255, 255, ${height / imgHeight})`
        this.$refs.user.style.opacity = height / imgHeight
        this.$refs.edit.style.opacity = height / imgHeight
        this.$refs.i.style.filter = 'invert(100%)'
        this.$refs.i.style.opacity = height / imgHeight
        this.$refs.header.style.boxShadow = '0px 0px 0px 1px rgba(138, 138, 138, .01)'
      } else if (height <= 10) {
        this.$refs.i.style.color = '#fff'
        this.$refs.i.style.filter = ''
        this.$refs.i.style.opacity = 1
        this.$refs.user.style.opacity = 0
        this.$refs.edit.style.opacity = 0
        this.$refs.header.style.backgroundColor = 'transparent'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.screenScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.screenScroll)
  },
  components: {
    DivideArea
  }
}
</script>

<style scoped lang="scss">
.user-detail {
  &-header {
    position: fixed;
    width: 100%;
    display: flex;
    height: auto;
    align-items: center;
    height: 50px;
    padding: 0 20px 0 10px;
    box-sizing: border-box;
    justify-content: space-between;
    z-index: 10000;

    &-left {
      display: flex;
      align-items: center;
      .iconfont {
        color: #fff;
        font-size: 24px;
        margin-right: 5px;
      }

      .user-name {
        color: #000;
        font-size: 16px;
        opacity: 0;
      }
    }

    .edit-user {
      font-size: 16px;
      color: #409fea;
      opacity: 0;
    }
  }

  &-img {
    width: 100%;

    img {
      width: 100%;
      display: block;
    }
  }

  .user-detail-name {
    margin-top: 18px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 28px;
  }

  .personal_sign {
    padding-left: 28px;
    margin-top: 15px;
    font-size: 16px;
  }

  .number {
    padding-left: 28px;
    margin-top: 18px;
    font-size: 15px;

    span {
      margin-right: 10px;

      b {
        font-weight: 700;
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }

  &-info {
    position: relative;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 28px;

    &-avatar {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      position: absolute;
      top: -40px;
      left: 25px;
      background-color: #fff;
      padding: 3px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    &-set {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;

      button {
        padding: 0px 10px;
        height: 32px;
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #666;
        border-radius: 32px;
        line-height: 32px;
        color: #666;
      }
    }
  }
}
</style>
