<template>
  <div class="homepage-item" :class="{ 'first': !isFirst }">
      <div class="homepage-item-user">
        <van-image width="50" height="50" fit="cover" round :src="itemValue.publisher.avatar_url"/>
        <div class="homepage-item-user-name">
          <h1>{{ itemValue.publisher.nickname }}</h1>
          <h3>{{ itemValue.createdAt | timeformat }}</h3>
        </div>
      </div>
      <div class="homepage-item-area" @click="goDynamicDetail" ref="homepage-item-area">
        <!-- @click="$router.push(`/dynamic-detail/${itemValue._id}`)" -->
        <p>{{ itemValue.content }}</p>
        <van-image
          @click="showPreview(index, itemValue.avatar_url)"
          width="100"
          height="100"
          fit="cover"
          :only-id="item"
          v-for="(item, index) in itemValue.avatar_url"
          :src="item"
          :key="item">
        </van-image>
      </div>
      <div class="homepage-item-operation">
        <!-- 一像素边框的实现 -->
        <div class="one-px"></div>
        <div class="zan-icon">
          <i @click="$emit('unlike')" v-if="isLike" class="iconfont icon-dianzan"></i>
          <i v-else @click="$emit('like')" class="iconfont icon-dianzan1"></i>
          <span>{{ itemValue.zan_number }}</span>
        </div>
        <div class="comment-icon" @click="$router.push(`/dynamic-detail/${itemValue._id}`)">
          <i class="iconfont icon-pinglun"></i>
          <span>{{ itemValue.comment_number }}</span>
        </div>
        <div class="collect-icon">
          <i v-if="false" class="iconfont icon-shoucang1"></i>
          <i class="iconfont icon-shoucang"></i>
          <span>{{ itemValue.collect_number }}</span>
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
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log(this.itemValue, 'itemValue')
  },
  computed: {
    user_login_id () {
      return this.$store.state.userInfo._id
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
      if (![...e.target.classList].includes('van-image__img')) {
        this.$router.push(`/dynamic-detail/${this.itemValue._id}`)
      }
    }
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
