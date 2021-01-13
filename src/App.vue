<template>
  <div id="app">
    <keep-alive :include="cachedPages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

  mounted () {
    console.log(this.cachedPages, 'cachedPages')
  },

  computed: {
    ...mapState(['cachedPages'])
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
