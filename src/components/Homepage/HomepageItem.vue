<template>
  <div class="homepage-item" :class="{ 'first': !isFirst }">
    <div class="homepage-item-user">
      <img src="../../assets/images/logo.png">
      <div class="homepage-item-user-name">
        <h1>好好先生</h1>
        <h3>一分钟前发布</h3>
      </div>
    </div>
    <div class="homepage-item-area">
      <p @click="$router.push('/dynamic-detail/1')">事业常成于坚忍，毁于急躁。我在沙漠中曾亲眼看见，匆忙的旅人落在从容的后边；疾驰的骏马落在后头，缓步的骆驼继续向前。</p>
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
    <div class="homepage-item-operation">
      <!-- 一像素边框的实现 -->
      <div class="one-px"></div>
      <div class="zan-icon">
        <i v-if="false" class="iconfont icon-dianzan"></i>
        <i class="iconfont icon-dianzan1"></i>
        <span>100</span>
      </div>
      <div class="comment-icon" @click="$router.push('/dynamic-detail/1')">
        <i class="iconfont icon-pinglun"></i>
        <span>100</span>
      </div>
      <div class="collect-icon">
        <i v-if="false" class="iconfont icon-shoucang1"></i>
        <i class="iconfont icon-shoucang"></i>
        <span>1000</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  name: 'HomepageItem',
  props: {
    isFirst: {
      type: Boolean,
      default: false
    },
    itemValue: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
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
    showPreview (index) {
      console.log(index)
      ImagePreview({
        images: this.imageArray,
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.homepage-item {
  padding: 10px 15px;
  padding-bottom: 0;
  background-color: #fff;
  &-user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
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

  &-area {
    p {
      font-size: 15px;
      line-height: 24px;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, .9);
    }
  }

  &-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 5px;
    margin-top: 10px;
    position: relative;

    div {
      display: flex;
      align-items: center;

      .iconfont {
        margin-right: 3px;
      }

      .iconfont,
      span {
        color: rgba(0, 0, 0, .7);
      }

      .icon-dianzan,
      .icon-shoucang1 {
        color: #409fea;
      }

    }

    .one-px {
      position: absolute;
      height: 1px;
      left: -5px;
      right: -5px;
      background-color: rgba(138, 138, 138, .2);
      top: 0;
      -webkit-transform: scaleY(.5);
      transform:scaleY(.5);
    }
  }
}

.homepage-item.first {
  margin-top: 10px;
}

.homepage-item /deep/ .van-image {
  margin-right: 5px;
  margin-bottom: 3px;
}
</style>
