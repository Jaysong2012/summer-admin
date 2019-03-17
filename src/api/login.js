import request from '../utils/request'

export function loginByUsername(username, password) {
  const data = {
    name: username,
    passwd: password
  };
  return request({
    url: '/system/sysuser/login',
    method: 'post',
    data
  })
}

export function logout(token) {
  const data = {token:token}
  return request({
    url: '/system/sysuser/logout',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

