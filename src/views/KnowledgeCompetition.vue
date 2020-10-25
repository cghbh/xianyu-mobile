<template>
  <div class="knowledge-competition">
    <van-nav-bar title="课后练习" left-text="返回" left-arrow @click-left="back">
      <template #left>
        <div class="back-container">
          <i class="iconfont icon-left"></i>
        </div>
      </template>
    </van-nav-bar>
    <!-- 答题区 -->
    <div class="question-container">
      <div class="question-container-area">
        <div class="question-container-area-progress">
          <!-- v-model="currentRate" -->
          <van-circle
            :value="activeSubjectIndex / totalSubject * 100"
            :rate="100"
            :speed="100"
            :text="`${activeSubjectIndex}/${totalSubject}`"
            size="50px"
            layer-color="#CFDAE6"
            fill="#fff"
            color="#409fea"
            stroke-width="75"
          />
        </div>
        <div class="question-container-area-subject">
          <div class="question-container-area-subject-title">
            <!-- 关于定向资产管理业务的内部控制，下列说法中正确的是（单选）： -->
            {{ activeSubject.title }}
          </div>
          <!-- :class="{ 'selecting': selectOption === value, 'disabled': disabled, 'error': rightAnswer && selectOption === value && selectOption !== rightAnswer, 'right': rightAnswer && selectOption === value && selectOption === rightAnswer }" -->
          <!-- // 选择的是正确答案添加的css属性 -->
          <!-- // 正确答案的判断:ABCD四个选项中,选中的是A,正确答案是A,item A selectOption A rightValue A -->
          <!-- // this.selectOptions === this.rightValue选中的就是正确的答案，那么当前选中的添加right属性，其他的不用处理 -->
          <!-- // this.selectOption !== this.rightValue 给正确的选项添加right属性，给已经选中的添加错误类属性 -->
          <div 
            class="question-container-area-subject-option"
            :class="{ 'right': selectOption === rightAnswer && value === rightAnswer || (selectOption !== value && rightAnswer === value), 'disabled': disabled, 'error': rightAnswer && selectOption !== rightAnswer && value === selectOption, 'selecting': selectOption === value && !disabled }"
            @click="getOption(value)" 
            v-for="(item, value) in activeSubject.question" 
            :key="value">
            <div class="content" :class="{ 'right': selectOption === rightAnswer && value === rightAnswer || (selectOption !== value && rightAnswer === value), 'disabled': disabled, 'error': rightAnswer && selectOption !== rightAnswer && value === selectOption }">
              <span>{{ value }}.</span>
              <span>{{ item }}</span>
            </div>
            <div class="iconfont-container">
              <img src="../assets/images/icon-check-circle-fill.svg" class="icon-check-circle-fill">
              <img src="../assets/images/icon-close-circle-fill.svg" class="icon-close-circle-fill">
            </div>
          </div>
        </div>
      </div>
      <div class="question-container-button" @click="submit">{{ buttonText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnowledgeCompetition',
  data () {
    return {
      // 当前是第几个问题
      activeSubjectIndex: 1,
      // 当前选中的选项
      selectOption: '',
      // 点击确定之后禁止重新选中
      disabled: false,
      // 错误的数量
      errorNumber: 0,
      // 正确答案
      rightAnswer: '',
      buttonText: '确定',
      // 用来标记当前点击的是下一题还是确定按钮，偶数-确定，奇数-下一题
      tag: 0,
      mockSubject: [
        {
          title: '关于定向资产管理业务的内部控制，下列说法中正确的是：',
          question: {
            A: '证券公司定向资产管理业务可以从事场外交易、网下申购等特殊交易',
            B: '证券公司发现定向资产管理业务出现重大问题，应及时向证交所报告',
            C: '证券公司应当由专门的部门负责资产管理业务',
            D: '证券公司应根据管理能力及风控水平，合理控制定向资产管理规模'
          },
          answer: 'A'
        },
        {
          title: '下列各项中，属于对上市公司进行监管的类型的是：',
          question: {
            A: '信息披露的监管',
            B: '公司治理监管',
            C: '内幕交易行为的监管',
            D: '并购重组的监管'
          },
          answer: 'C'
        },
        {
          title: '证券的流动性不能通过以下哪种方式实现?',
          question: {
            A: '贴现',
            B: '记账',
            C: '交易',
            D: '承兑'
          },
          answer: 'B'
        },
        {
          title: '关于有价证券的定义和特点，下列描述错误的是?',
          question: {
            A: '有价证券本身具备价值',
            B: '有价证券是虚拟资本的一种形式',
            C: '有价证券可以在证券市场上买卖和流通，客观上具有了交易价格',
            D: '有价证券价格总额并不等于所代表的真实资本的账面价格'
          },
          answer: 'A'
        },
        {
          title: '关于有价证券的定义和特点，下列描述错误的是?',
          question: {
            A: '有价证券本身具备价值',
            B: '有价证券是虚拟资本的一种形式',
            C: '有价证券可以在证券市场上买卖和流通，客观上具有了交易价格',
            D: '有价证券价格总额并不等于所代表的真实资本的账面价格'
          },
          answer: 'A'
        },
        {
          title: '关于有价证券的定义和特点，下列描述错误的是?',
          question: {
            A: '有价证券本身具备价值',
            B: '有价证券是虚拟资本的一种形式',
            C: '有价证券可以在证券市场上买卖和流通，客观上具有了交易价格',
            D: '有价证券价格总额并不等于所代表的真实资本的账面价格'
          },
          answer: 'A'
        }
      ]
    }
  },
  computed: {
    // 总共有几道题
    totalSubject () {
      return this.mockSubject.length
    },
    // 当前题
    activeSubject () {
      return this.mockSubject[this.activeSubjectIndex - 1]
    },
    // buttonText () {
    //   return this.tag % 2 === 0 ? '确定' : '下一题'
    // },
    // 选择的是正确答案添加的css属性
    // 正确答案的判断:ABCD四个选项中,选中的是A,正确答案是A,item -->A selectOption-->A rightValue---> A
    // this.selectOptions === this.rightValue选中的就是正确的答案，那么当前选中的添加right属性，其他的不用处理
    // this.selectOption !== this.rightValue 给正确的选项添加right属性，给已经选中的添加错误类属性
    rightClass () {
      return 1
    },
    // 选择的是错误的答案添加的css属性
    errorClass () {
      return 1
    }
  },
  methods: {
    getOption (value) {
      this.selectOption = value
    },
    // 提交判断答案
    submit () {
      // 这里加入用户不选择的操作Toast提示就可以了，不选择不能进入下一步
      // 第一题的操作
      if (this.activeSubjectIndex === 1) {
        console.log(1)
        this.disabled = true
        // 判断答案，设置跳转到下一题
        this.rightAnswer = this.activeSubject.answer
        this.buttonText = '下一题' 
      }
      // this.activeSubjectIndex++
    },
    back () {
      this.$dialog.confirm({
        width: '315px',
        confirmButtonColor: '#409fea',
        confirmButtonText: '继续答题',
        cancelButtonText: '确定',
        allowHtml: true,
        message: '<h1 style="color: #555; line-height: 24px;font-size:16px">确定要退出答题？\n退出后当前答题进度将不被保存</h1>'
      })
        .then(() => {})
        .catch(() => {
          this.$router.go(-1)
        })
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
      padding: 45px 20px 31px 20px;
      
      &-title {
        margin-bottom: 15px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
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
        background: rgba(235,51,59,0.10);
        border-radius: 2px;
        .icon-close-circle-fill {
          display: block;
        }
      }
      &-option.right {
        background: rgba(25,133,242,0.10);
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
    // background-image: linear-gradient(90deg, #FFAFBD 8%, #ffc3a0 100%);
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
}
.question-container /deep/ .van-circle__text {
  color: #409fea;
}
</style>
