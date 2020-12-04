import axios from '@/utils/http.js'

// 获取文章列表，currentPage当前分页的第几页
const getArticleList = (currentPage) => {
  return axios.get(`/articles?current_page=${currentPage}`)
}


// 根据id获取好文详情
const getArticleById = (id) => {
  return axios.get(`/articles/${id}`)
}

export { getArticleList, getArticleById }
