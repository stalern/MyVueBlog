<template>
  <nav class="ui inverted segment attached m-padding-tb-mini m-shadow-small">
    <div class="ui container">
      <div class="ui inverted tabular stackable secondary menu">
        <h2 class="ui teal header item">Stalern</h2>
        <router-link to="/index" :class="active.activeIndex" class="item m-left-little m-mobile-hide"><i class="home icon"></i>首页</router-link>
        <router-link to="/category" :class="active.activeCategory" class="item m-left-little m-mobile-hide"><i class="folder outline icon"></i>分类&归档</router-link>
        <routerLink to="/notice" :class="active.activeMessage" class="item m-left-little m-mobile-hide"><i class="bell outline icon"></i>公告&留言</routerLink>
        <router-link to="/about" :class="active.activeAbout" class="item m-left-little m-mobile-hide"><i class="adjust icon"></i>关于</router-link>
        <div v-if="role === 'ADMIN'" class="right item">
          <el-dropdown>
          <span class="el-dropdown-link">
            管理员菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/admin/index" class="">控制面板</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/admin/article" class="">文章管理</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/admin/category" class="">分类管理</router-link></el-dropdown-item>
              <el-dropdown-item><p @click="logout" class="blue">登出</p></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else class="right item m-mobile-hide">
          <div class="ui icon inverted transparent input">
            <input type="text" placeholder="搜索....">
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="ui black icon button m-right-top m-desktop-hide" @click="change">
      <i class="sidebar icon"></i>
    </a>
  </nav>
</template>

<script>
import $ from 'jquery'
import store from '../store/store'
import router from '../router/router'
export default {
  name: 'myHeader',
  store,
  data () {
    return {
      adminFlag: store.state.adminFlag,
      active: store.state.active,
      role: localStorage.getItem('role')
      // role: store.state.user.role
    }
  },
  methods: {
    change: function () {
      $('.m-mobile-hide').toggleClass('m-mobile-hide')
    },
    logout: function () {
      store.commit('logout')
      this.role = ''
      router.push({
        path: '/index'
      })
    }
  },
  created () {
    // console.log(this.role)
  }
}

</script>

<style scoped>
  .m-padding-tb-mini{
    padding-top: 0.1em !important;
    padding-bottom: 0.1em !important;
  }
  .m-left-little{
    margin-left: 50px !important;
  }
  .m-right-top{
    position: absolute;
    top: 0;
    right: 0;
  }
  .m-shadow-small{
    box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
  }
  .m-desktop-hide{
    display: none !important;
  }
  @media screen and (max-width: 768px){
    .m-mobile-hide{
      display: none !important;
    }
    .m-desktop-hide{
      display: block !important;
    }
  }
  /*element*/
  .el-dropdown-link {
    cursor: pointer;
    color: gray;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
