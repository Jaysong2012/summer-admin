import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/sysuser/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  const data = {}
  return request({
    url: '/system/sysuser/info',
    method: 'post',
    data
  })
}

export function logout(token) {
  const data = { token: token }
  return request({
    url: '/system/sysuser/logout',
    method: 'post',
    data
  })
}

