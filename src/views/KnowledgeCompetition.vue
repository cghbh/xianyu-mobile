<template>
  <div class="knowledge-competition">
    <van-sticky>
      <van-nav-bar title="趣味答题" sticky left-arrow @click-left="back">
        <template #left>
          <div class="back-container">
            <i class="iconfont icon-left"></i>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 答题区 -->
    <div class="question-container">
      <div class="question-container-area" v-if="!showResult">
        <div class="question-container-area-progress">
          <van-circle
            :rate="100"
            :speed="100"
            :value="activeIndex / totalQuestions * 100"
            :text="`${activeIndex}/${totalQuestions}`"
            size="50px"
            layer-color="#CFDAE6"
            fill="#fff"
            color="#409fea"
            stroke-width="75"
          />
        </div>
        <div class="question-container-area-subject">
          <div class="question-container-area-subject-title">
            {{ activeQuestion && activeQuestion.question_title }}
          </div>
          <div
            class="question-container-area-subject-option"
            :class="{ 'selecting': selectOptions.includes(item.option), 'disabled': disabled, 'error': false, 'right': rightAnswer && rightAnswer === item.option, 'error': rightAnswer && rightAnswer !== selectOptions.join('') && selectOptions.includes(item.option) }"
            @click="selectOption(item.option)"
            v-for="item in activeQuestion && activeQuestion.question_options"
            :key="item._id">
            <div :class="{ 'error': false, 'right': rightAnswer && rightAnswer === item.option, 'error': rightAnswer && rightAnswer !== selectOptions.join('') && selectOptions.includes(item.option), 'content': true }">
              <span>{{ item.option }}</span>
              <span>{{ item.option_title }}</span>
            </div>
            <div class="iconfont-container">
              <img src="../assets/images/icon-check-circle-fill.svg" class="icon-check-circle-fill">
              <img src="../assets/images/icon-close-circle-fill.svg" class="icon-close-circle-fill">
            </div>
          </div>
        </div>
      </div>

      <div class="result-display" v-if="showResult">
        <img src="../assets/images/courage.png">
        <h1>答对{{ rightNumber }}题，共{{ totalQuestions }}题</h1>
        <p>超过<span>10%</span>的人</p>
      </div>

      <!-- 确定按钮用来判断答案 -->
      <div class="question-container-button" v-if="!isNext && !isCompleted" :class="{ 'disabled': selectOptions.length === 0 }" @click="confirm">
        确定
      </div>
      <!-- 下一题按钮用来跳转到下一个题目 -->
      <div class="question-container-button" v-if="isNext" @click="next">下一题</div>
      <div class="question-container-button" v-if="isCompleted" @click="complete">完成</div>
    </div>
  </div>
</template>

<script>
import { getSubjects } from '@/api/subject.js'
export default {
  name: 'KnowledgeCompetition',
  data () {
    return {
      // 当前是第几题
      activeIndex: 1,
      // 选择的选项
      selectOptions: [],
      isNext: false,
      // 选项是否还可以继续点击
      disabled: false,
      // 正确答案，点击之后获取比对
      rightAnswer: '',
      // 是否答完
      isCompleted: false,
      // 展示结果
      showResult: false,
      showResultTag: 0,
      // 答对的题目数量
      rightNumber: 0,
      // 获取的题目
      subjects: []
    }
  },
  computed: {
    // 正在回答的题目
    activeQuestion () {
      return this.subjects[this.activeIndex - 1]
    },
    // 总的题目数量
    totalQuestions () {
      return this.subjects.length
    },
    // 是否单选
    isSingle () {
      return true
    },
    rightRate () {
      return `${parseInt((this.rightNumber / this.totalQuestions * 100))}%`
    }
  },
  mounted () {
    this.getSubjectsHandle()
  },
  methods: {
    back () {
      this.$dialog.confirm({
        message: '确定要退出答题？\n退出后当前答题进度将不被保存',
        confirmButtonText: '继续答题',
        confirmButtonColor: '#409fea',
        cancelButtonText: '确定',
        cancelButtonColor: '#999'
      })
        .then(() => {})
        .catch(() => {
          this.$router.push('/')
        })
    },
    async getSubjectsHandle () {
      const result = await getSubjects()
      if (result.errno === 0) {
        this.subjects = result.data
      }
    },
    selectOption (item) {
      if (this.isSingle) {
        // 如果没有当前没有选择就选择一个
        if (this.selectOptions.length <= 0) {
          this.selectOptions.push(item)
          // 如果选择的已存在说明是取消的操作
        } else if (this.selectOptions.includes(item)) {
          const index = this.selectOptions.indexOf(item)
          this.selectOptions.splice(index, 1)
        } else if (this.selectOptions.length >= 1) {
          // 如果选择的超过一个,删除前面的一个，push进去一个新的选项
          this.selectOptions.pop()
          this.selectOptions.push(item)
        }
      }
    },
    confirm () {
      this.rightAnswer = this.activeQuestion.question_answer
      this.disabled = true
      if (this.rightAnswer === this.selectOptions.join('')) {
        this.rightNumber++
      }
      if (this.activeIndex >= this.totalQuestions) {
        this.isNext = false
        this.isCompleted = true
      } else {
        this.isNext = true
      }
    },
    next () {
      this.activeIndex++
      this.disabled = false
      this.rightAnswer = ''
      this.selectOptions = []
      this.isNext = false
    },
    complete () {
      this.showResult = true
      this.showResultTag++
      if (this.showResultTag % 2 === 0) {
        setTimeout(() => {
          this.$router.push('/')
        }, 800)
        this.$toast('正在退出中，请稍等')
      }
    }
  }
}
</script>

<style scoped lang="scss">
body /deep/ .van-dialog__message {
  color: red!important;
}
.back-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .iconfont {
    font-size: 21px;
    font-weight: 500;
    color: #fff;
  }
}

.knowledge-competition /deep/ .van-nav-bar {
  background-color: #409fea;
}

.knowledge-competition /deep/ .van-nav-bar__title {
  color: #fff;
}

.knowledge-competition /deep/ .van-hairline--bottom::after {
  border-bottom: none;
}

.knowledge-competition {
  height: 100%;
  overflow: hidden;
  background-color: #409fea;
}

.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 56px;
  &-area {
    width: 320px;
    height: 407px;
    border-radius: 8px;
    background-color: #fff;
    position: relative;
    padding-bottom: 15px;

    &-progress {
      position: absolute;
      padding: 4px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background-color: #fff;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0px 0px 3px #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-subject {
      padding: 45px 20px 0px 20px;

      &-title {
        margin-bottom: 15px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: #2E353E;
        letter-spacing: 0;
      }
      &-option {
        height: 60px;
        box-sizing: border-box;
        padding: 0 7px 0 10px;
        box-sizing: border-box;
        font-size: 15px;
        display: flex;
        align-items: center;
        line-height: 22px;
        justify-content: space-between;
        margin-bottom: 14px;

        .content {
          display: flex;
          font-size: 14px;
          color: #2E353E;
          flex: 1;
          span:first-of-type {
            width: 14px;
            margin-right: 2px;
          }

          span:last-of-type {
            flex: 1;
          }
        }

        .content.error {
          color: #e92322;
        }
        .content.right {
          color: #409fea;
        }

        .iconfont-container {
          width: 21px;
          height: 21px;

          .icon-close-circle-fill,
          .icon-check-circle-fill {
            width: 21px;
            height: 21px;
            display: none;
          }
        }
      }
      &-option.error {
        background: rgba(235,51,59,0.10)!important;
        border-radius: 2px;
        .icon-close-circle-fill {
          display: block;
        }
      }
      &-option.right {
        background: rgba(25,133,242,0.10)!important;
        border-radius: 2px;
        .icon-check-circle-fill {
          display: block;
        }

      }
      &-option.selecting {
        background: rgba(25,133,242,0.08);
        border-radius: 2px;
      }

      &-option.disabled {
        pointer-events: none;
      }
    }
  }

  &-button {
    background-image: linear-gradient(90deg, #FF4050 8%, #FF9EA6 100%);
    box-shadow: 0 15px 30px 0 rgba(196,41,54,0.38);
    width: 250px;
    height: 50px;
    margin-top: 50px;
    border-radius: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }

  &-button.disabled {
    background-image: linear-gradient(90deg, #bbb 8%, #eee 100%);
    pointer-events: none;
  }
}
.question-container /deep/ .van-circle__text {
  color: #409fea;
}

/* 结果展示区域CSS样式 */
.result-display {
  width: 320px;
  height: 407px;
  background-color: #fff;
  box-shadow: 0 6px 24px 6px rgba(10,60,216,0.33);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  h1 {
    font-family: PingFangSC-Medium;
    font-size: 25px;
    color: #222;
    letter-spacing: 0;
    text-align: center;
    margin-top: 20px;
  }

  p {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #666;
    letter-spacing: 0;
    text-align: center;
    line-height: 31px;
    margin-top: 20px;
  }
}
</style>
