<template>
  <div class="homepage-item" :class="{ 'first': isFirst }">
      <div class="homepage-item-user">
        <xianyu-image 
          :img="itemValue.publisher.avatar_url"
          :width="50"
          :height="50"
          round
        />
        <div class="homepage-item-user-name">
          <h1>{{ itemValue.publisher.nickname }}</h1>
          <h3>{{ itemValue.createdAt | timeformat }}</h3>
        </div>
      </div>

      <div class="homepage-item-area" @click="goDynamicDetail" ref="homepage-item-area">
        <p>{{ itemValue.content }}</p>

        <div class="img-preview-container">
          <xianyu-image
            @click="showPreview(index, itemValue.avatar_url)"
            v-for="(item, index) in itemValue.avatar_url"
            :width="100"
            :height="100"
            :img="item"
            :key="item"
          />
        </div>
      </div>

      <div class="homepage-item-operation">
        <!-- 一像素边框的实现 -->
        <div class="one-px"></div>
        <div class="zan-icon">
          <i @click="$emit('unlike')" v-show="isLike" class="iconfont icon-dianzan"></i>
          <i v-show="!isLike" @click="$emit('like')" class="iconfont icon-dianzan1"></i>
          <span class="dynamic-exble-style">{{ itemValue.zan_number > 999 ? '999+': itemValue.zan_number }}</span>
        </div>
        <div class="comment-icon" @click="$router.push(`/dynamic-detail/${itemValue._id}`)">
          <i class="iconfont icon-pinglun"></i>
          <span class="dynamic-exble-style">{{ itemValue.comment_number > 999 ? '999+': itemValue.comment_number }}</span>
        </div>
        <div class="collect-icon">
          <i v-if="isCollect" @click="$emit('uncollect')" class="iconfont icon-shoucang1"></i>
          <i v-else class="iconfont icon-shoucang" @click="$emit('collect')"></i>
          <span class="dynamic-exble-style">{{ itemValue.collect_number > 999 ? '999+': itemValue.collect_number }}</span>
        </div>
      </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import XianyuImage from '../Image/index'
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
    },
    isLike: {
      type: Boolean,
      default: false
    },
    isCollect: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      img: require('../../assets/images/courage.png')
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },

    // 获取已登陆用户的id，判断当前是否点赞
    userId () {
      return this.$store.state.token.userId
    }
  },

  methods: {
    showPreview (index, urls) {
      ImagePreview({
        images: urls,
        startPosition: index,
        closeable: true
      })
    },

    // 点击非图片的区域，跳转到动态的详情页面
    goDynamicDetail (e) {
      if (![...e.target.classList].includes('xianyu-image-component-img')) {
        this.$router.push(`/dynamic-detail/${this.itemValue._id}`)
      }
    }
  },

  components: {
    XianyuImage
  }
}
</script>

<style scoped lang="scss">
.homepage-item {
  padding: 10px 15px;
  padding-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;

  /deep/ .van-skeleton {
    padding: 0;
  }

  /deep/ .van-skeleton__row {
    width: 100%!important;
  }

  /deep/ .van-skeleton__avatar {
    margin-bottom: 8px;
  }

  .skeleton-bottom {
    padding-bottom: 10px;
  }

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
      margin-left: 5px;

      h1 {
        margin-bottom: 8px;
        font-size: 16PX;
        color: rgba(0, 0, 0, .8);
      }

      h3 {
        font-size: 12PX;
        color: rgba(0, 0, 0, .4);
      }
    }
  }

  &-area {
    p {
      font-size: 15PX;
      line-height: 25px;
      margin-bottom: 15px;
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

    .zan-icon,
    .comment-icon,
    .collect-icon {
      flex: 1;
      display: flex;
    }

    .zan-icon {
      justify-content: flex-start;
    }

    .comment-icon {
      justify-content: center;
    }

    .collect-icon {
      justify-content: flex-end;
    }

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
      top: 0;
      -webkit-transform: scaleY(.5);
      transform:scaleY(.5);
    }
  }
}

.homepage-item.first {
  margin-top: 8px;
}

.homepage-item /deep/ .van-image {
  margin-right: 5px;
  margin-bottom: 3px;
}

.dynamic-exble-style {
  font-size: 14px;
}

.img-preview-container {
  display: flex;
}
</style>
