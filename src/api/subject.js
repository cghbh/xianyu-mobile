// 答题模块
import axios from '@/utils/http.js'

// 随机返回8道题目，不足八道以实际数据返回
const getSubjects = () => {
  return axios.post('/subjects/random')
}

export { getSubjects }
