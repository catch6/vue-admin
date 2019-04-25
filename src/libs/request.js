import axios from 'axios'
import { getToken, clearLogin } from './util'
import { stringify } from 'qs'
import { MessageBox } from 'element-ui'
import router from '@/router'

const request = axios.create({
  baseURL: process.env.VUE_APP_SERVER_BASE_URL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      // 让每个请求携带token
      config.data = { ...config.data, token }
    }
    config.data = stringify(config.data, { arrayFormat: 'brackets' })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const ret = response.data
    if (ret.code) {
      switch (ret.code) {
        case 200:
          return ret
        case 401:
          MessageBox.confirm('您的登录已过期，请重新登录', '提示', {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            clearLogin()
            router.push('/login')
          })
          return Promise.reject(`${ret.code}:${ret.msg}`)
        default:
          return Promise.reject(`${ret.code}:${ret.msg}`)
      }
    } else {
      return Promise.reject('未返回code')
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
