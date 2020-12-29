<template>
  <div class="comment-sub-item" :style="{ 'margin-bottom': marginbottom + 'px' }">
    <img :src="comment.commentator && comment.commentator.avatar_url">
    <div class="item-container">
      <div class="item-container-user">
        <div class="item-container-user-left">
          <h1>{{ comment.commentator && comment.commentator.nickname }}</h1>
          <p>{{ comment.created }}</p>
        </div>
        <div class="item-container-user-right">
          <span>{{ comment.zan_number }}</span>
          <i class="iconfont icon-dianzan active" v-if="false"></i>
          <i class="iconfont icon-dianzan1" v-if="true"></i>
        </div>
      </div>
      <div class="item-container-comment" :class="{ 'borderbottom': borderbottom }">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentSubItem',
  props: {
    marginbottom: {
      type: Number,
      default: 0
    },
    comment: {
      type: Object,
      default: () => {},
      required: true
    },
    borderbottom: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    console.log(typeof this.comment, 'c')
  }
}
</script>

<style scoped lang="scss">
.comment-sub-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 18px 0 18px;
  background-color: #fff;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .item-container {
    flex: 1;

    &-user {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-left {
        h1 {
          font-size: 14px;
          font-weight: 700;
          color: #777;
          margin-bottom: 4px;
        }

        p {
          color: #999;
          font-size: 14px;
          margin-top: 6px;
        }
      }

      &-right {
        span {
          margin-right: 5px;
          font-size: 14px;
        }

        .iconfont.active {
          color: #409fea;
        }
      }
    }

    &-comment {
      padding: 10px 0 10px 0;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #f4f4f4;
      line-height: 24px;
    }

    &-comment.borderbottom {
      border-bottom: none;
    }
  }
}
</style>
