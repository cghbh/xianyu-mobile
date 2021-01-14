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
        :is-like="isLogin && userZanedId.includes(item._id)"
        @unlike="userCancelZan(item._id)"
        @like="userZanHandle(item._id)"
        @operate="operateHandle(item._id)"
      />
    </div>

    <van-empty :image="emptyImg" v-if="!hasPublishData && showTag" description="还没有发表过任何动态哟" />

    <van-popup v-model="showOperateView" position="bottom">
      <van-cell-group>
        <!-- 文本复制功能实现 -->
        <!-- <van-cell center value="复制"> -->
          <Copy class="user-copy" :content="copyContent" @copyCallback="copyCallback">复制</Copy>
        <!-- </van-cell> -->
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
import { getOwnPublishedDynamics, unlikeDynamics, likeDynamics } from '@/api/user.js'
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
      showTag: false,
      // 点击操作的动态
      selectDynamic: {}
    }
  },

  computed: {
    isLogin () {
      return this.$store.state.token.token
    },

    // 是否有发表的动态
    hasPublishData () {
      return this.dynamics.length > 0
    },

    // 从vuex取得所有点赞过的动态id
    userZanedId () {
      return this.$store.state.loginUserZanDynamicsId
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
      this.selectDynamic = this.dynamics[index]
      this.copyContent = this.selectDynamic.content
    },

    // 删除动态
    deleteDynamic () {
      this.showOperateView = false
      this.$dialog.confirm({
        width: '315px',
        confirmButtonColor: '#666',
        cancelButtonColor: '#e92322',
        confirmButtonText: '取消',
        cancelButtonText: '确定',
        allowHtml: true,
        message: '<h1 style="color: #555; line-height: 24px;font-size:16px">确定要删除这条动态吗？</h1>'
      })
        .then(() => {})
        .catch(async () => {
          const result = await deleteDynamic(this.dynamicId)
          if (result.errno === 0) {
            this.$toast('删除成功')
            const index = this.dynamics.findIndex(item => item._id === this.dynamicId)
            if (index > -1) {
              this.dynamics.splice(index, 1)
            }
            // 找到Vuex里面的数据进行删除和修改
            const newLatestDynamics = JSON.parse(JSON.stringify(this.$store.state.latestDynamics))
            const newRecommendDynamics = JSON.parse(JSON.stringify(this.$store.state.recommendDynamics))
            let latestTotal = newLatestDynamics.total
            let recommendTotal = newRecommendDynamics.total
            const newLatestData = newLatestDynamics.data
            const newRecommendData = newRecommendDynamics.data
            const latestIndex = newLatestData.findIndex(item => item._id === this.selectDynamic._id)
            const recommendIndex = newRecommendData.findIndex(item => item._id === this.selectDynamic._id)
            if (latestIndex > -1) {
              newLatestData.splice(latestIndex, 1)
            }
            if (recommendIndex > -1) {
              newRecommendData.splice(recommendIndex, 1)
            }
            latestTotal -= 1
            recommendTotal -= 1
            this.$store.commit('modifyLatestDynamics', { data: newLatestData, total: latestTotal })
            this.$store.commit('modifyRecommendDynamics', { data: newRecommendData, total: recommendTotal })
            this.dynamicId = null
            this.copyContent = ''
          }
        })
    },

    // 用户取消点赞
    async userCancelZan (id) {
      const result = await unlikeDynamics(id)
      if (result.errno === 0) {
        const zanIdArray = JSON.parse(JSON.stringify(this.userZanedId))
        const zanIdIndex = zanIdArray.indexOf(id)
        const index = this.dynamics.findIndex(item => item._id === id)
        // 深度拷贝隔离
        if (zanIdIndex > -1) {
          zanIdArray.splice(zanIdIndex, 1)
          this.$store.commit('updateLoginUserZanDynamicsId', zanIdArray)
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${index}`]))
          newDynamic.zan_number--
          this.$set(this.dynamics, index, newDynamic)
          // 找到store中的最新和推荐数据进行修改
          const recommendDynamics = JSON.parse(JSON.stringify(this.$store.state.recommendDynamics)).data
          const latestDynamics = JSON.parse(JSON.stringify(this.$store.state.latestDynamics)).data
          const recommendIndex = recommendDynamics.findIndex(item => item._id === id)
          const latestIndex = latestDynamics.findIndex(item => item._id === id)
          if (recommendIndex > -1) {
            recommendDynamics[recommendIndex].zan_number--
          }
          if (latestIndex > -1) {
            latestDynamics[latestIndex].zan_number--
          }
          this.$store.commit('modifyRecommendDynamics', { data: recommendDynamics })
          this.$store.commit('modifyLatestDynamics', { data: latestDynamics })
        }
      }
    },

    // 用户点赞
    async userZanHandle (id) {
      // 判断用户是否登录，没有登录的话跳转到登录页面，并且携带当前的路径
      if (!this.isLogin) {
        this.$dialog.confirm({
          message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonColor: '#409fea',
          cancelButtonText: '取消',
          cancelButtonColor: '#666'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(err => { console.log(err) })
      } else {
        const result = await likeDynamics(id)
        if (result.errno === 0 && !this.userZanedId.includes(id)) {
          const zanIdArray = JSON.parse(JSON.stringify(this.$store.state.loginUserZanDynamicsId))
          zanIdArray.push(id)
          this.$store.commit('updateLoginUserZanDynamicsId', zanIdArray)
          const detailIndex = this.dynamics.findIndex(item => item._id === id)
          const newDynamic = JSON.parse(JSON.stringify(this.dynamics[`${detailIndex}`]))
          newDynamic.zan_number++
          this.$set(this.dynamics, detailIndex, newDynamic)
          // 找到store中的最新和推荐数据进行修改
          const recommendDynamics = JSON.parse(JSON.stringify(this.$store.state.recommendDynamics)).data
          const latestDynamics = JSON.parse(JSON.stringify(this.$store.state.latestDynamics)).data
          const recommendIndex = recommendDynamics.findIndex(item => item._id === id)
          const latestIndex = latestDynamics.findIndex(item => item._id === id)
          if (recommendIndex > -1) {
            recommendDynamics[recommendIndex].zan_number++
          }
          if (latestIndex > -1) {
            latestDynamics[latestIndex].zan_number++
          }
          this.$store.commit('modifyRecommendDynamics', { data: recommendDynamics })
          this.$store.commit('modifyLatestDynamics', { data: latestDynamics })
        }
      }
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

.user-copy {
  padding: 10px 16px;
  font-size: 15px;
  text-align: center;
  line-height: 25px;
  border-bottom: 1px solid #eaeaea;
  box-sizing: border-box;
}
</style>
