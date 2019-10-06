import axios from 'axios'
import store from '../store/store'
import router from '../router/router'

const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 15000, // 请求超时时间,
  headers: {
    'dataType': 'json',
    'Content-Type': 'application/json',
    'charset': 'UTF-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
    config.headers['token'] = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error).then(r => error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data === null || response.data === '') {
      store.commit('logout')
      router.push({
        path: '/login'
      })
      location.reload()
    }
    return response
  }
)

export default service
