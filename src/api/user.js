import axios from '@/utils/http.js'

const searchUsersByKeyWords = (q = '') => {
  return axios.get(`/users?q=${q}`)
}

// 获取验证码
const getCaptcha = () => {
  return axios.get('/captcha')
}

// 用户登录
const userLogin = (data) => {
  return axios.post('/users/login', data)
}

// 根据已登录的用户token获取用户的信息
const loadUserInfo = () => {
  return axios.post('/users')
}

// 根据用户id获取用户的详细信息
const getUserInfoById = (id, isPrivate) => {
  return axios.get(`/users/${id}?fileds=personal_sign;nickname;avatar_url;background;email;birth;gender;location;following&is_private=${isPrivate}`)
}

// 指定id用户修改个人信息
const modifyUserInfo = (id, data) => {
  return axios.request({ method: 'PATCH', url: `/users/${id}`, data }, data)
}

// 获取注册短信验证码
const getTelephoneCodeReg = (data) => {
  return axios.post('/regcode', data)
}

// 获取登陆短信验证码
const getTelephoneCodeLogin = (data) => {
  return axios.post('/logincode', data)
}

// 找回密码验证码
const getTelephoneCodeFindPassword = (data) => {
  return axios.post('/findcode', data)
}

// 短信验证码登录
const loginByTelCode = (data) => {
  return axios.post('/users/login_by_code', data)
}

// 重置密码
const resetPassword = (data) => {
  return axios.post('/users/reset_password', data)
}

// 验证码校验
const checkTelephoneCode = (data) => {
  return axios.post('/verifyCode', data)
}

// 用户注册
const userRegister = (data) => {
  return axios.post('/users/register', data)
}

// 获取指定用户的关注的人
const userFollows = (id, currentPage = 1, showTotal = '1') => {
  return axios.get(`users/${id}/following?current_page=${currentPage}&show_total=${showTotal}`)
}

// 取消关注
const userCancelFollow = (id) => {
  return axios.request({ method: 'DELETE', url: `users/following/${id}` })
}

// 关注用户
const userFollow = (id) => {
  return axios.request({ method: 'PUT', url: `/users/following/${id}` })
}

// 我的粉丝列表
const getMyFans = (id, currentPage = 1) => {
  return axios.get(`/users/${id}/follower?current_page=${currentPage}`)
}

// 用户动态点赞
const likeDynamics = (id) => {
  return axios.get(`/users/likeDynamics/${id}`)
}

// 用户动态取消点赞
const unlikeDynamics = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/unlikeDynamics/${id}` })
}

// 指定动态下面的所有点赞者
const listLikePerson = (id) => {
  return axios.get(`/dynamics/${id}/likePersons`)
}

// 获取已登录用户点赞过的动态
const userLikeDynamics = (id) => {
  return axios.get(`/users/${id}/likeDynamcis`)
}

// 用户收藏动态操作
const userCollectDynamics = (id) => {
  return axios.get(`/users/collectDynamics/${id}`)
}

// 用户取消收藏动态
const userCancelCollectDynamics = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/cancelCollectDynamics/${id}` })
}

// 指定id用户下的所有收藏的动态
const getUserCollectedDynamics = (id) => {
  return axios.get(`/users/${id}/collectDynamics`)
}

// 获取指定id用户关注的人的动态
const getFollowUserDynamcis = (id, currentPage = 1, perPage = 15) => {
  return axios.get(`/users/${id}/followDynamics?current_page=${currentPage}&perpage=${perPage}`)
}

// 已登陆的用户获取所有发布的动态，包括隐私动态
const getOwnPublishedDynamics = () => {
  return axios.post('/users/userOwnDynamics')
}

// 指定用户id收藏过的好文
const userCollectArticle = (id) => {
  return axios.get(`users/${id}/collectArticles`)
}

// 指定用户id赞过的好文
const useZanArticle = (id) => {
  return axios.get(`/users/${id}/likeArticles`)
}

// 用户取消收藏好文
const userCancelCollectArticleHandle = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/cancelCollectArticle/${id}` })
}

// 用户收藏好文
const userCollectArticleHandle = (id) => {
  return axios.get(`/users/collectArticle/${id}`)
}

// 用户点赞好文
const userZanArticleHandle = (id) => {
  return axios.get(`/users/likeArticle/${id}`)
}

// 用户取消赞好文
const userCancelZanArticleHandle = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/unlikeArticle/${id}` })
}

// 用户赞过的诗词
const userZanPoems = (id) => {
  return axios.get(`/users/${id}/likePoems`)
}

// 用户收藏过的诗词
const userCollectPoems = (id) => {
  return axios.get(`/users/${id}/collectPoems`)
}

// 用户赞诗词
const userZanPoemHandle = (id) => {
  return axios.get(`/users/likePoems/${id}`)
}

// 用户取消赞诗词
const userCancelZanPoemHandle = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/unlikePoems/${id}` })
}

// 用户收藏诗词
const userCollectPoemHandle = (id) => {
  return axios.get(`/users/collectPoems/${id}`)
}

// 用户取消收藏诗词
const userCancelCollectPoemHandle = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/cancelCollectPoems/${id}` })
}

// 用户点赞成语,id词语的id
const userZanWordHandle = (id) => {
  return axios.get(`/users/likeWord/${id}`)
}

// 用户取消点赞成语，成语的id
const userCancelZanWordHandle = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/unlikeWord/${id}` })
}

// 根据用户id获取用户点赞过的成语
const getUserZanedWordHandle = (id) => {
  return axios.get(`/users/${id}/likeWords`)
}

// 用户收藏成语
const userCollectWordHandle = (id) => {
  return axios.get(`/users/collectWord/${id}`)
}

// 用户取消收藏成语
const userCancelCollectHandle = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/cancelCollectWord/${id}` })
}

// 根据用户id获取用户收藏过的内容
const getUserCollectedWordHandle = (id) => {
  return axios.get(`/users/${id}/collectWords`)
}

// 点赞评论
const userZanComment = (dynamicId, secondId = '', rootCommentId) => {
  return axios.request({ method: 'PATCH', url: `/dynamics/${dynamicId}/comments?root_comment_id=${rootCommentId}&${secondId ? 'second_id=' + secondId : ''}` })
}

// 评论取消点赞
const userCancelZanComment = (dynamicId, secondId = '', rootCommentId) => {
  return axios.request({ method: 'DELETE', url: `/dynamics/${dynamicId}/comments?root_comment_id=${rootCommentId}&second_id=${secondId}` })
}

// 获取用户点赞过的评论的id数组
const getUserDynamicComments = (id) => {
  return axios.get(`/users/${id}/getZanCommentsId`)
}

const fileUploads = (file) => {
  return axios.post('/articles/upload', file, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export { searchUsersByKeyWords, getCaptcha, getTelephoneCodeReg, getTelephoneCodeLogin, getUserInfoById, loginByTelCode, loadUserInfo, getTelephoneCodeFindPassword, checkTelephoneCode, resetPassword, userRegister, userLogin, userFollows, userCancelFollow, userFollow, getMyFans, likeDynamics, unlikeDynamics, listLikePerson, userLikeDynamics, userCollectArticle, useZanArticle, userCancelCollectArticleHandle, userCollectArticleHandle, userZanArticleHandle, userCancelZanArticleHandle, userZanPoems, userCollectPoems, userZanPoemHandle, userCancelZanPoemHandle, userCollectPoemHandle, userCancelCollectPoemHandle, userZanWordHandle, userCancelZanWordHandle, userCollectWordHandle, userCancelCollectHandle, getUserZanedWordHandle, getUserCollectedWordHandle, userCollectDynamics, userCancelCollectDynamics, getUserCollectedDynamics, getFollowUserDynamcis, getOwnPublishedDynamics, getUserDynamicComments, userZanComment, userCancelZanComment, modifyUserInfo, fileUploads }
