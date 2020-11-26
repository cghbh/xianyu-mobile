<template>
  <div class="dynamic-publish">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <i name="right" class="iconfont icon-fabu" @click="publish"></i>
      </template>
      <template #left>
        <i name="left" class="iconfont icon-left" @click="back"></i>
      </template>
    </van-nav-bar>
    <div class="dynamic-publish-container">
      <div class="content-editable" placeholder="发表原创文字,沉淀灵感,留住思考" contenteditable="true" @input="divInput" :value="inputValue" ></div>
      <div class="uploader-container">
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          :before-read="beforeRead"
          :max-count="9"
          preview-size="105px"
          multiple
          @delete="deleteImg"
        />
      </div>
      <div class="private">
        <div class="private-lock">
          <i class="iconfont icon-22suo"></i>
          <span>设为私密</span>
        </div>
        <div class="private-button">
          <van-switch size="20px" active-color="#409fea" v-model="isPrivate" />
        </div>
      </div>
      <div class="error-warning">
        <i class="iconfont icon-jinggao"></i>
        <span>请勿发布违法违规及营销推广内容，违者删帖封号。</span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadDynamicImage, dynamicPublish } from '@/api/dynamic.js'
import _ from 'lodash'
export default {
  name: 'DynamicPublish',
  data () {
    return {
      inputValue: '',
      placeholder: '请输入你想输入的内容',
      fileList: [],
      isPrivate: false,
      uploadImg: null
    }
  },
  methods: {
    divInput (e) {
      this.inputValue = e.target.innerText
    },
    afterRead (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const map = new Map()
      this.fileList.map(item => {
        uploadDynamicImage(item.file).then(res => {
          file.status = 'done'
          file.message = ''
          const filename = item.file.name
          map.set(filename, res)
          this.uploadImg = map
        }).catch(err => {
          file.status = 'failed'
          file.message = '上传失败'
          console.log(err, '文件上传错误捕获')
        })
      })
    },
    deleteImg (file) {
      // 原始值的深拷贝
      const map = _.cloneDeep(this.uploadImg)
      // 删除图片
      map.delete(file.file.name)
      this.uploadImg = map
    },
    beforeRead (file) {
      return true
    },
    async publish () {
      if (!this.inputValue) {
        return this.$toast({ message: '发表的动态内容不能为空！' })
      }
      const imgArray = []
      if (this.uploadImg) {
        this.uploadImg.forEach(item => { imgArray.push(item) })
      }
      const data = await dynamicPublish({ content: this.inputValue, avatar_url: imgArray, is_private: this.isPrivate })
      if (data.errno === 0) {
        this.$toast({ message: data.message, duration: 800 })
        this.inputValue = ''
        this.uploadImg = null
        this.isPrivate = false
        setTimeout(() => {
          this.$router.push('/dynamic')
        }, 950)
      } else {
        this.$toast({ message: data.message, duration: 800 })
      }
    },
    back () {
      this.$dialog.confirm({
        width: '315px',
        confirmButtonColor: '#409fea',
        confirmButtonText: '继续编辑',
        cancelButtonText: '确定',
        allowHtml: true,
        message: '<h1 style="color: #555; line-height: 24px;font-size:16px">确定要退出编辑吗？\n退出后当前内容将不被保存</h1>'
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
.dynamic-publish {
  height: 100%;
  overflow: auto;
  background-color: #fff;
  .iconfont {
    font-size: 21px;
    font-weight: 500;
  }

  /deep/ .van-nav-bar__right {
    padding-right: 21px;
  }

  &-container {
    padding-bottom: 10PX;
  }
}

.content-editable {
  min-height: 100px;
  outline: none;
  font-size: 15px;
  background-color: #fff;
  padding: 10px 8px 8px 8px;
  line-height: 20px;
  margin-bottom: 10px;
}

.content-editable:empty::before {
  content: attr(placeholder);
  color: rgba(0, 0, 0, .35);
}

.uploader-container {
  padding-left: 10px;
}

.private,
.error-warning {
  padding: 0 15px;
}

.private {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-lock {
    display: flex;
    align-items: center;
    .iconfont {
      margin-right: 8px;
    }

    span {
      font-size: 16px;
    }
  }
}

.error-warning {
  padding-top: 6px;
  padding-bottom: 6px;
  margin: 0 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(138, 138, 138, .1);

  .iconfont {
    color: #f56c60;
    margin-right: 5px;
    font-size: 16px;
  }
  span {
    color: #f56c60;
    padding-top: 2px;
    font-size: 13px;
  }
}
</style>
