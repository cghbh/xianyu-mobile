<template>
  <div class="xianyu-edit-user-com">
    <h1 class="xianyu-edit-user-com-title">修改{{ title }}</h1>
    <input
      class="xianyu-edit-user-com-input"
      :maxlength="maxlength"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="inputChange"
      v-focus>
    <div class="xianyu-edit-user-com-container">
      <span class="xianyu-edit-user-com-container-cancel" @click="handleCancel">取消</span>
      <span class="xianyu-edit-user-com-container-confirm" @click="handleConfirm">确定</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUserItem',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    maxlength: {
      type: Number,
      default: 100
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  methods: {
    handleCancel () {
      this.$emit('cancel')
    },
    handleConfirm () {
      this.$emit('confirm')
    },
    inputChange (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.xianyu-edit-user-com {
  width: 300px;
  height: 175px;
  padding: 24px 20px;
  box-sizing: border-box;
  position: relative;

  &-title {
    font-size: 20px;
  }

  &-input {
    margin-top: 25px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .3);
    width: 100%;
    font-size: 16px;
    padding-bottom: 8px;
    color: #000;
  }

  &-input::placeholder {
    color: #999;
  }

  &-container {
    position: absolute;
    bottom: 24px;
    right: 30px;
    font-size: 16px;
    color: #409fea;
    &-cancel {
      margin-right: 45px;
    }
  }
}
</style>
