import axios from '@/utils/http.js'

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
const userFollows = (id) => {
  return axios.get(`users/${id}/following`)
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
const getMyFans = (id) => {
  return axios.get(`/users/${id}/follower`)
}

// 用户点赞
const likeDynamics = (id) => {
  return axios.get(`/users/likeDynamics/${id}`)
}

// 用户取消点赞
const unlikeDynamics = (id) => {
  return axios.request({ method: 'DELETE', url: `/users/unlikeDynamics/${id}` })
}

// 指定动态下面的所有点赞者
const listLikePerson = (id) => {
  return axios.get(`/dynamics/${id}/likePersons`)
}

// 获取已登录用户点赞过的动态
const userLikeDynamics = (id) => {
  return axios.get(`users/${id}/likeDynamcis`)
}

export { getCaptcha, getTelephoneCodeReg, getTelephoneCodeLogin, loginByTelCode, loadUserInfo, getTelephoneCodeFindPassword, checkTelephoneCode, resetPassword, userRegister, userLogin, userFollows, userCancelFollow, userFollow, getMyFans, likeDynamics, unlikeDynamics, listLikePerson, userLikeDynamics }
