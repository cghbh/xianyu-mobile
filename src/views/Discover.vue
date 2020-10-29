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
      <channel-item BgColor="#F3F3F3" @click.native="$router.push('/gold-sentence')">
        <h1 class="item-header" slot="header">金句</h1>
        <p slot="content">一语惊醒梦中人</p>
      </channel-item>
      <channel-item BgColor="#F3F3F3" @click.native="$router.push('/good-article')">
        <h1 class="item-header" slot="header">好文</h1>
        <p slot="content">一语惊醒梦中人</p>
      </channel-item>
      <channel-item BgColor="#FAF4F4" @click.native="$router.push('/ancient-poetry')">
        <h1 class="item-header" slot="header">诗词</h1>
        <p slot="content">小诗有味似连珠</p>
      </channel-item>
      <channel-item BgColor="#F9F4F0" @click.native="$router.push('/dictionary')">
        <h1 class="item-header" slot="header">成语词典</h1>
        <p slot="content">一语惊醒梦中人</p>
      </channel-item>
      <channel-item BgColor="#F9F4F0" @click.native="$router.push('/knowledge-competition')">
        <h1 class="item-header" slot="header">趣味答题</h1>
        <p slot="content">一语惊醒梦中人</p>
      </channel-item>
      <channel-item BgColor="#F3F3F3" @click.native="$router.push('/joke')">
        <h1 class="item-header" slot="header">开心一刻</h1>
        <p slot="content">一语惊醒梦中人</p>
      </channel-item>
      <div class="xianyu-discover-add-channel" @click="$router.push('/addchannel')">
        <i class="icon-jia iconfont"></i>
        <span>添加频道</span>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelItem from '../components/PublicComponents/ChannelItem.vue'
export default {
  name: 'Discover',
  data () {
    return {
      value: '',
      channelList: [
        { title: '金句', desp: '一语惊醒梦中人', to: '/' },
        { title: '好文', desp: '一语惊醒梦中人', to: '/' },
        { title: '诗词', desp: '一语惊醒梦中人', to: '/' },
        { title: '成语词典', desp: '一语惊醒梦中人', to: '/' },
        { title: '趣味答题', desp: '一语惊醒梦中人', to: '/' },
        { title: '开心一刻', desp: '一语惊醒梦中人', to: '/' }
      ]
    }
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
p {
  font-size: 13px;
  color: rgba(0, 0, 0, .85);
}
</style>
