import request from '../util/request'

export default {
  sendComment (id, parentId, name, connect, content) { // 发送评论
    return request({
      url: '/article/user/postComment/' + id,
      method: 'post',
      data: JSON.stringify({
        'content': content === '' ? null : content,
        'parentId': parentId === '' ? null : parentId,
        'name': name === '' ? null : name,
        'connect': connect === '' ? null : content
      })
    })
  },
  setCommentEff (id, flag) { // 发送评论
    return request({
      url: '/article/admin/delete/comment?id=' + id + '&flag=' + flag,
      method: 'put'
    })
  },
  deleteComment (id) { // 发送评论
    return request({
      url: '/article/admin/delete/comment?id=' + id,
      method: 'delete'
    })
  }
}
