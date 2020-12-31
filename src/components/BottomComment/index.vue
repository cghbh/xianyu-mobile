<template>
  <div class="bottom-comment" id="bottom-content">
    <div class="operate-container" v-if="!showInput">
      <input @click="showInputHandle" readonly placeholder="记得要文明评论哟" type="text" :class="{ 'needicon': needicon }">
    </div>
    <div id="edit" class="edit-container" v-if="showInput" ref="edit">
      <!-- <div class="content-editable" v-focus placeholder="发表原创文字,沉淀灵感,留住思考" contenteditable="true" v-model="inputValue" ></div> -->
      <input class="content-editable" autofocus="autofocus" ref="input" :placeholder="placeholder ? '回复' + placeholder : '发表原创文字，沉淀灵感，留住思考'" v-focus type="text" v-model="inputValue">
      <div class="submit" @click="$emit('send')">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomComment',
  props: {
    needicon: {
      type: Boolean,
      default: true
    },
    // 上级组件v-model传递过来的，因为v-model可以拆分为@input和:value=的格式
    value: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      showInput: false,
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false
    }
  },

  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    divInput (e) {
      this.$emit('input', e.target.value)
    },
    
    showInputHandle () {
      this.showInput = true
    },

    isAndroid () {
      const ua = typeof window === 'object' ? window.navigator.userAgent : ''
      return /Android/i.test(ua)
    },

    isIOS () {
      const ua = typeof window === 'object' ? window.navigator.userAgent : ''
      return /iPhone|iPod|iPad/i.test(ua)
    },
    keyBoard () {
      // 事件监听明天要求实现卸载和函数封装的功能
      if (this.isAndroid()) {
        const innerHeight = window.innerHeight
        window.addEventListener('resize', () => {
          const newInnerHeight = window.innerHeight
          if (innerHeight > newInnerHeight) {
            // 键盘弹出事件处理
          } else {
            // 键盘收起事件处理
          }
        })
      } else if (this.isIOS()) {
        window.addEventListener('focusin', () => {
          // 键盘弹出事件处理
          this.showInput = true
        })
        window.addEventListener('focusout', () => {
          // 键盘收起事件处理
          this.showInput = false
        })
      }
    }
  },

  mounted () {
    // this.keyBoard()
  },

  directives: {
    // 自动获取输入的焦点
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bottom-comment {
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  background-color: #f7f7f7;

  .operate-container {
    display: flex;
    width: 100%;
    min-height: 50px;
    padding: 10px 10px;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;

    input {
      height: 30px;
      flex: 1;
      border-radius: 4px;
      outline: none;
      border: none;
      padding-left: 10px;
      font-size: 14px;
    }

    input.needicon {
      margin-right: 10px;
    }

    input::placeholder {
      color: #aaa;
      font-size: 13px;
    }

    .icon-container {
      display: flex;
      min-width: 48px;
      justify-content: space-around;

      .zan {
        margin-right: 5px;
      }

      .zan {
        display: flex;
        align-items: center;

        .iconfont {
          margin-right: 5px;
          font-size: 16px;
        }

        .iconfont.isZan {
          color: #409fea;
        }
        .iconfont.isCollect {
          color: #409fea;
        }

        span {
          font-size: 12px;
        }
      }
    }
  }

  .edit-container {
    min-height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;
  }

  .content-editable {
    flex: 1;
    outline: none;
    font-size: 14px;
    background-color: #fff;
    min-height: 30px;
    line-height: 20px;
    margin-right: 10px;
    padding: 5px 0 5px 5px;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    border: none;
  }

  .submit {
    width: 50px;
    height: 28px;
    background-color: #409fea;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 3px;
    font-size: 14px;
  }
}
</style>
