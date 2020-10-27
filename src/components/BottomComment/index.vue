<template>
  <div class="bottom-comment" id="bottom-content">
    <div class="operate-container" v-if="!showInput">
      <input @click="showInputHandle" readonly placeholder="文明评论哟" type="text">
      <div class="icon-container">
        <div class="zan">
          <i class="iconfont icon-dianzan1" v-if="!isZan" @click="isZan = true"></i>
          <i class="iconfont icon-dianzan" :class="{ 'isZan': isZan }" v-else @click="isZan = false"></i>
          <span>{{ isZan ? 1 : '赞'}}</span>
        </div>
        <div class="collect">
          <i class="iconfont icon-shoucang" v-if="!isCollect" @click="isCollect = true"></i>
          <i class="iconfont icon-shoucang1" :class="{ 'isZan': isCollect }" v-else @click="isCollect = false"></i>
          <span>{{ isCollect ? 1 : '收藏'}}</span>
        </div>
      </div>
    </div>
    <div id="edit" class="edit-container" v-if="showInput" ref="edit">
      <div class="content-editable" v-focus placeholder="发表原创文字,沉淀灵感,留住思考" contenteditable="true" @input="divInput" :value="value" ></div>
      <div class="submit">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomComment',
  data () {
    return {
      value: '',
      showInput: false,
      // 是否点赞
      isZan: false,
      // 是否收藏
      isCollect: false
    }
  },
  methods: {
    divInput (e) {
      this.value = e.target.innerText
    },
    showInputHandle () {
      this.showInput = true
    }
  },
  mounted () {
    if (isAndroid()) {
      const innerHeight = window.innerHeight
      window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight
        if (innerHeight > newInnerHeight) {
          // 键盘弹出事件处理
        } else {
          // 键盘收起事件处理
          this.showInput = false
        }
      })
    } else if (isIOS()) {
      window.addEventListener('focusin', () => {
        // 键盘弹出事件处理
        // alert('iphone 键盘弹出事件处理')
        // this.$toast('弹起')
      })
      window.addEventListener('focusout', () => {
        // 键盘收起事件处理
        // alert('iphone 键盘收起事件处理')
        // this.$toast('下来')
        this.showInput = false
      })
    }
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

function isAndroid () {
  const ua = typeof window === 'object' ? window.navigator.userAgent : ''
  return /Android/i.test(ua)
}

function isIOS () {
  const ua = typeof window === 'object' ? window.navigator.userAgent : ''
  return /iPhone|iPod|iPad/i.test(ua)
}
</script>

<style scoped lang="scss">
.bottom-comment {
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  background-color: #f4f4f4;

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
      margin-right: 10px;
      border-radius: 4px;
      outline: none;
      border: none;
      padding-left: 10px;
    }

    input::placeholder {
      color: #aaa;
    }

    .icon-container {
      display: flex;
      min-width: 90px;
      justify-content: space-around;

      .zan {
        margin-right: 5px;
      }

      .zan,
      .collect {
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
    font-size: 15px;
    background-color: #fff;
    min-height: 30px;
    line-height: 20px;
    margin-right: 10px;
    padding: 5px 0 5px 5px;
    box-sizing: border-box;
    border-radius: 4px;
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
  }
}
</style>
