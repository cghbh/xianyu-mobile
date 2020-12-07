import axios from '@/utils/http.js'

// 随机返回段子
const getJokeRandom = () => {
  return axios.post('/jokes/random')
}

export { getJokeRandom }

