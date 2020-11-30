<template>
  <div class="xianyu-fans">
    <back-top title="我的粉丝"></back-top>
    <div class="xianyu-fans-container">
      <div class="xianyu-fans-container-item" v-for="item in fansList" :key="item._id">
        <div class="xianyu-fans-container-item-left">
          <img src="../assets/images/logo.png">
          <div class="xianyu-fans-container-item-left-user">
            <h1>{{ item.nickname }}</h1>
            <span>{{ item.personal_sign }}</span>
          </div>
        </div>
        <div class="xianyu-fans-container-item-right" v-if="followListId.includes(item._id)" @click="userCancelFollowHandle(item._id)">取消关注</div>
        <div class="xianyu-fans-container-item-right active" @click="userFollowHandle(item._id)" v-else>关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyFans, userFollows, userCancelFollow, userFollow } from '@/api/user.js'
export default {
  name: 'MyFans',
  data () {
    return {
      // 粉丝列表
      fansList: [],
      // 我的关注列表的id
      followListId: []
    }
  },
  computed: {
    id () {
      return this.$store.state.userInfo._id
    }
  },
  mounted () {
    this.getMyFansHandle()
    this.getFollowHandle()
  },
  methods: {
    async getMyFansHandle () {
      const data = await getMyFans(this.id)
      if (data.code === 200) {
        this.fansList = data.users
      }
    },
    async  getFollowHandle () {
      const data = await userFollows(this.id)
      if (data.code === 200) {
        this.followListId = []
        data.data.forEach(item => {
          this.followListId.push(item._id)
        })
      }
    },
    // 取消关注
    async userCancelFollowHandle (id) {
      const data = await userCancelFollow(id)
      const index = this.followListId.indexOf(id)
      this.followListId.splice(index, 1)
      if (data.code === 200) {
        this.$toast({
          message: '取消关注成功！',
          duration: 500
        })
      }
      // 取消关注之后刷新数据
      // this.getMyFansHandle()
      this.getFollowHandle()
    },
    // 关注某人
    async userFollowHandle (id) {
      const data = await userFollow(id)
      if (data.code === 200) {
        this.$toast({
          message: '关注成功！',
          duration: 500
        })
      }
      // 关注成功之后刷新数据
      this.getFollowHandle()
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-fans {
  height: 100%;
  background-color: #fff;
  overflow: auto;

  &-container {
    margin-bottom: 20px;
    &-item {
      display: flex;
      align-items: center;
      padding: 18px;
      border-bottom: 1px solid rgba(68, 68, 68, .08);
      &-left {
        width: 270px;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 8px;
        }
        &-user {
          width: 221px;
          display: flex;
          flex-direction: column;
          h1 {
            font-size: 16px;
            margin-bottom: 8px;
          }
          span {
            display: inline-block;
            width: 100%;
            font-size: 13px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      &-right {
        width: 80px;
        height: 28px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        background-color: #409fea;
        color: #fff;
        padding: 4px;
        box-sizing: border-box;
        color: #fff;
      }

      &-right.active {
        background-color: #fff;
        color: #409fea;
        border: 1px solid #409fea;
      }
    }

    &-item:last-of-type {
      border: none;
    }
  }
}
</style>
