import axios from 'axios'
// 导入路由，未登录的时候跳转
import router from '../router/index.js'
// import config from '@/config'
// 导入Store判断用户是否登录
// 导入提示框Toast
import { Toast } from 'vant'

/* 提示函数
 禁止点击蒙层，显示一秒之后关闭
*/
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/* 跳转登录页
  携带当前的路由,方便在登录之后返回当前的页面
*/
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/* 请求错误后的统一处理
@param { Number } status请求失败的状态码 */
const errorHandle = (status, other) => {
  switch (status) {
    case 401:
      tip('401没有权限')
      toLogin()
      break

    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      // 在store里面将token置空
      // store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break

    case 404:
      tip('请求的资源不存在')
      break

    default:
      console.log(other)
  }
}

// 使用ES6的类封装HTTPRequest
class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  // axios实例的配置
  getInstanceConfig () {
    const config = {
      timeout: 10000,
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
  }

  // 设定拦截器
  interceptors (instance) {
    // 请求拦截器,每次请求之前,如果存在token则在请求头中携带token
    instance.interceptors.request.use(config => {
      // 及时存在token也有可能过期,因此在每次的请求头中添加token
      // 后台根据token返回结果
      // 然后根据响应回来的结果进行一些处理
      const token = JSON.parse(localStorage.getItem('token'))
      token && (config.headers.Authorization = `Bearer ${token}`)
      return config
    }, error => {
      Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(
      res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
      error => {
        const { response } = error
        if (response) {
          errorHandle(response.status, response.data.message)
          return Promise.reject(response)
        } else {
          // 处理断网的情况
          // 请求超时或者是断网的时候,更新store中的network状态
          // network状态在app,vue中控制着一个全局的断网提示组件的显示与隐藏
          // 关于断网或者是刷新重新获取数据,会在断网组件中说明
          if (!window.navigator.onLine) {
            Toast('断网了')
          } else {
            return Promise.reject(error)
          }
        }
      }
    )
  }

  // 创建实例，也可以使用axios.request({ method: 'DELETE' })使用其他的方法
  request (options) {
    const instance = axios.create()
    // 整合本身的options和用户传递过来的options
    const newOptions = Object.assign(this.getInstanceConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'GET',
      url: url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'POST',
      url: url,
      data: data
    })
  }
}


export default HttpRequest
