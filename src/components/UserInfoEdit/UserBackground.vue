<template>
  <div class="user-background-image">
    <img 
      style="width: 100%" 
      alt="背景图片预览"
      ref="userAvatar"
      :src="newFile"
    >
    <van-nav-bar
      class="avatar-navbar"
      left-text="取消"
      right-text="确定"
      @click-left="cancelClick"
      @click-right="confirmClick"
    />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: {
    file: {
      required: true
    }
  },

  data () {
    return {
      newFile: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },

  mounted () {
    this.initCropper()
  },

  methods: {
    // 对裁切器进行初始化
    initCropper () {
      this.cropper = new Cropper(this.$refs.userAvatar, {
        viewMode: 1,
        dragMode: 'move',
        initialAspectRatio: 1,
        cropBoxMovable: true,
        cropBoxResizable: false,
        aspectRatio: 2,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        movable: true,
        background: false,
        scalable: true,
        zoomable: true
      })
    },

    getCroppedCanvas () {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas({
          width: 833,
          height: 400
        }).toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    cancelClick () {
      this.$emit('cancel')
    },
    async confirmClick () {
      const file = await this.getCroppedCanvas()
      this.$emit('confirm', file)
    }
  }
}
</script>

<style scoepd lang="scss">
.avatar-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /deep/ .van-nav-bar__text {
    color: #000;
    font-size: 16PX;
  }
}
</style>
