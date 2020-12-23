<template>
  <div class="xianyu-collect-dynamic-exble" ref="xianyu-collect-dynamic-exble">
    <dynamic-item
      v-for="(item, index) in dynamics"
      :key="item._id"
      :is-first="index === 0"
      :is-like="isLogin && zanId.includes(item._id)"
      :is-collect="isLogin && collectedId.includes(item._id)"
      :itemValue="item"
      @unlike="$emit('unlike', item._id)"
      @like="$emit('like', item._id)"
      @uncollect="$emit('uncollect', item._id)"
      @collect="$emit('collect', item._id)"
    />
  </div>
</template>

<script>
import DynamicItem from '../DynamicItem/index.vue'
import { debounce } from 'lodash'
export default {
  name: 'CollectDynamic',
  props: {
    dynamics: {
      type: Array,
      default: () => []
    },
    zanId: {
      type: Array,
      default: () => []
    },
    collectedId: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      scrollTop: 0
    }
  },

  mounted () {
    this.$refs['xianyu-collect-dynamic-exble'].addEventListener('scroll', debounce(this.scrollTopHandle, 30))
  },

  beforeDestroy () {
    this.$refs['xianyu-collect-dynamic-exble'].removeEventListener('scroll', this.scrollTopHandle)
  },

  activated () {
    this.$refs['xianyu-collect-dynamic-exble'].scrollTop = this.scrollTop
  },

  methods: {
    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-collect-dynamic-exble'].scrollTop
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },
    userId () {
      return this.$store.state.token.userId
    }
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-collect-dynamic-exble {
  height: calc(100vh - 94px);
  background-color: rgba(38, 38, 38, 0.05);
  overflow-y: auto;
}
</style>
