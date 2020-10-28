<template>
  <div class="comment-sub-item">
    <img src="../../assets/images/courage.png">
    <div class="item-container">
      <div class="item-container-user">
        <div class="item-container-user-left">
          <h1>程序猿泰山</h1>
          <p>2020-09-09</p>
        </div>
        <div class="item-container-user-right">
          <span>22</span>
          <i class="iconfont icon-dianzan active" v-if="true"></i>
          <i class="iconfont icon-dianzan1" v-if="false"></i>
        </div>
      </div>
      <div class="item-container-comment" :class="{ 'isend': borderbottom }">必须去啊</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentSubItem',
  props: {
    // 是否不加底边线
    borderbottom: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
.comment-sub-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 18px;
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
        }
      }

      &-right {
        span {
          margin-right: 5px;
        }

        .iconfont.active {
          color: #409fea;
        }
      }
    }

    &-comment {
      padding: 20px 0;
      font-size: 16px;
      color: #333;
    }

    &-comment.isend {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
