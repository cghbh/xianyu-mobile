<template>
  <div class="xianyu-userinfo-edit">
    <back-top title="我的资料"></back-top>
    <div class="xianyu-userinfo-avatar" @click="modifyUserAvatar">
      <span>头像</span>
      <van-image 
        :src="userInfo.avatar_url && userInfo.avatar_url" 
        width="45"
        height="45"
        round
        object-fit="cover"
      />

      <!-- image/*表示接受所有的图片类型的文件 -->

      <input 
        ref="avatar" 
        type="file" 
        accept="image/*" 
        hidden
        @change="avatarFileChange"
      >
    </div>

    <divide-area></divide-area>

    <div class="xianyu-userinfo-bg" @click="modifyBackground">
      <span>背景墙</span>
      <van-image 
        :src="userInfo.background && userInfo.background"
        width="90"
        height="45"
        object-fit="cover"
      />
      <input 
        ref="background" 
        type="file" 
        accept="image/*" 
        hidden
        @change="backgroundFileChange"
      >
    </div>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell 
        @click="showNickname" 
        class="xianyu-user-edit-vant" 
        is-link 
        title="昵称" 
        :value="userInfo.nickname" />
      <van-cell 
        @click.native="showSexEditHandle" 
        class="xianyu-user-edit-vant" 
        is-link 
        title="性别" 
        :value="userInfo.gender && userInfo.gender === 'male' ? '男' : '女'" />
      <van-cell 
        @click="showBirthModel" 
        class="xianyu-user-edit-vant" 
        is-link title="生日" 
        :value="userInfo.birth"/>
      <van-cell 
        @click="showEmailModel" 
        class="xianyu-user-edit-vant" 
        is-link 
        title="邮箱" 
        :value="userInfo.email ? userInfo.email : '还没有填写邮箱哟'" />
    </van-cell-group>

    <divide-area></divide-area>

    <van-cell-group>
      <van-cell 
        class="xianyu-user-edit-vant" 
        @click="showAddressEdit = true" 
        is-link title="地区" 
        :value="userInfo.location" />
      <van-cell 
        class="xianyu-user-edit-vant xianyu-person-sign" 
        @click="showPersonSignModel" 
        is-link title="个性签名" 
        :value="userInfo.personal_sign" />
    </van-cell-group>

    <divide-area></divide-area>

    <!-- 头像编辑 -->
    <van-popup v-model="showAvatarEdit" style="height: 100%; width: 100%;display: flex;align-items:center;">
      <avatar-cropper
        :file="avatarFile"
        @cancel="showAvatarEdit = false"
        @confirm="userConfirmEditAvatar"
      />
    </van-popup>

    <!-- 背景图片编辑 -->
    <van-popup v-model="showBackgroundEdit" style="height: 100%; width: 100%;display: flex;align-items:center;">
      <background-cropper
        :file="backgroundFile"
        @cancel="showBackgroundEdit = false"
        @confirm="confirmModifyBackground"
      />
    </van-popup>

    <!-- 昵称编辑 -->
    <van-popup v-model="showNicknameEdit">
      <edituser-edit
        v-model="nickname"
        title="昵称"
        placeholder="请输入10个字以内的昵称"
        :maxlength="10"
        @cancel="showNicknameEdit = false"
        @confirm="nicknameEdit"></edituser-edit>
    </van-popup>

    <!-- 性别编辑 -->
    <van-popup v-model="showSexEdit">
      <van-radio-group v-model="sexRadio" class="xianyu-sex-radio-group">
        <van-cell-group>
          <van-cell title="男" clickable @click="sexEdit('男')">
            <template #right-icon>
              <van-radio name="男" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="sexEdit('女')">
            <template #right-icon>
              <van-radio name="女" />
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
        @cancel="showBirthEdit = false"
        @confirm="userBirthConfirm"
      />
    </van-popup>

    <!-- 邮箱编辑 -->
    <van-popup v-model="showEmailEdit">
      <edituser-edit
        v-model="email"
        title="邮箱"
        placeholder="请输入邮箱"
        @cancel="showEmailEdit = false"
        @confirm="emailEdit"></edituser-edit>
    </van-popup>

    <!-- 地区编辑 -->
    <van-popup v-model="showAddressEdit" position="bottom" overlay-class="edit-address-overlay">
      <van-area 
        title="标题" 
        :area-list="areaList" 
        :value="address"
        @cancel="showAddressEdit = false"
        @confirm="confirmModifyAddress" />
    </van-popup>

    <!-- 个性签名 -->
    <van-popup v-model="showPersonSignEdit">
      <edituser-edit
        v-model="person_sign"
        title="个性签名"
        placeholder="请输入25个字以内的个性签名"
        :maxlength="25"
        @cancel="showPersonSignEdit = false"
        @confirm="userModifyPersonalSign"></edituser-edit>
    </van-popup>
  </div>
</template>

<script>
import areaList from '@/assets/city/area.js'
import EdituserEdit from '@/components/EditUserItem/index.vue'
import AvatarCropper from '@/components/UserInfoEdit/UserAvatar.vue'
import BackgroundCropper from '@/components/UserInfoEdit/UserBackground.vue'
import dayjs from 'dayjs'
import { getUserInfoById, modifyUserInfo, fileUploads } from '@/api/user.js'
// 导入图片裁切的文件

export default {
  name: 'UserInfoEdit',
  data () {
    return {
      showAvatarEdit: false,
      // 头像预览
      avatarPreview: null,
      // 头像文件的内容
      avatarFile: null,
      // 背景图片的修改模态框
      showBackgroundEdit: false,
      // 背景图片的预览
      backgroundPreview: null,
      // 背景图片的原始消息
      backgroundFile: null,
      // 编辑昵称的模态
      showNicknameEdit: false,
      nickname: '',
      showSexEdit: false,
      showAddressEdit: false,
      address: '110101',
      sexRadio: '男',
      showBirthEdit: false,
      // 生日可选最大日期和最小的日期已经当前日期
      birth: new Date(1922, 9, 1),
      minDate: new Date(1922, 9, 1),
      maxDate: new Date(2022, 9, 1),
      showEmailEdit: false,
      email: '',
      showPersonSignEdit: false,
      person_sign: '',
      areaList: areaList,
      // 用户的个人信息
      userInfo: {},
      // 图片裁切Cropper的实例
      cropper: null
    }
  },
  watch: {
    sexRadio () {
      this.showSexEdit = false
    }
  },

  computed: {
    userId () {
      return this.$store.state.token.userId
    }
  },

  mounted () {
    this.getUserInfoHandle()
  },

  methods: {
    // 获取用户信息
    async getUserInfoHandle () {
      const result = await getUserInfoById(this.userId)
      if (result.errno === 0) {
        this.userInfo = result.data
      }
    },

    // 修改用户的头像
    modifyUserAvatar () {
      // 触发文件的点击事件
      this.$refs.avatar.click()
    },

    // 修改背景图片
    modifyBackground () {
      this.$refs.background.click()
    },

    // 监听上传头像文件改变
    avatarFileChange () {
      const newFile = window.URL.createObjectURL(this.$refs.avatar.files[0])
      this.avatarPreview = newFile
      this.avatarFile = this.$refs.avatar.files[0]
      this.showAvatarEdit = true
      // 防止相同图片不触发
      this.$refs.avatar.value = ''
    },

    // 监听上传背景图片的改变
    backgroundFileChange () {
      const newFile = window.URL.createObjectURL(this.$refs.background.files[0])
      this.backgroundPreview = newFile
      this.backgroundFile = this.$refs.background.files[0]
      this.showBackgroundEdit = true
      this.$refs.background.value = ''
    },

    // 用户确定上传头像
    async userConfirmEditAvatar (file) {
      this.$toast.loading({
        message: '正在上传中...',
        forbidClick: true
      })
      const fd = new FormData()
      fd.append('file', file)
      const result = await fileUploads(fd)
      if (result.errno === 0) {
        const avatarUrl = result.data.img_url
        const newResult = await modifyUserInfo(this.userId, { avatar_url: avatarUrl })
        if (result.errno === 0) {
          this.$toast.success('头像修改成功')
          this.$set(this.userInfo, 'avatar_url', newResult.data.avatar_url)
          setTimeout(() => {
            this.showAvatarEdit = false
          }, 20)
        } else {
          this.$toast.fail('头像修改失败')
          setTimeout(() => {
            this.showAvatarEdit = false
          }, 20)
        }
      } else {
        this.$toast.fail('头像修改失败')
        this.showAvatarEdit = false
      }
    },

    // 确定上传背景图片
    async confirmModifyBackground (file) {
      this.$toast.loading({
        message: '正在上传中...',
        forbidClick: true
      })
      const fd = new FormData()
      fd.append('file', file)
      const result = await fileUploads(fd)
      if (result.errno === 0) {
        const background = result.data.img_url
        const newResult = await modifyUserInfo(this.userId, { background })
        if (result.errno === 0) {
          this.$toast.success('背景修改成功')
          this.$set(this.userInfo, 'background', newResult.data.background)
          setTimeout(() => {
            this.showBackgroundEdit = false
          }, 20)
        } else {
          this.$toast.fail('背景修改失败')
          setTimeout(() => {
            this.showBackgroundEdit = false
          }, 20)
        }
      } else {
        this.$toast.fail('背景修改失败')
        this.showBackgroundEdit = false
      }
    },

    // 展示编辑昵称的模块
    showNickname () {
      this.showNicknameEdit = true
      this.nickname = this.userInfo.nickname
    },

    // 编辑昵称
    async nicknameEdit () {
      if (!this.nickname.trim()) {
        return this.$toast('昵称不能为空内容！')
      }
      const result = await modifyUserInfo(this.userId, { nickname: this.nickname })
      if (result.errno === 0) {
        this.$toast('昵称修改成功')
        this.showNicknameEdit = false
        this.$set(this.userInfo, 'nickname', this.nickname)
      }
    },

    // 显示性别编辑框
    showSexEditHandle () {
      console.error(1111)
      this.showSexEdit = true
      this.userInfo.gender === 'male' ? this.sexRadio = '男' : this.sexRadio = '女'
    },

    // 性别编辑操作
    async sexEdit (value) {
      let sex = ''
      value === '男' ? (sex = 'male') : (sex = 'famale')
      const result = await modifyUserInfo(this.userId, { gender: sex })
      if (result.errno === 0) {
        this.$toast('性别修改成功')
        this.showSexEdit = false
        setTimeout(() => {
          this.$set(this.userInfo, 'gender', sex)
        }, 30)
      }
    },

    // 展示修改生日的模态框
    showBirthModel () {
      const newTime = dayjs(this.userInfo.birth)
      this.birth = newTime.$d
      this.showBirthEdit = true
    },

    // 确定修改生日
    async userBirthConfirm () {
      const newTime = dayjs(this.birth).format('YYYY-MM-DD')
      const result = await modifyUserInfo(this.userId, { birth: newTime })
      if (result.errno === 0) {
        this.$toast('生日修改成功')
        this.showBirthEdit = false
        this.$set(this.userInfo, 'birth', newTime)
      }
    },

    // 显示邮箱编辑模态框
    showEmailModel () {
      this.email = this.userInfo.email
      this.showEmailEdit = true
    },

    // 编辑邮箱
    async emailEdit () {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.email)) {
        return this.$toast('邮箱的格式不正确，请检查后重试！')
      }
      const result = await modifyUserInfo(this.userId, { email: this.email })
      if (result.errno === 0) {
        this.$toast('邮箱修改成功')
        this.showEmailEdit = false
        this.$set(this.userInfo, 'email', this.email)
      }
    },

    // 修改地址
    async confirmModifyAddress (value) {
      let location = ''
      if (value[0].name === value[1].name) {
        location = value[0].name + value[2].name
      } else {
        location = value[0].name + value[1].name + value[2].name
      }
      const result = await modifyUserInfo(this.userId, { location })
      if (result.errno === 0) {
        this.$toast('地址修改成功')
        this.showAddressEdit = false
        this.$set(this.userInfo, 'location', location)
      }
    },

    // 展示个性签名的模态框
    showPersonSignModel () {
      this.showPersonSignEdit = true
      this.person_sign = this.userInfo.personal_sign
    },

    // 修改个性签名
    async userModifyPersonalSign () {
      const result = await modifyUserInfo(this.userId, { personal_sign: this.person_sign })
      if (result.errno === 0) {
        this.$toast('个性签名修改成功')
        this.showPersonSignEdit = false
        this.$set(this.userInfo, 'personal_sign', this.person_sign)
      }
    }
  },
  components: {
    EdituserEdit,
    AvatarCropper,
    BackgroundCropper
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

.xianyu-user-edit-vant  {
  /deep/ .van-cell__title {
    flex: 1;
  }

  /deep/ .van-cell__value {
    flex: 3;

    span {
      font-size: 15PX;
    }
  }
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

.xianyu-userinfo-avatar {
  display: flex;
  padding: 10px 16px;
  background-color: #fff;
  justify-content: space-between;

  span {
    line-height: 45px;
    font-size: 16px;
  }

  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
  }
}

.xianyu-userinfo-bg {
  display: flex;
  padding: 10px 16px;
  background-color: #fff;
  justify-content: space-between;

  span {
    line-height: 45px;
    font-size: 16px;
  }

  img {
    max-width: 100px;
    height: 45px;
    object-fit: cover;
  }
}
</style>
