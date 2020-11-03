import config from '@/config/index.js'
import HttpRequest from './axios.js'
const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod

// 实例化axios
const axios = new HttpRequest(baseURL)

export default axios
