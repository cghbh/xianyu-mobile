import axios from '@/utils/http.js'

// 获取诗词列表，current_page表示当前从第几页开始，默认为1，perpage表示每页获取的数据，默认是15

const getPoemList = (currentPage = 1, q = '') => {
  return axios.get(`/poems?current_page=${currentPage}&q=${q}`)
}

// 根据id获取诗词详情
const getPoemById = (id) => {
  return axios.get(`/poems/${id}`)
}

// 获取推荐诗词
const recommendPoem = () => {
  return axios.post('/poems/hot')
}

export { getPoemList, getPoemById, recommendPoem }
