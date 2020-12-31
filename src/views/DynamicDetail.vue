<template>
  <div class="dynamic-detail">
    <back-top title="动态详情"></back-top>
    <div class="xianyu-dynamic-detail-skeleton" v-if="showSkeleton">
      <dynamic-skeleton/>
    </div>
    <div v-else class="xianyu-dynamic-detail-container">
      <div class="dynamic-detail-user">
        <div class="dynamic-detail-user-container">
          <van-image 
            width="50" 
            height="50" 
            fit="cover" 
            round 
            :src="dynamic.publisher && dynamic.publisher.avatar_url"
          />
          <div class="dynamic-detail-user-name">
            <h1>{{ dynamic.publisher && dynamic.publisher.nickname }}</h1>
            <h3>{{ dynamic && dynamic.createdAt | timeformat }}</h3>
          </div>
        </div>
      </div>
      <div class="dynamic-detail-content">
        <p>{{ dynamic.content }}</p>
        <van-image
          @click="showPreview(index)"
          width="100"
          height="100"
          fit="cover"
          lazy-load
          v-for="(item, index) in dynamic.avatar_url"
          :src="item"
          :key="item">
        </van-image>
      </div>

      <divide-area :height="10"/>

      <comment-list 
        :comments="comments"
        :show-no-comments="showNoComments"
        :zan-id="userZanCommentId"
        :is-hot="isHot"
        :placeholder="reply && reply.nickname"
        v-model="secondValue"
        ref="secondInputRef"
        @reply="replyHandle"
        @like="userLikeCommentsHandle"
        @unlike="userUnlikeCommentsHandle"
        @secondLikes="secondLikeHandle"
        @secondUnlikes="secondUnlikeHandle"
        @hot="getCommentSwicth"
        @secondSend="secondSendHandle"
        @secondReplys="secondReplysHandle"
      />

      <bottom-comment 
        :placeholder="reply && reply.nickname" 
        ref="inputArea" 
        v-model="inputValue"
        @send="addCommentsHandle"
      />
    </div>
  </div>
</template>

<script>
import BottomComment from '../components/BottomComment/index.vue'
import CommentList from '../components/BottomComment/comment.vue'
import DivideArea from '../components/PublicComponents/DivideArea.vue'
import DynamicSkeleton from '@/components/Skeleton/DynamicDetailSkeleton.vue'
import { ImagePreview } from 'vant'
import { getDynamicDetail, getDynamicComments, addComments } from '@/api/dynamic.js'
import { userFollow, getMyFans, getUserDynamicComments, userZanComment, userCancelZanComment } from '@/api/user.js'
export default {
  name: 'DynamicDetail',
  data () {
    return {
      dynamic: {},
      // 当前动态作者的所有粉丝id
      fansId: [],
      showSkeleton: true,
      comments: [],
      inputValue: '',
      reply: {},
      showNoComments: false,
      // 已登录用户点赞过的评论的id数组
      userZanCommentId: [],
      isHot: true,
      secondValue: ''
    }
  },

  computed: {
    // 用户是否登录
    isLogin () {
      return this.$store.state.token.token
    },
    userId () {
      return this.$store.state.token.userId
    }
  },

  watch: {
    isHot (newVal) {
      if (newVal) {
        this.getDynamicCommentsHandle('1')
      } else {
        this.getDynamicCommentsHandle('0')
      }
    }
  },

  async mounted () {
    if (this.userId) {
      this.getUserDynamicCommentsHandle()
    }
    const result = await getDynamicDetail(this.$route.params.id)
    if (result.errno === 0) {
      this.dynamic = result.data
      this.getDynamicCommentsHandle()
      setTimeout(() => {
        this.showSkeleton = false
      }, 50)
    } else {
      this.$toast({ message: '数据获取失败', duration: 800 })
    }
  },

  methods: {
    // 获取所有的评论
    async getDynamicCommentsHandle (sort) {
      const result = await getDynamicComments(this.$route.params.id, sort)
      if (result.errno === 0) {
        this.comments = result.data
        if (this.comments.length <= 0) {
          this.showNoComments = true
        }
      }
    },

    // 如果用户登录过的话，获取所有点赞过的评论
    async getUserDynamicCommentsHandle () {
      const result = await getUserDynamicComments(this.userId)
      if (result.errno === 0) {
        this.userZanCommentId = result.data
      }
    },

    // 添加评论
    async addCommentsHandle () {
      // 未登录，携带当前的路由跳转到登录的页面
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        if (this.inputValue.trim().length <= 0) {
          return this.$toast('评论内容不能为空！')
        }
        const result = await addComments(this.$route.params.id, this.inputValue, this.reply.comment_id, this.reply.user_id)
        if (result.errno === 0) {
          this.getDynamicCommentsHandle()
          this.inputValue = ''
          this.reply = {}
          this.$toast('评论成功')
        }
      }
    },
    
    // 获取this.reply的最新值
    async secondReplysHandle (value) {
      this.reply = value
      this.$refs.secondInputRef.$refs.secondReply.showInput = true
    },

    // 在单独的页面添加二级评论
    async secondSendHandle (value) {
      // 未登录，携带当前的路由跳转到登录的页面
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        if (this.secondValue.trim().length <= 0) {
          return this.$toast('评论内容不能为空！')
        }
        const result = await addComments(this.$route.params.id, this.secondValue, value.rootId, value.replyTo)
        if (result.errno === 0) {
          this.getDynamicCommentsHandle()
          this.secondValue = ''
          this.reply = {}
          this.$toast('评论成功')
        }
      }
    },

    // 关注用户的操作
    async focus () {
      // 先判断用户是否登录
      if (!this.user_login_token) {
        return this.$dialog({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.push({ name: 'Login' })
        })
          .catch(() => {})
      }
      const result = await userFollow(this.dynamic.publisher._id)
      if (result.code === 200) {
        const result1 = await getMyFans(this.dynamic.publisher._id)
        if (result1.code === 200) {
          const tempArray = []
          result1.data.forEach(item => tempArray.push(item._id))
          this.fansId = tempArray
        }
        this.$toast('已添加关注')
      }
    },

    // 如果有图片的话，展示图片的预览
    showPreview (index) {
      ImagePreview({
        images: this.dynamic.avatar_url,
        startPosition: index,
        closeable: true
      })
    },

    // 回复显示输入框
    replyHandle (value) {
      this.reply = value
      this.$refs.inputArea.showInput = true
    },

    // 一级评论点赞
    async userLikeCommentsHandle (id) {
      // 未登录，携带当前的路由跳转到登录的页面
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        const result = await userZanComment(this.$route.params.id, '', id)
        if (result.errno === 0) {
          const index = this.comments.findIndex(item => item._id === result.comment._id)
          if (index > -1 && !this.userZanCommentId.includes(id)) {
            this.comments[index].zan_number = result.comment.zan_number
            this.userZanCommentId.push(id)
          }
        }
      }
    },

    // 一级评论取消点赞
    async userUnlikeCommentsHandle (id) {
      const result = await userCancelZanComment(this.$route.params.id, '', id)
      if (result.errno === 0) {
        // 找出取消点赞的评论是那一条，修改点赞的数量
        const index = this.comments.findIndex(item => item._id === result.comment._id)
        // 找出用户赞过的id数组中的索引值
        const idIndex = this.userZanCommentId.indexOf(id)
        if (idIndex > -1 && index > -1) {
          this.comments[index].zan_number = result.comment.zan_number
          this.userZanCommentId.splice(idIndex, 1)
        }
      }
    },

    // 二级评论点赞
    async secondLikeHandle (value) {
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        const rootId = value.firstId
        const secondId = value.second_id
        const result = await userZanComment(this.$route.params.id, secondId, rootId)
        if (result.errno === 0) {
          const firstIndex = this.comments.findIndex(item => item._id === rootId)
          const rootComments = this.comments[firstIndex]
          const secondComments = rootComments.second_comment
          const secondIndex = secondComments.findIndex(item => item._id === secondId)
          this.comments[firstIndex].second_comment[secondIndex].zan_number = result.comment.zan_number
          if (!this.userZanCommentId.includes(secondId)) {
            this.userZanCommentId.push(secondId)
          }
        }
      }
    },

    // 二级评论取消点赞
    async secondUnlikeHandle (value) {
      const rootId = value.firstId
      const secondId = value.second_id
      const result = await userCancelZanComment(this.$route.params.id, secondId, rootId)
      if (result.errno === 0) {
        const firstIndex = this.comments.findIndex(item => item._id === rootId)
        const rootComments = this.comments[firstIndex]
        const secondComments = rootComments.second_comment
        const secondIndex = secondComments.findIndex(item => item._id === secondId)
        // 找出用户赞过的id删除
        const userZanIndex = this.userZanCommentId.indexOf(secondId)
        if (userZanIndex > -1) {
          this.comments[firstIndex].second_comment[secondIndex].zan_number = result.comment.zan_number
          this.userZanCommentId.splice(userZanIndex, 1)
        }
      }
    },

    // 切换最新和最热的消息
    getCommentSwicth (value) {
      this.isHot = value
    }
  },

  components: {
    BottomComment,
    CommentList,
    DivideArea,
    DynamicSkeleton
  }
}
</script>

<style scoped lang="scss">
.xianyu-dynamic-detail-skeleton {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.dynamic-detail {
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 50px;

  /deep/ .divide-area {
    background-color: rgba(38, 38, 38, .06);
  }

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
    padding: 0 10px 12px 10px;

    p {
      font-size: 15PX;
      line-height: 25px;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, .9);
    }
  }
}
</style>
