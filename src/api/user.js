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

export { getCaptcha, userRegister, userLogin }
