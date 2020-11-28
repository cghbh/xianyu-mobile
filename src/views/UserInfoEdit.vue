<template>
  <div class="xianyu-userinfo-edit">
    <van-sticky>
      <van-nav-bar title="编辑资料" sticky left-arrow @click-left="$router.go(-1)">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>

    <van-cell-group>
      <van-cell class="xianyu-upload-avatar" title="头像" value="内容" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell class="xianyu-user-edit-vant" is-link title="昵称" value="内容" />
      <van-cell @click="showSexEditHandle" class="xianyu-user-edit-vant" is-link title="性别" value="内容" />
      <van-cell class="xianyu-user-edit-vant" is-link title="生日" value="内容" />
      <van-cell class="xianyu-user-edit-vant" @click="showAddressEdit = true" is-link title="地区" value="内容" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell class="xianyu-user-edit-vant" is-link title="手机号" to="/bind-telephone" value="内容" />
      <van-cell class="xianyu-user-edit-vant" is-link title="邮箱" value="内容" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell class="xianyu-user-edit-vant" is-link title="个性签名" value="内容" />
    </van-cell-group>

    <!-- 性别编辑 -->
    <van-popup v-model="showSexEdit">
      <van-radio-group v-model="sexRadio" class="xianyu-sex-radio-group">
        <van-cell-group>
          <van-cell title="男" clickable @click="sexRadio = '男'">
            <template #right-icon>
              <van-radio name="男" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="sexRadio = '女'">
            <template #right-icon>
              <van-radio name="女" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <!-- 地区编辑 -->
    <van-popup v-model="showAddressEdit" position="bottom" overlay-class="edit-address-overlay">
      <van-area title="标题" :area-list="areaList" value="110101" />
    </van-popup>
  </div>
</template>

<script>
import areaList from '@/assets/city/area.js'
export default {
  name: 'UserInfoEdit',
  data () {
    return {
      showSexEdit: false,
      showAddressEdit: false,
      sexRadio: '男',
      areaList: areaList
    }
  },
  watch: {
    sexRadio () {
      this.showSexEdit = false
    }
  },
  methods: {
    showSexEditHandle () {
      this.showSexEdit = true
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-upload-avatar {
  line-height: 56px;
  font-size: 16px;
}
.xianyu-user-edit-vant {
  display: flex;
  align-items: center;
  line-height: 32px;
  font-size: 16px;

  .van-cell__right-icon {
    margin-left: 8px;
  }
}

.xianyu-sex-radio-group {
  color: red;
  width: 250px;

  .van-cell {
    line-height: 32px;
  }
}

// vant的overlay样式需要深作用域才能有效
.xianyu-userinfo-edit /deep/ .edit-address-overlay {
  background-color: rgba(0,0,0,.5);
}
</style>
