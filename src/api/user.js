import axios from '@/utils/http.js'

const getCaptcha = () => {
  return axios.get('/users/captchas')
}

export { getCaptcha }
