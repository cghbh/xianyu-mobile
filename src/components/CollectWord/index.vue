<template>
  <div class="xianyu-collect-word-exble" ref="xianyu-collect-word-exble">
    <divide-area :height="8"></divide-area>
    <dictionary-item
      v-for="(item, index) in words"
      :dictionary="item.word_title"
      :key="item._id"
      :no-margin-bottom="index === (words.length - 1)"
      @click="$router.push(`/dictionary-detail/${item._id}`)"
    />
  </div>
</template>

<script>
import DictionaryItem from '@/components/DictionaryItem/index'
import { debounce } from 'lodash'
export default {
  props: {
    words: {
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
    this.$refs['xianyu-collect-word-exble'].scrollTop = this.scrollTop
  },

  mounted () {
    this.$refs['xianyu-collect-word-exble'].addEventListener('scroll', debounce(this.scrollTopHandle))
  },

  beforeDestroy () {
    this.$refs['xianyu-collect-word-exble'].removeEventListener('scroll', this.scrollTopHandle, true)
  },

  methods: {
    scrollTopHandle () {
      this.scrollTop = this.$refs['xianyu-collect-word-exble'].scrollTop
    }
  },

  components: {
    DictionaryItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-collect-word-exble {
  background-color: rgba(38, 38, 38, .05);
  height: calc(100vh - 90px);
  overflow-y: auto;

  /deep/ .xianyu-dictionary-item {
    margin-bottom: 0;
    border-bottom: 1px solid #efefef;
  }
}
</style>
