<template>
  <div class="add-channel">
    <van-nav-bar title="频道管理" left-arrow @click-left="$router.go(-1)">
      <template #left>
        <div class="back-container">
          <i class="iconfont icon-left"></i>
        </div>
      </template>
    </van-nav-bar>
    <div class="add-channel-container">
      <channel-item @click.native="select(item)" :BgColor="item.color" v-for="item in mockOptions" :key="item.title">
        <h1 slot="header">{{ item.title }}</h1>
        <p slot="content">{{ item.content }}</p>
        <i slot="select" v-if="item.isSelect" class="iconfont icon-check-circle-fill"></i>
      </channel-item>
    </div>
  </div>
</template>

<script>
import ChannelItem from '../components/PublicComponents/ChannelItem.vue'
export default {
  name: 'AddChannel',
  data () {
    return {
      mockOptions: [
        {
          title: '金句',
          content: '一语惊醒梦中人',
          isSelect: true,
          color: '#F3F3F3'
        },
        {
          title: '好文',
          content: '一语惊醒梦中人',
          isSelect: true,
          color: '#F3F3F3'
        },
        {
          title: '诗词',
          content: '一语惊醒梦中人',
          isSelect: true,
          color: '#FAF4F4'
        },
        {
          title: '字典',
          content: '一语惊醒梦中人',
          isSelect: true,
          color: '#F9F4F0'
        },
        {
          title: '知识竞赛',
          content: '一语惊醒梦中人',
          isSelect: true,
          color: '#F9F4F0'
        }
      ]
    }
  },
  methods: {
    select (item) {
      item.isSelect = !item.isSelect
    }
  },
  components: {
    ChannelItem
  }
}
</script>

<style scoped lang="scss">
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }
}

.add-channel {
  height: 100%;
  background-color: #fff;
}
.add-channel-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
  padding-top: 20px;
}

.icon-check-circle-fill {
  position: absolute;
  top: 18px;
  right: 10px;
  color: #858FA8;
  font-size: 22px;
}
</style>
