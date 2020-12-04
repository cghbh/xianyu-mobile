<template>
  <div class="xianyu-userinfo-edit">
    <back-top title="我的资料"></back-top>

    <van-cell-group>
      <van-cell class="xianyu-upload-avatar" title="头像" value="内容" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell class="xianyu-upload-bgurl" title="背景墙" value="内容" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell @click="showNicknameEdit = true" class="xianyu-user-edit-vant" is-link title="昵称" value="愚蠢的兔子" />
      <van-cell @click="showSexEditHandle" class="xianyu-user-edit-vant" is-link title="性别" value="男" />
      <van-cell @click="showBirthEdit = true" class="xianyu-user-edit-vant" is-link title="生日" value="1995-08-20"/>
      <van-cell @click="showEmailEdit = true" class="xianyu-user-edit-vant" is-link title="邮箱" value="914539467@qq.com" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell class="xianyu-user-edit-vant" @click="showAddressEdit = true" is-link title="地区" value="湖北省荆州市公安县" />
      <van-cell class="xianyu-user-edit-vant xianyu-person-sign" @click="showPersonSignEdit = true" is-link title="个性签名" value="我的人参我自己主宰我的人参我自己主宰我的己主宰我的" />
    </van-cell-group>

    <divide-area></divide-area>

    <!-- 昵称编辑 -->
    <van-popup v-model="showNicknameEdit">
      <edituser-edit
        v-model="nickname"
        title="昵称"
        placeholder="请输入10个字以内的昵称"
        :maxlength="10"
        @cancel="showNicknameEdit = false"
        @confirm="showNicknameEdit = false"></edituser-edit>
    </van-popup>

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
          <van-cell title="保密" clickable @click="sexRadio = '保密'">
            <template #right-icon>
              <van-radio name="保密" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <!-- 生日编辑 -->
    <van-popup v-model="showBirthEdit" position="bottom" overlay-class="edit-address-overlay">
      <van-datetime-picker
        type="date"
        title="选择年月日"
        v-model="birth"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <!-- 邮箱编辑 -->
    <van-popup v-model="showEmailEdit">
      <edituser-edit
        v-model="email"
        title="邮箱"
        placeholder="请输入邮箱"
        @cancel="showEmailEdit = false"
        @confirm="showEmailEdit = false"></edituser-edit>
    </van-popup>

    <!-- 地区编辑 -->
    <van-popup v-model="showAddressEdit" position="bottom" overlay-class="edit-address-overlay">
      <van-area title="标题" :area-list="areaList" value="110101" />
    </van-popup>

    <!-- 个性签名 -->
    <van-popup v-model="showPersonSignEdit">
      <edituser-edit
        v-model="email"
        title="个性签名"
        placeholder="请输入25个字以内的个性签名"
        :maxlength="25"
        @cancel="showPersonSignEdit = false"
        @confirm="showPersonSignEdit = false"></edituser-edit>
    </van-popup>
  </div>
</template>

<script>
import areaList from '@/assets/city/area.js'
import EdituserEdit from '@/components/EditUserItem/index.vue'
export default {
  name: 'UserInfoEdit',
  data () {
    return {
      // 编辑昵称的模态
      showNicknameEdit: false,
      nickname: '',
      showSexEdit: false,
      showAddressEdit: false,
      sexRadio: '男',
      showBirthEdit: false,
      // 生日可选最大日期和最小的日期已经当前日期
      birth: new Date(1995, 7, 1),
      minDate: new Date(1922, 9, 1),
      maxDate: new Date(2022, 9, 1),
      showEmailEdit: false,
      email: '',
      showPersonSignEdit: false,
      person_sign: '',
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
  },
  components: {
    EdituserEdit
  }
}
</script>

<style scoped lang="scss">
.xianyu-userinfo-edit {
  height: 100%;
  background-color: rgba(38, 38, 38, .05);

  /deep/ .divide-area {
    background-color: transparent;
  }

  /deep/ .van-popup {
    border-radius: 3px;
  }
}
.xianyu-upload-avatar {
  line-height: 45px;
  font-size: 16px;
}
.xianyu-upload-bgurl {
  line-height: 45px;
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
  width: 280px;

  .van-cell {
    line-height: 32px;
  }
}

// vant的overlay样式需要深作用域才能有效
.xianyu-userinfo-edit /deep/ .edit-address-overlay {
  background-color: rgba(0,0,0,.5);
}

.xianyu-person-sign {
  /deep/ .van-cell__title {
    flex: 1;
  }
  /deep/ .van-cell__value {
    flex: 3;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
