<template>
  <div class="xianyu-message">
    <van-sticky>
      <van-nav-bar title="消息" sticky></van-nav-bar>
    </van-sticky>
    <div class="xianyu-message-container">
      <div class="xianyu-message-system-container">
        <message-badge @click="noticeHandle" iconcolor="#FFB539" title="通知" :count="5" icon="icon-gonggao">
        </message-badge>
        <message-badge @click="zanHandle" iconcolor="#FF7650" title="点赞" :count="108" icon="icon-dianzan">
        </message-badge>
        <message-badge @click="commentHandle" iconcolor="#45D1C1" title="评论" :count="25" icon="icon-pinglun">
        </message-badge>
        <message-badge @click="followHandle" iconcolor="#6C6DE0" title="关注" :count="0" icon="icon-heart-fill">
        </message-badge>
      </div>

      <div class="xianyu-message-person-container">
        <van-cell-group>
          <van-cell v-for="(item, index) in mock" :key="index">
            <template #title>
              <img class="xianyu-person-avatar"
                :src="item.avatar" />
              <div class="xianyu-person-user">
                <h1 class="xianyu-person-user-name">{{ item.nickname }}</h1>
                <p class="xianyu-person-user-latest">{{ item.latest }}</p>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBadge from '@/components/MyMessageComponents/Badge.vue'
export default {
  name: 'MyMessage',
  data () {
    return {
      mock: [
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '刘限', latest: '最近天气冷的好快呀！' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '老陈', latest: '加油，争取明年学会React框架升职加薪打Boss12345678' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '鲁迅', latest: '贪安稳就没有自由，要自由就要历些危险。只有这两条路' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '鲁迅', latest: '从来如此，便对么？' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '王尔德', latest: '生活在阴沟里，依然有仰望星空的权利。' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '白鹤林', latest: '从童年起，我便独自一人照顾着历代的星辰' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '张枣', latest: '望着窗外，只要想起一生中后悔的事 ，梅花便落满了南山。' },
        { avatar: 'http://xianyu-uploads.oss-cn-beijing.aliyuncs.com/upload_4d531593b5a5c33b90d038189982c14a.png', nickname: '梭罗', latest: '你千万不要见怪，城市是一个几百万人一起孤独生活的地方。' }
      ]
    }
  },
  methods: {
    // 点击通知的操作
    noticeHandle () {},
    // 点赞的操作
    zanHandle () {},
    // 评论的操作
    commentHandle () {},
    // 关注消息的查看操作
    followHandle () {}
  },
  components: {
    MessageBadge
  }
}
</script>

<style scoped lang="scss">
.xianyu-message-container {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;

  /deep/ .van-cell__title {
    display: flex;
    align-items: center;
  }

  /deep/ .van-cell {
    padding: 6px 12px;
    height: 96px;
    box-sizing: border-box;
  }

  /deep/ .van-cell::after {
    border: none;
  }

  /deep/ .van-hairline--top-bottom::after {
    border-width: 0;
  }
}

.xianyu-message-system-container {
  padding: 30px 20px 15px 20px;
  display: flex;
  justify-content: space-between;
}

.xianyu-message-person-container {
  margin-top: 15px;
}

.xianyu-message-person-cell {
  line-height: 54px;
}

.xianyu-person-avatar {
  width: 60px;
  margin-right: 12px;
  padding: 2px;
  box-sizing: border-box;
}

.xianyu-person-user {
  flex: 1;
  
  &-name {
    margin-bottom: 4px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }

  &-latest {
    max-width: 280px;
    font-size: 15px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
