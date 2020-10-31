<template>
  <div class="xianyu-discover">
    <van-search
      @click="$router.push('/search')"
      input-align="center"
      shape="round"
      v-model="value"
      placeholder="搜索好文/诗词/成语"
      readonly
      disabled
    />
    <div style="padding: 10px 20px 15px 20px;">
      <van-swipe :autoplay="3000" indicator-color="#409fea">
        <van-swipe-item>
          <img src="../assets/images/1.jpg">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/images/2.jpg">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/images/3.jpg">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/images/4.jpg">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="xianyu-discover-container">
      <!-- for的优先级比if高，因此在这里使用template实现循环，里面使用if实现条件判断 -->
      <template v-for="item in channelList">
        <channel-item v-if="item.isSelect" :BgColor="item.color" router :to="item.to" :key="item.title">
          <h1 class="item-header" slot="header">{{ item.title }}</h1>
          <p class="item-content" slot="content">{{ item.desp }}</p>
        </channel-item>
      </template>

      <div class="xianyu-discover-add-channel" @click="$router.push('/addchannel')">
        <i class="icon-jia iconfont"></i>
        <span>添加频道</span>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelItem from '../components/PublicComponents/ChannelItem.vue'
const list = [
  { title: '好文', desp: '一语惊醒梦中人', to: '/good-article', color: '#F3F3F3', isSelect: true },
  { title: '诗词', desp: '一语惊醒梦中人', to: '/ancient-poetry', color: '#FAF4F4', isSelect: true },
  { title: '成语词典', desp: '一语惊醒梦中人', to: '/dictionary', color: '#F9F4F0', isSelect: true },
  { title: '趣味答题', desp: '一语惊醒梦中人', to: '/knowledge-competition', color: '#F9F4F0', isSelect: true },
  { title: '开心一刻', desp: '一语惊醒梦中人', to: '/joke', color: '#F3F3F3', isSelect: true }
]
export default {
  name: 'Discover',
  data () {
    return {
      value: '',
      channelList: JSON.parse(localStorage.getItem('channel')) || list
    }
  },
  mounted () {
    localStorage.setItem('channel', JSON.stringify(this.channelList))
  },
  components: {
    ChannelItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-discover {
  background-color: #fff;
  img {
    width: 100%;
  }
}
.xianyu-discover {
  /deep/ .van-swipe {
    border-radius: 6px;
  }

  /deep/ .van-field__control:disabled {
    -webkit-text-fill-color: #323233;
  }
}

.xianyu-discover {
  height: 100%;
  background-color: #fff;
}
.xianyu-discover-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;

  .xianyu-discover-add-channel {
    border: 1px dashed #CECECE;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, .6);
    user-select: none;
    flex-direction: row;
    width: 47.6%;
    height: 80px;
    border-radius: 3px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #020202;
    .iconfont {
      margin-right: 5px;
      margin-bottom: 10px;
    }
    span {
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
    }
  }
}

.item-header {
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: 700;
  color: rgba(0, 0, 0, .75);
}
.item-content {
  font-size: 13px;
  color: rgba(0, 0, 0, .85);
}
</style>
