<template>
  <div class="xianyu-feedback">
    <back-top title="意见反馈"></back-top>
    <div class="xianyu-feedback-container">
      <van-field
        v-model="message"
        rows="1"
        autosize
        class="xianyu-feedback-container-logs"
        type="textarea"
        placeholder="请把您宝贵的意见反馈给我们吧......"
      />
      <divide-area></divide-area>
      <divide-area></divide-area>
      <van-field
        :error-message="!checkTelephone && telephone ? '请输入正确的手机号' : ''"
        class="xianyu-feedback-container-tel"
        v-model="telephone"
        type="tel"
        placeholder="如果可以请留下您的手机号"/>
      <divide-area></divide-area>
      <divide-area></divide-area>
      <divide-area></divide-area>
      <divide-area></divide-area>
      <div class="xianyu-feedback-submit">
        <van-button type="primary" color="#409fea" block @click="submit">提交</van-button>
      </div>
      <van-loading v-if="loading" type="spinner" size="24px" color="#444">提交中......</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data () {
    return {
      message: '',
      telephone: '',
      loading: false
    }
  },
  computed: {
    checkTelephone () {
      const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
      return reg.test(this.telephone)
    }
  },
  methods: {
    submit () {
      if (!this.message) {
        return this.$toast('请输入反馈内容')
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$toast({
          message: '提交成功',
          duration: 1500
        })
      }, 3000)
    }
  }
}

</script>

<style scoped lang="scss">
.xianyu-feedback {
  &-container {
    padding: 25px 10px 10px 10px;
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F6F7FB;
    .xianyu-feedback-container-logs {
      min-height: 150px;
      padding: 0;
      padding: 8px 0 0 8px;
      box-shadow: 0 0 1px #ccc;
      border-radius: 2px;
      font-size: 16px;
    }

    /deep/ .divide-area {
      background-color: #F6F7FB;
    }

    /deep/ .van-loading {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 280px;
      left: 0;
      right: 0;
    }
    /deep/ .van-loading__text {
      display: flex;
      align-items: center;
      color: #444;
    }

    .xianyu-feedback-container-tel {
      font-size: 16px;
      border-radius: 2px;
      box-shadow: 0 0 1px #ccc;
      padding-left: 8px;
    }
  }
}

.xianyu-feedback-submit {
  /deep/ .van-button {
    font-size: 16px;
    border-radius: 5px;
  }
}
</style>
