import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminFlag: true, // 是否显示管理员入口
    active: { // home图标激活
      activeIndex: 'active',
      activeCategory: '',
      activeMessage: '',
      activeAbout: ''
    },
    commentFlag: -1,
    user: {
      role: '',
      name: '',
      token: ''
    }
  },
  mutations: {
    adminFlag (state, flag) {
      flag === 1 ? this.state.adminFlag = true : this.state.adminFlag = flag
    },
    activeOne (state, flag) {
      if (flag === 0) {
        this.state.active.activeIndex = 'active'
        this.state.active.activeCategory = ''
        this.state.active.activeMessage = ''
        this.state.active.activeAbout = ''
      } else if (flag === 1) {
        this.state.active.activeIndex = ''
        this.state.active.activeCategory = 'active'
        this.state.active.activeMessage = ''
        this.state.active.activeAbout = ''
      } else if (flag === 2) {
        this.state.active.activeIndex = ''
        this.state.active.activeCategory = ''
        this.state.active.activeMessage = 'active'
        this.state.active.activeAbout = ''
      } else if (flag === 3) {
        this.state.active.activeIndex = ''
        this.state.active.activeCategory = ''
        this.state.active.activeMessage = ''
        this.state.active.activeAbout = 'active'
      } else if (flag === 4) {
        this.state.active.activeIndex = ''
        this.state.active.activeCategory = ''
        this.state.active.activeMessage = ''
        this.state.active.activeAbout = ''
      }
    },
    changeCommentFlag (state, id) {
      this.state.commentFlag = id
    },
    login (state, data) {
      // 变更状态
      this.state.user.token = data.token
      localStorage.setItem('token', data.token)
      // 存储用户名
      this.state.user.name = data.name
      localStorage.setItem('name', data.name)

      this.state.user.role = data.role
      localStorage.setItem('role', data.role)
    },
    logout (state) {
      localStorage.removeItem('token')
      this.state.token = ''
      localStorage.removeItem('name')
      this.state.name = ''
      localStorage.removeItem('role')
      this.state.roles = ''
    }
  },
  actions: {

  }
})
