<template>
  <div class="xianyu-search">
    <van-search
      @click="$router.push('/search')"
      @cancel="onCancel"
      v-model="searchValue"
      input-align="left"
      placeholder="请输入搜索关键词"
      show-action
      background="#409fea"/>
    <div class="xianyu-search-container">
      <div class="xianyu-search-container-history" v-if="mockSearchHistory.length">
        <div class="xianyu-search-container-history-title">
          <h2>历史记录</h2>
          <i @click="askClearSearchHistory" class="iconfont icon-delete"></i>
        </div>
        <div class="xianyu-search-container-history-container">
          <div class="xianyu-search-container-history-item" v-for="item in mockSearchHistory" :key="item">{{ item }}</div>
        </div>
      </div>
      <divide-area v-if="mockSearchHistory.length"></divide-area>
      <div class="xianyu-search-topic">
        <div class="xianyu-search-topic-title">热门话题</div>
        <div class="xianyu-search-topic-container">
          <div class="xianyu-search-topic-container-item" 
            v-for="(item, index) in mockTopic" 
            :key="item">
            <i :style="{ 'background-color': index === 0 ? '#FE2D46': index === 1 ? '#F60': index === 2 ? '#FAA90E': '#409fea'}" class="iconfont icon-huati1"></i>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DivideArea from '../components/PublicComponents/DivideArea.vue'
export default {
  name: 'Search',
  data () {
    return {
      searchValue: '',
      mockSearchHistory: [
        '算法',
        'Node.js博客系统',
        'Vue3造轮子',
        'Typescript',
        'React17-RC最新版',
        'Webpack5',
        'HTML5'
      ],
      mockTopic: [
        '5G前端时代会迎来什么改变？',
        'Vue 2.X版本对数组数据原型方法劫持的原理实践',
        'vue3为什么要用proxy替代defineProperty',
        '聊聊 JavaScript 的并发、异步和事件循环',
        '使用 Chrome 插件拦截广告的原理',
        '用Nodejs实现在终端中炒股',
        'JavaScript 中 10 个需要掌握基础的问题',
        'vite虽香，但webpack还是要学的',
        '前端二维码的生成与下载,h5端手机照片上传与拍照相关知识积累'
      ]
    }
  },
  methods: {
    // 取消搜索的时候，返回上一页
    onCancel () {
      this.$router.go(-1)
    },
    // 询问是否删除搜索历史
    askClearSearchHistory () {
      this.$dialog.confirm({
        title: '是否清除历史记录？',
        width: '280px'
      })
        .then((e) => {
          this.mockSearchHistory = []
          // 提示用户清楚历史记录成功
          setTimeout(() => {
            this.$toast({
              message: '清除成功！',
              position: 'top'
            })
          }, 300)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  components: {
    DivideArea
  }
}
</script>

<style scoped lang="scss">
.xianyu-search /deep/ .van-search__action {
  background-color: transparent;
  color: #fff;
}

.xianyu-search-container {
  background-color: #fff;
  
  &-history {
    padding: 15px 15px 0 15px;
    &-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      
      h2 {
        font-size: 16px;
        font-weight: 700;
        color: rgba(0, 0, 0, .6);
        user-select: none;
      }
      
      .iconfont {
        font-size: 17px;
        color: #e92322;
      }
    }
    &-container {
      display: flex;
      flex-wrap: wrap;
    }
    
    &-item {
      font-size: 12px;
      color: #555;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      padding: 5px 10px;
      margin-right: 10px;
      user-select: none;
      border-radius: 4px;
    }
  }
}

.xianyu-search-topic {
  padding: 0 15px 15px 15px;
  &-title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, .6);
    user-select: none;
    padding-top: 18px;
    margin-bottom: 8px;
  }
  &-container {
    &-item {
      font-size: 14px;
      color: #555;
      margin-top: 15px;
      font-weight: 400;
      user-select: none;
      display: flex;
      align-items: center;
      padding: 3px;
      border-radius: 4px;
      color: rgba(0, 0, 0, .6);
      
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .iconfont {
        color: #fff;
        font-size: 11px;
        padding: 4px;
        background-color: #409fea;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
  }
}
</style>
