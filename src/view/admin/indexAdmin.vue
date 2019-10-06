<template>
  <div id="index-admin">
    <div class="ui container m-padded-tb-large">
      <div class="ui top bottom violet segment container">
        <el-table :data="userList" aa border style="width: 100%" height="620px">
          <el-table-column fixed="left" prop="ip" label="ip" width="180"></el-table-column>
          <el-table-column prop="name" label="昵称" width="180"></el-table-column>
          <el-table-column prop="region" label="地址" width="180"></el-table-column>
          <el-table-column prop="browser" label="浏览器" width="180"></el-table-column>
          <el-table-column prop="role" label="角色" width="180"></el-table-column>
          <el-table-column prop="connect" label="联系方式" width="180"></el-table-column>
          <el-table-column prop="num" label="登录次数" width="180"></el-table-column>
          <el-table-column prop="createByStr" label="最初登入时间" width="180"></el-table-column>
          <el-table-column prop="modifiedByStr" label="最后登入时间" width="180"></el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="total" :current-page="page" :page-size="size"
                       @current-change="currentChange" @prev-click="page=page-1" @next-click="page=page+1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/store'
import user from '../../api/user'
export default {
  name: 'indexAdmin',
  created () {
    store.commit('activeOne', 4)
    this.loadUserInfo(this.page)
  },
  data () {
    return {
      total: 0,
      page: 1, // 当前页数
      size: 10, // 每页显示6条
      userList: []
    }
  },
  methods: {
    loadUserInfo (page) {
      let _this = this
      user.listUser(page, this.size).then(function (response) {
        _this.userList = response.data.list
        _this.total = response.data.total
        // console.log(response)
      })
    },
    currentChange (page) {
      this.page = page
      this.loadUserInfo(page)
      scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
  .m-padded-tb-large{
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
