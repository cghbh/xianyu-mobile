<template>
  <div class="xianyu-publish">
    <back-top title="我的动态"></back-top>
    <div class="xianyu-my-publish-exble" v-if="hasPublishData">
      <dynamic-item
        v-for="(item, index) in dynamics"
        :key="item._id"
        :is-first="index === 0"
        :item-value="item"
        :delete-operate="true"
        @operate="operateHandle(item._id)"
      />
    </div>

    <van-empty :image="emptyImg" v-if="!hasPublishData && showTag" description="还没有发表过任何动态哟" />

    <van-popup v-model="showOperateView" position="bottom">
      <van-cell-group>
        <!-- 文本复制功能实现 -->
        <van-cell center value="复制">
          <Copy :content="copyContent" @copyCallback="copyCallback"></Copy>
        </van-cell>
        <van-cell 
          class="color-set" 
          center 
          value="删除"
          @click="deleteDynamic"
        />
      </van-cell-group>
      <div class="divide-line"></div>
      <van-cell-group>
        <van-cell 
          center 
          value="取消"
          @click="showOperateView = false"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { getOwnPublishedDynamics } from '@/api/user.js'
import { deleteDynamic } from '@/api/dynamic.js'
import DynamicItem from '@/components/DynamicItem/index.vue'
export default {
  name: 'MyPublish',

  data () {
    return {
      dynamics: [],
      total: 0,
      showOperateView: false,
      // 复制的文本内容
      copyContent: '',
      dynamicId: null,
      // 什么都没有的缺省图片
      emptyImg: require('../assets/images/empty-image-default.png'),
      // 缺省标记
      showTag: false
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },

    // 是否有发表的动态
    hasPublishData () {
      return this.dynamics.length > 0
    }
  },

  watch: {
    dynamics (newVal) {
      if (newVal.length <= 0) {
        this.showTag = true
      }
    }
  },

  mounted () {
    if (this.isLogin) {
      this.getOwnPublishedDynamicsHandle()
    }
  },

  methods: {
    async getOwnPublishedDynamicsHandle () {
      const result = await getOwnPublishedDynamics()
      if (result.errno === 0) {
        this.dynamics = result.data
        this.total = result.total
      }
    },

    copyCallback () {
      this.showOperateView = false
      this.$toast('复制成功')
      this.copyContent = ''
    },

    // 根据点击的id获取当前动态的内容
    operateHandle (id) {
      this.showOperateView = true
      this.dynamicId = id
      const index = this.dynamics.findIndex(item => item._id === id)
      this.copyContent = this.dynamics[index].content
    },

    // 删除动态
    deleteDynamic () {
      this.showOperateView = false
      this.$dialog.confirm({
        message: '<p style="font-size: 16px;line-height: 25px">确定删除该动态？</p>',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        confirmButtonColor: '#000',
        cancelButtonText: '取消',
        cancelButtonColor: '#666'
      }).then(async () => {
        const result = await deleteDynamic(this.dynamicId)
        if (result.errno === 0) {
          this.$toast('删除成功')
          const index = this.dynamics.findIndex(item => item._id === this.dynamicId)
          if (index > -1) {
            this.dynamics.splice(index, 1)
          }
          this.dynamicId = null
          this.copyContent = ''
        }
      }).catch(err => { console.log(err) })
    }
  },

  components: {
    DynamicItem
  }
}
</script>

<style scoped lang="scss">
.xianyu-publish {
  background-color: #F0F5FB;
  .color-set {
    /deep/ .van-cell__value {
      color: #e92322;
    }
  }

  /deep/ .van-cell {
    &__value {
      text-align: center;
      font-size: 15px;
    }
  }

  /deep/ .van-cell::after {
    left: 0;
    right: 0;
  }

  /deep/ .copy {
    button {
      background-color: #fff!important;
      color: #000!important;
      font-size: 15px!important;
    }
  }

  /deep/ .van-empty {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 150px;
  }
}
.divide-line {
  width: 100%;
  height: 5px;
  background-color: rgba(38, 38, 38, .2);
}

.xianyu-my-publish-exble {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f5fb;
  overflow-y: auto;
}
</style>
