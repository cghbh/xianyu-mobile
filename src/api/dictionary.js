import axios from '@/utils/http.js'

// 获取所有的成语列表
export const getDictionaryList = (currentPage = 1, q = '') => {
  return axios.get(`/words?current_page=${currentPage}&q=${q}`)
}

// 根据成语的id返回成语的详细信息
export const getDictionaryById = (id) => {
  return axios.get(`/words/${id}`)
}
