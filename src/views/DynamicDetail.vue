<template>
  <div class="dynamic-detail">
    <back-top title="动态详情"></back-top>
    <div class="dynamic-detail-user">
      <div class="dynamic-detail-user-container">
        <van-image width="50" height="50" fit="cover" round :src="dynamic.publisher.avatar_url"/>
        <div class="dynamic-detail-user-name">
          <h1>{{ dynamic.publisher && dynamic.publisher.nickname }}</h1>
          <h3>{{ dynamic && dynamic.createdAt | timeformat }}</h3>
        </div>
      </div>
      <div @click="focus" class="dynamic-detail-user-focus" v-if="!fansId.includes($store.state.userInfo._id)">
        <i class="iconfont icon-jia"></i>
        <span>关注</span>
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
    <divide-area :height="8"></divide-area>
    <comment-list></comment-list>
    <bottom-comment></bottom-comment>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import BottomComment from '../components/BottomComment/index.vue'
import CommentList from '../components/BottomComment/comment.vue'
import DivideArea from '../components/PublicComponents/DivideArea.vue'
import { getDynamicDetail } from '@/api/dynamic.js'
import { userFollow, getMyFans } from '@/api/user.js'
export default {
  name: 'DynamicDetail',
  data () {
    return {
      dynamic: {},
      // 当前动态作者的所有粉丝id
      fansId: []
    }
  },
  async mounted () {
    const { id } = this.$route.params
    const result = await getDynamicDetail(id)
    if (result.code === 200) {
      this.dynamic = result.data
      const result1 = await getMyFans(this.dynamic.publisher._id)
      if (result1.code === 200) {
        const tempArray = []
        result1.data.forEach(item => tempArray.push(item._id))
        this.fansId = tempArray
      }
    } else {
      this.$toast({ message: '数据获取失败', duration: 800 })
    }
  },
  methods: {
    async focus () {
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
    DivideArea
  }
}
</script>

<style scoped lang="scss">
.dynamic-detail {
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 50px;

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

    &-focus {
      color: #409fea;
      .iconfont {
        font-size: 14px;
        margin-right: 3px;
      }
      span {
        font-size: 16px;
      }
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
