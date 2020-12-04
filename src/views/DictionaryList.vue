<template>
  <div class="xianyu-dictionary-detail">
    <back-top title="成语列表"></back-top>
    <div class="xianyu-dictionary-detail-container">
      <dictionary-item
        v-for="(item, index) in dictionarys"
        :dictionary="item.word_title"
        :key="item._id"
        :no-margin-bottom="index === (dictionarys.length - 1)"
        @click="$router.push(`/dictionary-detail/${item._id}`)"></dictionary-item>
    </div>
  </div>
</template>

<script>
import DictionaryItem from '@/components/DictionaryItem/index.vue'
import { getDictionaryList } from '@/api/dictionary.js'
export default {
  name: 'DictionaryList',
  data () {
    return {
      currentPage: 1,
      dictionarys: [],
      total: 0
    }
  },
  components: {
    DictionaryItem
  },
  mounted () {
    this.getDictionaryListHandle()
  },
  methods: {
    getDictionaryListHandle () {
      getDictionaryList(this.currentPage).then(res => {
        if (res.errno === 0) {
          this.dictionarys = res.data
          this.total = res.total
        }
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-dictionary-detail-container {
  position: fixed;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(38, 38, 38, .05);
  overflow-y: auto;
}
</style>
