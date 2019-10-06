import request from '../util/request'

export default {
  listCategoryInfo () {
    return request({
      url: '/categoryInfo/any/list',
      method: 'get'
    })
  },
  listCategoryInfoPa () {
    return request({
      url: '/categoryInfo/any/listPa',
      method: 'get'
    })
  },
  getCategoryInfoByArticleId (id) {
    return request({
      url: '/article/any/getCategoryInfoById?id= ' + id,
      method: 'get'
    })
  },
  postCategoryInfo (name, parentId) {
    return request({
      url: '/categoryInfo/admin/post',
      method: 'post',
      data: JSON.stringify({
        'name': name,
        'parentId': parentId
      })
    })
  },
  deleteCategoryById (id) {
    return request({
      url: '/categoryInfo/admin/' + id,
      method: 'delete'
    })
  }
}
