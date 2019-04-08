import request from '@/libs/request'

export const login = form => {
  return request({
    url: '/user/login',
    method: 'post',
    data: form
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
