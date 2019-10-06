import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index'
import category from '../view/category'
import notice from '../view/notice'
import about from '../view/about'
import articleDetail from '../view/articleDetail'
import indexAdmin from '../view/admin/indexAdmin'
import articleAdmin from '../view/admin/articleAdmin'
import categoryAdmin from '../view/admin/categoryAdmin'
import categoryList from '../view/categoryList'
import notFound from '../view/notFound'
import login from '../view/login'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/article/:id',
    name: 'articleDetail',
    component: articleDetail
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/category/:type/:cid',
    name: 'categoryList',
    component: categoryList
  },
  {
    path: '/notice',
    name: 'notice',
    component: notice
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/admin/index',
    component: indexAdmin,
    name: 'adminIndex'
  },
  {
    path: '/admin/category',
    component: categoryAdmin,
    name: 'adminCategory'
  },
  {
    path: '/admin/article',
    component: articleAdmin,
    name: 'adminArticle'
  },
  {
    path: '*',
    name: 'notfound',
    component: notFound
  }
]

let router = new Router({
  routes: routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 获取用户权限信息，为空即没登录，跳转至登录页
  if (to.path.includes('/admin')) {
    let role = localStorage.getItem('role')
    if (role !== 'ADMIN') {
      next('/login')
    }
  }
  next()
})

export default router
