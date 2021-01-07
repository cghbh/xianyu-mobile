<template>
  <div class="dynamic-item">
    <div class="dynamic-item-user">
      <div class="dynamic-item-user-container">
        <xianyu-image 
        :img="itemValue.publisher.avatar_url"
        :width="50"
        :height="50"
        round
      />
      <div class="dynamic-item-user-about">
        <h1>{{ itemValue.publisher.nickname }}</h1>
        <h3>{{ itemValue.createdAt | timeformat }}</h3>
      </div>
      </div>
      <i class="iconfont icon-gengduo" @click="userOperate"></i>
    </div>

    <div class="dynamic-item-area" @click="goDynamicDetail" ref="homepage-item-area">
      <p v-html="itemValue.content"></p>

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

    <div class="dynamic-item-operation">
      <div class="share-icon">
        <i class="iconfont icon-fenxiang"></i>
      </div>
      
      <div class="comment-icon" @click="$router.push(`/dynamic-detail/${itemValue._id}`)">
        <i class="iconfont icon-pinglun"></i>
        <span class="dynamic-exble-style">{{ itemValue.comment_number > 999 ? '999+': itemValue.comment_number }}</span>
      </div>
      <div class="zan-icon">
        <img src="//at.alicdn.com/t/font_2139142_y6mqd5ktj7.css" alt="">
        <i @click="$emit('unlike')" v-show="isLike" class="iconfont icon-dianzan"></i>
        <i v-show="!isLike" @click="$emit('like')" class="iconfont icon-dianzan1"></i>
        <span class="dynamic-exble-style">{{ itemValue.zan_number > 999 ? '999+': itemValue.zan_number }}</span>
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
    // 如果是在我的动态里面，则显示删除动态的按钮选择
    deleteOperate: {
      type: Boolean,
      default: false
    },
    // 用来个人中心展示是否是隐私动态
    isPrivate: {
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
    },

    // 展示更多按钮的操作
    userOperate () {
      this.$emit('operate', { d_id: this.itemValue._id, nickname: this.itemValue.publisher.nickname, content: this.itemValue.content, u_id: this.itemValue.publisher._id })
    }
  },

  components: {
    XianyuImage
  }
}
</script>

<style scoped lang="scss">
.dynamic-item {
  padding: 15px;
  background-color: #fff;
  margin: 15px 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px #eaeaea;

  &-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &-container {
      display: flex;
      align-items: center;

      h1 {
        font-size: 17px;
        color: #000;
        font-weight: 500;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        margin-bottom: 10px;
      }

      h3 {
        font-size: 13px;
        color: #aaa;
      }
    }

    .iconfont.icon-gengduo {
      position: absolute;
      font-size: 18px;
      top: 5px;
      right: 0;
      color: #888;
    }
  }

  &-area {
    p {
      font-size: 17px;
      margin: 10px 0 15px 0;
      line-height: 28px;
    }
  }

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
    justify-content: space-between;
    margin-bottom: 10px;

    &-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

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

    .xianyu-delete-operate {
      margin-right: 5px;
      display: flex;
      align-items: center;

      &-private {
        display: flex;
        align-items: center;

        .iconfont.icon-22suo {
          margin-right: 5px;
          font-size: 15px;
          color: #666;
        }

        span {
          font-size: 13px;
          color: #666;
          margin-right: 5px;
        }
      }

      .delete-opt {
        color: #666;
        margin-top: -15px;
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
    padding: 0 5px;
    margin-top: 10px;
    position: relative;

    .zan-icon,
    .comment-icon,
    .share-icon {
      flex: 1;
      display: flex;
    }

    .zan-icon {
      justify-content: flex-end;
    }

    .comment-icon {
      justify-content: center;
    }

    .share-icon {
      justify-content: flex-start;
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

.dynamic-item.first {
  margin-top: 8px;
}

.dynamic-item /deep/ .van-image {
  margin-right: 5px;
  margin-bottom: 3px;
}

.dynamic-item /deep/ .van-overlay {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999999;
}

.dynamic-exble-style {
  font-size: 14px;
}

.img-preview-container {
  display: flex;
}
</style>
