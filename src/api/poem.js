import axios from '@/utils/http.js'

// 获取诗词列表，current_page表示当前从第几页开始，默认为1，perpage表示每页获取的数据，默认是15

const getPoemList = (currentPage = 1) => {
  return axios.get(`/poems?current_page=${currentPage}`)
}

const getPoemById = (id) => {
  return axios.get(`/poems/${id}`)
}

export { getPoemList, getPoemById }
