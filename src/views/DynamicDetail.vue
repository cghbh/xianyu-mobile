<template>
  <div class="dynamic-detail">
    <van-sticky>
      <van-nav-bar title="动态详情" left-text="返回" left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    
    <div class="dynamic-detail-user">
      <div class="dynamic-detail-user-container">
        <img src="../assets/images/logo.png">
        <div class="dynamic-detail-user-name">
          <h1>好好先生</h1>
          <h3>一分钟前发布</h3>
        </div>
      </div>
      <div @click="focus" class="dynamic-detail-user-focus" v-if="!isFocus">
        <i class="iconfont icon-jia"></i>
        <span>关注</span>
      </div>
    </div>
    <div class="dynamic-detail-content">
      <p>事业常成于坚忍，毁于急躁。我在沙漠中曾亲眼看见，匆忙的旅人落在从容的后边；疾驰的骏马落在后头，缓步的骆驼继续向前。</p>
      <van-image
        @click="showPreview(index)"
        width="100"
        height="100"
        fit="cover"
        lazy-load
        v-for="(item, index) in imageArray"
        :src="item"
        :key="item">
      </van-image>
    </div>
    <comment-list></comment-list>
    <bottom-comment></bottom-comment>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import BottomComment from '../components/BottomComment/index.vue'
import CommentList from '../components/BottomComment/comment.vue'
export default {
  name: 'DynamicDetail',
  data () {
    // 是否已经关注了
    return {
      isFocus: false,
      imageArray: [
        'http://192.168.43.223:3000/uploads/upload_59f9ac1292ce27b47b988412d1830469.jpg',
        'http://192.168.43.223:3000/uploads/upload_53fc3c51879bc80a035153fc67eb14cf.jpg',
        'http://192.168.43.223:3000/uploads/upload_b2a59756fe5e4a4ce4c1508ce6972ba2.jpg',
        'http://192.168.43.223:3000/uploads/upload_e3e92f1c6aa27087b2843cf9a337054f.jpg',
        'http://192.168.43.223:3000/uploads/upload_3959eebb4704944914e4bd8967ba22fd.jpg'
      ]
    }
  },
  methods: {
    focus () {
      this.isFocus = true
      this.$toast('已添加关注')
    },
    showPreview (index) {
      ImagePreview({
        images: this.imageArray,
        startPosition: index,
        closeable: true
      })
    }
  },
  components: {
    BottomComment,
    CommentList
  }
}
</script>

<style scoped lang="scss">
.dynamic-detail {
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 50px;

  /deep/ .van-image {
    margin-right: 5px;
    margin-bottom: 3px;
  }
  &-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 10px 8px;

    .dynamic-detail-user-container {
      display: flex;
      align-items: center;
    }

    &-focus {
      color: #409fea;
      .iconfont {
        font-size: 14px;
        margin-right: 3px;
      }
      span {
        font-size: 16px;
      }
    }

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 12px;
    }

    &-name {
      h1 {
        margin-bottom: 8px;
        font-size: 16px;
        color: rgba(0, 0, 0, .8);
      }
      h3 {
        font-size: 13px;
        color: rgba(0, 0, 0, .6);
      }
    }
  }
  &-content {
    padding: 0 10px;
    p {
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, .9);
    }
  }
}
</style>
