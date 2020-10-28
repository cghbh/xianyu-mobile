<template>
  <div class="comment-list">
    <van-sticky :offset-top="46">
      <div class="comment-list-header">
        <div class="comment-list-header-title">评论</div>
        <div class="comment-list-header-sort">
          <span class="hot" :class="{ 'active': isHot }" @click="isHot = true">热门</span>
          <span class="sep-line">/</span>
          <span class="newest" :class="{ 'active': !isHot }" @click="isHot = false">最新</span>
        </div>
      </div>
    </van-sticky>
    <div class="comment-list-container">
      <div class="comment-item" v-for="(item1, index1) in mock" :key="index1">
        <img src="../../assets/images/courage.png">
        <div class="comment-item-content">
          <div class="first-user">
            <div class="first-user-left">
              <h1>{{ item1.user }}</h1>
              <span>{{item1.created }}</span>
            </div>
            <div class="first-user-right">
              <span>100</span>
              <i class="iconfont icon-dianzan1"></i>
              <i class="iconfont icon-dianzan" v-if="false"></i>
            </div>
          </div>
          <div class="first-user-comment">{{ item1.content }}</div>
          <div class="user-repeat" @click="showPopup = true">
            <div class="user-repeat-item" v-for="(item2, index2) in item1.sub.slice(0, 3)" :key="index2">
              <h1>{{ item2.user }}：</h1>
              <span>{{ item2.content }}</span>
            </div>
            <div class="see-more" v-if="item1.sub.length >= 2">查看全部{{ item1.sub.length }}条回复</div>
          </div>
        </div>
      </div>
    </div>
    <van-popup :value="showPopup" position="bottom" :style="{ height: '100%' }" :overlay="false" >

      <div class="comment-extra">
        <van-sticky>
          <div class="comment-number">
            <i class="iconfont icon-guanbi" @click="closePopup"></i>
            <span>暂无回复</span>
          </div>
        </van-sticky>
        <comment-subitem :borderbottom="false"></comment-subitem>
        <divide-area></divide-area>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem></comment-subitem>
        <comment-subitem :borderbottom="false"></comment-subitem>
        <bottom-comment></bottom-comment>
      </div>
    </van-popup>
  </div>
</template>

<script>
import CommentSubitem from './CommentItem.vue'
import DivideArea from '../PublicComponents/DivideArea.vue'
import BottomComment from './index.vue'
export default {
  name: 'CommentList',
  data () {
    return {
      isHot: true,
      showPopup: false,
      mock: [
        {
          user: '程序员人猿泰山',
          content: '二线城市你还想怎么样',
          created: '2020-09-09',
          zan: 100,
          sub: [
            {
              user: '慕容复',
              content: '一定还有更好的答案可以解决问题',
              created: '2020-09-10',
              zan: 7
            },
            {
              user: '娃哈哈',
              content: '一定还有更好的答案可以解决问题',
              created: '2020-09-10',
              zan: 9
            },
            {
              user: '海瑞海刚峰',
              content: '一定还有更好的答案可以解决问题',
              created: '2020-09-11 11:29:10',
              zan: 2
            },
            {
              user: '小杰瑞',
              content: '离下班还有不到两个小时的时间，但是代码还有很多的东西没有完成，捉急哟。。。。。。',
              created: '2020-10-128 16:15:10',
              zan: 2
            }
          ]
        },
        {
          user: '凯尔萨斯',
          content: '来自猩猩的故事-一个程序员的成长经历',
          created: '2020-03-09',
          zan: 100,
          sub: [
            {
              user: '海通证券员工',
              content: '一定还有更好的答案可以解决问题',
              created: '2020-09-10',
              zan: 7
            }
          ]
        }
      ]
    }
  },
  methods: {
    closePopup () {
      this.showPopup = false
    }
  },
  components: {
    CommentSubitem,
    DivideArea,
    BottomComment
  }
}
</script>

<style scoped lang="scss">
.comment-list {
  height: 100px;
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #fff;

    &-title {
      font-size: 16px;
      font-weight: 700;
    }

    &-sort {
      font-size: 14px;
      .sep-line {
        margin: 0 5px;
      }

      .hot.active {
        color: #409fea;
      }
      .newest.active {
        color: #409fea;
      }
    }
  }

  &-container {
    padding: 0 20px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 56px;
    .comment-item {
      width: 100%;
      display: flex;
      margin-bottom: 24px;
      justify-content: space-between;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }

      &-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        .first-user {
          display: flex;
          height: 45px;
          align-items: center;
          justify-content: space-between;

          &-comment {
            font-size: 16px;
            margin-top: 5px;
            line-height: 24px;
          }

          &-left {
            h1 {
              font-size: 14px;
              margin-bottom: 5px;
              color: rgba(0, 0, 0, .7);
              font-weight: 700;
            }
            span {
              font-size: 12px;
              color: rgba(0, 0, 0, .45);
            }
          }

          &-right {
            span {
              font-size: 14px;
              color: #000;
              margin-right: 4px;
            }

            .iconfont {
              font-size: 16px;
            }

            .iconfont.active {
              color: #409fea;
            }
          }
        }

        .user-repeat {
          margin-top: 8px;
          padding: 4px 12px;
          background-color: #F8F8FA;

          &-item {
            margin-bottom: 8px;
            margin-top: 8px;
            line-height: 18px;
            h1 {
              font-size: 14px;
              font-weight: 600;
              color: rgba(0, 0, 0, 1);
              display: inline-block;
            }

            span {
              font-size: 14px;
              color: rgba(0, 0, 0, .6);
              word-wrap: break-word;
            }
          }

          .see-more {
            font-size: 14px;
            color: #409fea;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}

.comment-extra {
  // margin-top: 50px;
  height: 100%;
  overflow: scroll;
  background-color: rgba(38, 38, 38, .05);
}

.comment-list /deep/ .van-icon {
  color: #000;
}

.comment-number {
  height: 55px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .iconfont {
    position: absolute;
    left: 20px;
    color: #888;
  }
  span {
    font-size: 16px;
    color: #000;
  }
  // position: fixed;
  // left: 50%;
  // transform: translateX(-50%);
  // top: 0px;
  // font-size: 16px;
  // color: #000;
  // font-weight: 700;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
