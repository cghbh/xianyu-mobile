import axios from '@/utils/http.js'

const getCaptcha = () => {
  return axios.get('/captcha')
}

const userLogin = (data) => {
  return axios.post('/users/login', data)
}

const userRegister = (data) => {
  return axios.post('/users/register', data)
}

// 获取指定用户的关注
const userFollows = (id) => {
  return axios.get(`users/${id}/following`)
}

// 取消关注
const userCancelFollow = (id) => {
  return axios.request({ method: 'DELETE', url: `users/following/${id}` })
}

// 关注
const userFollow = (id) => {
  return axios.request({ method: 'PUT', url: `/users/following/${id}` })
}

// 我的粉丝列表
const getMyFans = (id) => {
  return axios.get(`/users/${id}/follower`)
}

export { getCaptcha, userRegister, userLogin, userFollows, userCancelFollow, userFollow, getMyFans }
