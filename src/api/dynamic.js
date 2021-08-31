import axios from '@/utils/http.js'
import { Toast } from 'vant'

/**
 * 上传个人动态的图片
 * @param {Object} file 上传的文件对象
 */
export const uploadDynamicImage = (file) => {
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
export const dynamicPublish = (data) => {
  return axios.post('/dynamics', data)
}

/**
 * 获取推荐或者最新的动态
 */
export const getDynamics = (sort, currentPage = 1, perpage = 100) => {
  return axios.get(`/dynamics?sort=${sort}&current_page=${currentPage}&perpage=${perpage}`)
}

// 获取动态详情
export const getDynamicDetail = (id) => {
  return axios.get(`/dynamics/${id}`)
}

// 删除动态
export const deleteDynamic = (id) => {
  return axios.request({ method: 'DELETE', url: `/dynamics/${id}` })
}

// 获取动态的评论，包括一级评论和二级评论
export const getDynamicComments = (id, sort = '1') => {
  return axios.get(`/dynamics/${id}/comments?sort=${sort}`)
}

// 添加评论
export const addComments = (id, content = '', rootCommentId, replyTo) => {
  return axios.post(`/dynamics/${id}/comments?content=${content}`, {
    content,
    root_comment_id: rootCommentId,
    reply_to: replyTo
  })
}
