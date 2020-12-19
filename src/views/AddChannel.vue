<template>
  <div class="add-channel">
    <back-top title="频道管理"></back-top>
    <div class="add-channel-container">
      <channel-item @click.native="select(item)" :BgColor="item.color" v-for="item in channelOptions" :key="item.title">
        <h1 class="item-header" slot="header">{{ item.title }}</h1>
        <p class="item-content" slot="content">{{ item.desp }}</p>
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
      channelOptions: []
    }
  },
  mounted () {
    const list = JSON.parse(localStorage.getItem('channel'))
    if (!list) {
      return this.$router.push('/discover')
    }
    this.channelOptions = list
  },
  methods: {
    select (item) {
      item.isSelect = !item.isSelect
      // 当选择项改变之后存储到本地
      localStorage.setItem('channel', JSON.stringify(this.channelOptions))
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
