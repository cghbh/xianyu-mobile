import axios from '@/utils/http.js'

// 获取文章列表，currentPage当前分页的第几页
const getArticleList = (currentPage) => {
  return axios.get(`/articles?current_page=${currentPage}`)
}


// 根据id获取好文详情
const getArticleById = (id) => {
  return axios.get(`/articles/${id}`)
}

// 获取热门好文,根据点赞量决定
const getHotArticle = () => {
  return axios.post('/articles/hot')
}

export { getArticleList, getArticleById, getHotArticle }
