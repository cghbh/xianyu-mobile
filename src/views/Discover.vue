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
      <van-swipe :lazy-render="true" :autoplay="2000" loop touchable indicator-color="#409fea">
        <van-swipe-item v-for="item in swiperList" :key="item._id">
          <img :src="item.swiper_url" style="height: auto;height: auto;max-width: 100%;min-height: 28.4vh;">
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
import { getSwiper } from '@/api/swiper.js'

const list = [
  { title: '好文', desp: '凌云健笔意纵横', to: '/article-list', color: '#F3F3F3', isSelect: true },
  { title: '诗词', desp: '小楼一夜听春雨', to: '/ancient-poetrylist', color: '#FAF4F4', isSelect: true },
  { title: '成语词典', desp: '清词丽句必为邻', to: '/dictionary-list', color: '#F9F4F0', isSelect: true },
  { title: '趣味答题', desp: '似曾相识燕归来', to: '/knowledge-competition', color: '#F9F4F0', isSelect: true },
  { title: '开心一刻', desp: '仰天大笑出门去', to: '/joke', color: '#F3F3F3', isSelect: true }
]
export default {
  name: 'Discover',
  data () {
    return {
      value: '',
      channelList: JSON.parse(localStorage.getItem('channel')) || list,
      swiperList: []
    }
  },
  mounted () {
    localStorage.removeItem('channel')
    localStorage.setItem('channel', JSON.stringify(this.channelList))
    this.getSwiperHandle()
  },

  // 组件载入之后重新获取数据
  activated () {
    const channel = JSON.parse(localStorage.getItem('channel')) || list
    this.channelList = channel
  },

  methods: {
    async getSwiperHandle () {
      const result = await getSwiper()
      if (result.errno === 0) {
        this.swiperList = result.data.slice(0, 5)
      }
    }
  },
  components: {
    ChannelItem
  }
}
</script>

<style scoped lang="scss">
.doge {
  width: 140px!important;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
.xianyu-discover {
  background-color: #fff;
}
.xianyu-discover {
  /deep/ .van-swipe {
    border-radius: 6px;
  }

  /deep/ .van-search {
    padding: 15px 12px 6px 12px;
  }

  /deep/ .van-field__control:disabled {
    -webkit-text-fill-color: #323233;
  }

  /deep/ .van-pull-refresh {
    height: 100%;
  }

  /deep/ .van-swipe-item {
    height: 28.4vh;
    overflow: hidden;
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
