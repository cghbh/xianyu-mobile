import axios from '@/utils/http.js'
import qs from 'qs'


/**
 * 获取动态列表
 * @param {Object} options 获取动态列表的参数
 */
const getDynamicList = (options) => {
  return axios.get('/dynamics/list?', qs.stringify(options))
}


export getDynamicList
