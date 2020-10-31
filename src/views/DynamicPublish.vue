<template>
  <div class="dynamic-publish">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <i name="right" class="iconfont icon-fabu"></i>
      </template>
      <template #left>
        <i name="left" class="iconfont icon-left" @click="back"></i>
      </template>
    </van-nav-bar>
    <div class="dynamic-publish-container">
      <div class="content-editable" placeholder="发表原创文字,沉淀灵感,留住思考" contenteditable="true" @input="divInput" :value="value" ></div>
      <div class="uploader-container">
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          :before-read="beforeRead"
          :max-count="9"
          preview-size="105px"
          multiple
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
        <span>请勿发布违规及营销推广内容，违者删帖封号。</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'// 引入axios
import { Toast } from 'vant'// 引入Toast
export default {
  name: 'DynamicPublish',
  data () {
    return {
      value: '',
      placeholder: '请输入你想输入的内容',
      fileList: [],
      isPrivate: true
    }
  },
  methods: {
    divInput (e) {
      console.log(e.target.innerText)
    },
    afterRead (file) {
      console.log(typeof file, file)
      let uploadImg
      const uploadImgArray = []
      // 单文件上传
      if (Object.prototype.toString.call(file) === '[object Object]') {
        // uploadImg = await upLoaderImg(file.file)
        upLoaderImg(file.file).then(res => {
          uploadImg = res
          console.log(uploadImg)
        })
      } else if (Object.prototype.toString.call(file) === '[object Array]') {
        // 多文件上传
        file.map(item => {
          upLoaderImg(item.file).then(res => {
            uploadImgArray.push(res)
          })
        })
      }
    },
    beforeRead (file) {
      return true
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

function upLoaderImg (file) { // file为 你读取成功的回调文件信息
  // new 一个FormData格式的参数
  const params = new FormData()
  params.append('file', file)
  const config = {
    headers: { // 添加请求头
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    // 把 uploadUrl 换成自己的 上传路径
    axios.post('http://192.168.43.223:3000/uploads', params, config).then(res => {
      if (res.status === 200) { // 如果为真 resolve出去
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      Toast.fail('系统异常')
      reject(err)
    })
  })
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
  }
}
</style>
