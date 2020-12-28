<template>
  <div class="dynamic-detail">
    <back-top title="动态详情"></back-top>
    <div class="xianyu-dynamic-detail-skeleton" v-if="showSkeleton">
      <dynamic-skeleton></dynamic-skeleton>
    </div>
    <div v-else class="xianyu-dynamic-detail-container">
      <div class="dynamic-detail-user">
        <div class="dynamic-detail-user-container">
          <van-image width="50" height="50" fit="cover" round :src="dynamic.publisher && dynamic.publisher.avatar_url"/>
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
      <divide-area :height="10"></divide-area>
      <comment-list></comment-list>
      <bottom-comment></bottom-comment>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import BottomComment from '../components/BottomComment/index.vue'
import CommentList from '../components/BottomComment/comment.vue'
import DivideArea from '../components/PublicComponents/DivideArea.vue'
import DynamicSkeleton from '@/components/Skeleton/DynamicDetailSkeleton.vue'
import { getDynamicDetail } from '@/api/dynamic.js'
import { userFollow, getMyFans } from '@/api/user.js'
export default {
  name: 'DynamicDetail',
  data () {
    return {
      dynamic: {},
      // 当前动态作者的所有粉丝id
      fansId: [],
      showSkeleton: true
    }
  },
  computed: {
    // 用户是否登录
    isLogin () {
      return this.$store.state.token.token
    }
  },
  async mounted () {
    const result = await getDynamicDetail(this.$route.params.id)
    if (result.errno === 0) {
      this.dynamic = result.data
      setTimeout(() => {
        this.showSkeleton = false
      }, 50)
    } else {
      this.$toast({ message: '数据获取失败', duration: 800 })
    }
  },
  methods: {
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
    showPreview (index) {
      ImagePreview({
        images: this.dynamic.avatar_url,
        startPosition: index,
        closeable: true
      })
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
