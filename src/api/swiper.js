import axios from '@/utils/http.js'

const getSwiper = () => {
  return axios.get('/swipers')
}
export { getSwiper }
