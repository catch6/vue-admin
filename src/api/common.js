import request from '@/libs/request'

export const sendSmsCode = mobile => {
  return request({
    url: '/common/sendSmsCode',
    method: 'post',
    data: { mobile }
  })
}
