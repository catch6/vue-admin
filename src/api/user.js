import request from '@/libs/request'

export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}
