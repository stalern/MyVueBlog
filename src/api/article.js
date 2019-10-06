import request from '../util/request'

export default {
  listArticleInfoByTime (page, size) {
    return request({
      url: '/article/any/byTime?page=' + page + '&size=' + size,
      method: 'get'
    })
  },
  // listArticleInfoByTra (page, size) {
  //   return request({
  //     url: '/article/any/byTra?page=' + page + '&size=' + size,
  //     method: 'get'
  //   })
  // },
  listArticleInfoByCategoryId (page, size, id) {
    return request({
      url: '/article/any/' + id + '?page=' + page + '&size=' + size,
      method: 'get'
    })
  },
  listNumOfTime () {
    return request({
      url: '/article/any/listNumOfTime',
      method: 'get'
    })
  },
  listArticleInfoByTimeNum (page, size, time) {
    return request({
      url: '/article/any/listArtByTime/' + time + '?page=' + page + '&size=' + size,
      method: 'get'
    })
  },
  getArticleInfoById (id) {
    return request({
      url: '/article/any/byId?id=' + id,
      method: 'get'
    })
  },
  getArticleContentById (id) {
    return request({
      url: '/article/any/contentById?id=' + id,
      method: 'get'
    })
  },
  getArticleById (id) {
    return request({
      url: '/article/any/article?id=' + id,
      method: 'get'
    })
  },
  getLoveTrueOrFalse (aid) {
    return request({
      url: '/article/user/getLoveTrueOrFalse?aid=' + aid,
      method: 'get'
    })
  },
  postLover (aid, flag) {
    return request({
      url: '/article/user/postLover?aid=' + aid + '&flag=' + flag,
      method: 'post'
    })
  },
  postArticle (categoryId, articleInfoTitle, articleInfoSummary, articleContent) { // 发送评论
    return request({
      url: '/article/admin/postArticle',
      method: 'post',
      data: JSON.stringify({
        'articleInfo': {
          'title': articleInfoTitle,
          'summary': articleInfoSummary
        },
        'articleContent': {
          'content': articleContent
        },
        'articleCategory': {
          'categoryId': categoryId
        }
      })
    })
  },
  updateArticle (articleId, categoryId, articleInfoTitle, articleInfoSummary, articleContent) { // 修改信息
    return request({
      url: '/article/admin/updateArticle',
      method: 'put',
      data: JSON.stringify({
        'articleInfo': {
          'id': articleId,
          'title': articleInfoTitle,
          'summary': articleInfoSummary
        },
        'articleContent': {
          'articleId': articleId,
          'content': articleContent
        },
        'articleCategory': {
          'articleId': articleId,
          'categoryId': categoryId
        }
      })
    })
  },
  deleteArticleById (id) {
    return request({
      url: '/article/admin/delete?id=' + id,
      method: 'delete'
    })
  }
}
