<template>
  <div class="xianyu-collect-poem-com" ref="xianyu-collect-poem-com">
    <divide-area :height="8"></divide-area>
    <poem-item
      @click="$router.push('/ancient-poetry/' + item._id)"
      v-for="(item) in poems"
      :itemvalue="item"
      :key="item._id"
    />
  </div>
</template>

<script>
import PoemItem from '@/components/PoemItem/index.vue'
import { debounce } from 'lodash'
export default {
  props: {
    poems: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      scrollTop: 0
    }
  },

  activated () {
    this.$refs['xianyu-collect-poem-com'].scrollTop = this.scrollTop
  },

  mounted () {
    this.$refs['xianyu-collect-poem-com'].addEventListener('scroll', debounce(this.scrollTopHandle))
  },

  beforeDestroy () {
    this.$refs['xianyu-collect-poem-com'].removeEventListener('scroll', this.scrollTopHandle, true)
  },

  methods: {
    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-collect-poem-com'].scrollTop
    }
  },

  components: {
    PoemItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-collect-poem-com {
  background-color: rgba(38, 38, 38, .05);
  height: calc(100vh - 90px);
  overflow-y: auto;

  /deep/ .ancient-item {
    margin-bottom: 0;
    border-bottom: 1px solid #efefef;
  }
}
</style>
