<template>
  <div class="xianyu-index">
    <router-view/>
    <van-tabbar route v-model="active" active-color="#409fea" inactive-color="#000">
      <van-tabbar-item v-for="item in bottomIcon" :key=item.to :to="item.to" replace>
        <span>{{ item.title }}</span>
        <template #icon="props">
          <i :class="[ 'iconfont', props.active ? item.active: item.inactive ]"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,
      bottomIcon: [
        {
          to: '/',
          active: 'icon-home-fill',
          inactive: 'icon-home',
          title: '首页'
        },
        {
          to: '/dynamic',
          active: 'icon-compass-fill',
          inactive: 'icon-compass',
          title: '动态'
        },
        {
          to: '/mymessage',
          active: 'icon-xiaoxi1',
          inactive: 'icon-xiaoxi1',
          title: '消息'
        },
        {
          to: '/mine',
          active: 'icon-user-fill',
          inactive: 'icon-account',
          title: '我的'
        }
      ]
    }
  },
  activated () {
    console.log('Index缓存')
  }
}
</script>

<style scoped lang="scss">
 .xianyu-index {
   height: 100%;
   position: relative;

   /deep/ .van-tabbar-item__icon .iconfont {
     font-size: 20px;
   }
   /deep/ .van-tabbar-item__text {
     font-size: 14px;
   }
 }
</style>
