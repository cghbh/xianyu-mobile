<template>
  <div id="app">
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

  computed: {
    ...mapState(['cachedPages']),
    isLogin () {
      return this.$store.state.token.token
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
