<template>
  <div class="comment-list">
    <van-sticky :offset-top="46">
      <div class="comment-list-header">
        <div class="comment-list-header-title">评论</div>
        <div class="comment-list-header-sort">
          <span class="hot" :class="{ 'active': isHot }" @click="hotHandle">热门</span>
          <span class="sep-line">/</span>
          <span class="newest" :class="{ 'active': !isHot }" @click="latestHandle">最新</span>
        </div>
      </div>
    </van-sticky>
    <div class="comment-list-container" v-if="comments.length > 0">
      <div class="comment-item" v-for="(item1, index1) in comments" :key="index1">
        <img :src="item1.commentator && item1.commentator.avatar_url">
        <div class="comment-item-content">
          <div class="first-user">
            <div class="first-user-left">
              <h1>{{ item1.commentator && item1.commentator.nickname }}</h1>
              <span>{{ item1.createdAt | timeformat }}</span>
            </div>
            
            <!-- 点赞操作 -->
            <div class="first-user-right">
              <span>{{ item1.zan_number }}</span>
              <i 
                v-if="isLogin && zanId.includes(item1._id)" 
                @click="$emit('unlike', item1._id)" 
                class="iconfont icon-dianzan active"
              >
              </i>
              <i 
                @click="$emit('like', item1._id)" 
                class="iconfont icon-dianzan1" 
                v-else
              >
              </i>
            </div>
          </div>

          <!-- 向一级评论回复内容 -->
          <div class="first-user-comment" @click="$emit('reply', { user_id: item1.commentator._id, nickname: item1.commentator.nickname, comment_id: item1._id })">{{ item1.content }}</div>
          <div class="user-repeat" v-if="item1.second_comment.length > 0" @click="showPopupHandle(item1)">
            <div class="user-repeat-item" v-for="(item2, index2) in item1.second_comment.slice(0, 3)" :key="index2">
              <h1>{{ item2.commentator && item2.commentator.nickname }}：</h1>
              <span>{{ item2.content }}</span>
            </div>
            <div class="see-more" v-if="item1.second_comment.length > 3">查看全部{{ item1.second_comment.length }}条回复</div>
          </div>
        </div>
      </div>
    </div>

    <div class="no-comments" v-if="comments.length <= 0 && showNoComments">
      <i class="iconfont icon-pinglun"></i>
      <span class="no-comments-tips">快来添加第一条评论吧</span>
    </div>

    <van-popup :value="showPopup" position="bottom" :style="{ height: '100%' }" :overlay="false" >
      <div class="comment-extra">
        <van-sticky>
          <div class="comment-number">
            <i class="iconfont icon-guanbi" @click="closePopup()"></i>
            <span>{{ secondComments.length > 0 ? `${secondComments.length}条回复` : '暂无回复'}}</span>
          </div>
        </van-sticky>
        <comment-subitem 
          :borderbottom="true" 
          :comment="fisrtComment"
          :zan-id="zanId"
          :root-id="fisrtComment._id"
          :root="true"
          @rootLike="$emit('like', fisrtComment._id)"
          @rootUnlike="$emit('unlike', fisrtComment._id)"
          @secondReply="secondReplyHandle"
        />

        <divide-area/>

        <comment-subitem
          v-for="(item2, index2) in secondComments"
          :key="index2"
          :comment="item2"
          :root="false"
          :root-id="fisrtComment._id"
          :zan-id="zanId"
          :marginbottom="index2 === secondComments.length - 1 ? 44 : 0"
          @secondLike="$emit('secondLikes', { firstId: fisrtComment._id, second_id: item2._id })"
          @secondUnlike="$emit('secondUnlikes', { firstId: fisrtComment._id, second_id: item2._id })"
          @secondReply="secondReplyHandle"
        />
        <bottom-comment 
          ref="secondReply"
          :needicon="false"
          :placeholder="placeholder"
          v-model="inputValue"
          @send="secondSendHandle"
        />
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
  props: {
    comments: {
      type: Array,
      default: () => [],
      required: true
    },
    showNoComments: {
      type: Boolean,
      default: false
    },
    zanId: {
      type: Array,
      default: () => []
    },
    // 最新和最热的切换，默认展示最热
    isHot: {
      type: Boolean,
      default: true
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    }
  },

  data () {
    return {
      showPopup: false,
      secondComments: [],
      fisrtComment: {}
    }
  },

  watch: {
    comments: {
      handler (newVal) {
        const firstCommentIndex = newVal.findIndex(item => item._id === this.fisrtComment._id)
        if (firstCommentIndex > -1) {
          this.secondComments = newVal[firstCommentIndex].second_comment
        }
      },
      deep: true
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    closePopup () {
      this.showPopup = false
    },
    showPopupHandle (value) {
      this.fisrtComment = value
      this.showPopup = true
      this.secondComments = value.second_comment
    },

    // 最热
    hotHandle () {
      this.$emit('hot', true)
    },

    // 最新
    latestHandle () {
      this.$emit('hot', false)
    },

    // 二级嵌套评论，不点击任何一个，则是对根评论的直接回复
    secondSendHandle () {
      this.$emit('secondSend', { rootId: this.fisrtComment._id, nickname: this.fisrtComment.commentator.nickname, replyTo: this.fisrtComment.commentator._id })
    },

    // 点击哪一条评论，知道回复的是谁，以及对应的用户id和评论的id
    secondReplyHandle (replyTo, nickname, rootId) {
      this.$emit('secondReplys', { replyTo, nickname, rootId })
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
    padding: 20px;
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
    background-color: #fff;

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
            font-size: 15px;
            margin-top: 5px;
            line-height: 24px;
          }

          &-left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            h1 {
              font-size: 14px;
              margin-bottom: 8px;
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
              color: #666;
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
          padding-top: 8px;
          background-color: #F8F8FA;
          border-radius: 4px;

          &-item {
            margin-bottom: 12px;
            margin-top: 0px;
            line-height: 10px;

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
            font-size: 13px;
            color: #409fea;
            margin-bottom: 8px;
            margin-top: 5px;
          }
        }
      }
    }
  }
}

.comment-extra {
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
}

 /* 1px边框 */
.comment-number::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 1px;
  bottom: 0;
  background-color: #eaeaea;
  transform: scaleY(.5);
}

.no-comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-pinglun {
    font-size: 50px;
    margin-top: 50px;
    color: #bbb;
  }

  &-tips {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 10px;
    color: #999;
  }
}
</style>
