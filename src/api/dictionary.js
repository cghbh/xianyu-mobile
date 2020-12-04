import axios from '@/utils/http.js'

// 获取所有的成语列表
const getDictionaryList = (currentPage = 1) => {
  return axios.get(`/words?current_page=${currentPage}`)
}

// 根据成语的id返回成语的详细信息
const getDictionaryById = (id) => {
  return axios.get(`/words/${id}`)
}

export { getDictionaryList, getDictionaryById }
