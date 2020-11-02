import axios from 'axios'
// 导入路由，未登录的时候跳转
import router from '../router/index.js'
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

// 创建axios实例
const instance = axios.create({ timeout: 5000 })

// 根据环境的切换
if (process.env.NODE_ENV === 'development') {
  instance.defaults.baseURL = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  instance.defaults.baseURL = 'http://www.cghbh.com'
}

// 请求拦截器
// 每次请求之前,如果存在token则在请求头中携带token
instance.interceptors.request.use(config => {
  // 及时存在token也有可能过期,因此在每次的请求头中添加token
  // 后台根据token返回结果
  // 然后根据响应回来的结果进行一些处理
  const token = 'bearulwdnu2hu2v'
  token && (config.headers.Authorization = token)
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
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

export default instance
