import axios from 'axios'
import { getToken, removeToken } from './util'
import { stringify } from 'qs'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: process.env.VUE_APP_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'token': `${getToken()}`
  },
  transformRequest: [
    data => (data ? stringify(data, { arrayFormat: 'brackets' }) : data)
  ]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    if (getToken()) {
      // 让每个请求携带token
      config.headers['X-Token'] = getToken
    }
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
          Message.error('您的登录已过期，即将前往登录页...')
          removeToken()
          setTimeout(() => {
            location.reload()
          }, 1500)
          break
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
