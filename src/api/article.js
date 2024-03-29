import axios from '@/utils/http.js'

// 获取文章列表，currentPage当前分页的第几页
export const getArticleList = (currentPage = 1, q = '') => {
  return axios.get(`/articles?current_page=${currentPage}&q=${q}`)
}


// 根据id获取好文详情
export const getArticleById = (id) => {
  return axios.get(`/articles/${id}`)
}

// 获取热门好文,根据点赞量决定
export const getHotArticle = () => {
  return axios.post('/articles/hot')
}
