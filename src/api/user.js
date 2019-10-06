import request from '../util/request'

export default {
  listUser (page, size) {
    return request({
      url: '/user/admin/listUser?page=' + page + '&size=' + size,
      method: 'get'
    })
  },
  getUserByIp () {
    return request({
      url: '/user/any/getUserByIp',
      method: 'get'
    })
  },
  getUserNum () {
    return request({
      url: '/user/any/getUserNum',
      method: 'get'
    })
  },
  getUserLogNum () {
    return request({
      url: '/user/any/getUserLogNum',
      method: 'get'
    })
  },
  postUser () {
    return request({
      url: '/user/any/postUser',
      method: 'post',
      data: JSON.stringify({
      })
    })
  },
  login (username, password) {
    return request({
      url: '/user/any/login?username=' + username + '&password=' + password,
      method: 'post'
    })
  }
}
