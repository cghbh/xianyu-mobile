import axios from '@/utils/http.js'

export const getSwiper = () => {
  return axios.get('/swipers')
}
