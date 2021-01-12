import { Toast } from 'vant'
function upload (file) {
  if (file.size > 20 * 1024 * 1024) {
    Toast('文件大小不能超过20M')
    return
  }
  setBase64(file, toSend)
  function toSend (value) {
    return value
    // console.log(value, 'toSend')
  }
}

function setBase64 (file, fn) {
  // 图片文件转换为base64编码
  if (!window.FileReader) {
    Toast('浏览器对FileReader方法不兼容')
    return
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  // 读出 base64
  reader.onloadend = function () {
    imgCompress(reader, function (base64) {
      typeof fn === 'function' && fn(base64 || reader.result)
    })
  }
}

function imgCompress (reader, callback) {
  // 图片超过尺寸压缩
  var img = new Image()
  img.src = reader.result
  img.onload = function () {
    const w = this.naturalWidth
    const h = this.naturalHeight
    let resizeW = 0
    let resizeH = 0  
    const maxSize = {
      width: 1000,
      height: 1000,
      level: 0.5
    }
    if (w > maxSize.width || h > maxSize.height) {
      var multiple = Math.max(w / maxSize.width, h / maxSize.height)
      resizeW = w / multiple
      resizeH = h / multiple
    } else {
    // 如果图片尺寸小于最大限制，则不压缩直接上传
      return callback()
    }
    var canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = resizeW
    canvas.height = resizeH
    ctx.drawImage(img, 0, 0, resizeW, resizeH)
    var base64 = canvas.toDataURL('image/jpeg', maxSize.level)
    callback(base64)
  }
}

// function toSend (result) {
//   // 传给后端result为处理好后的base64的字符串
// }

export { upload }
