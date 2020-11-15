import axios from '@/utils/http.js'

// 获取验证码
const getCaptcha = () => {
  return axios.get('/captcha')
}

// 用户登录
const userLogin = (data) => {
  return axios.post('/users/login', data)
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

export { getCaptcha, userRegister, userLogin, userFollows, userCancelFollow, userFollow, getMyFans }
