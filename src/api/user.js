import request from '@/assets/js/request'

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

export const register = form => {
  return request({
    url: '/user/register',
    method: 'post',
    data: form
  })
}
