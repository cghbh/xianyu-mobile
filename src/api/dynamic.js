import axios from '@/utils/http.js'
import { Toast } from 'vant'

/**
 * 上传个人动态的图片
 * @param {Object} file 上传的文件对象
 */
const uploadDynamicImage = (file) => {
  // new 一个FormData格式的参数
  const params = new FormData()
  params.append('file', file)
  return new Promise((resolve, reject) => {
    axios.post('/dynamics/upload', params, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      if (res.errno === 0) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      Toast.fail('用户未登录！')
      reject(err)
    })
  })
}

/**
 * 发表动态
 * @param {Object} file 上传的文件对象
 */
const dynamicPublish = (data) => {
  return axios.post('/dynamics', data)
}

/**
 * 获取推荐或者最新的动态
 */
const getDynamics = (sort, currentPage = 1, perpage = 20) => {
  return axios.get(`/dynamics?sort=${sort}&current_page=${currentPage}&perpage=${perpage}`)
}

// 获取动态详情
const getDynamicDetail = (id) => {
  return axios.get(`/dynamics/${id}`)
}

// 删除动态
const deleteDynamic = (id) => {
  return axios.request({ method: 'DELETE', url: `/dynamics/${id}` })
}

export { uploadDynamicImage, dynamicPublish, getDynamics, getDynamicDetail, deleteDynamic }
