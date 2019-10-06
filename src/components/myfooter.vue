<template>
  <footer class="ui inverted vertical segment">
    <div class="ui container" style="text-align: center">
      <div class="ui inverted link list">
        <p class="item">博客已运行{{getTime(time)}}天 &nbsp;&nbsp;|&nbsp;&nbsp; 被访问{{nums}}次 &nbsp;&nbsp;|&nbsp;&nbsp; 累计用户{{num}}人</p>
        <div class="ui inverted divider"></div>
        <a href="http://beian.miit.gov.cn/" class="item"><img src="../assets/bei.png" alt="备案"> &nbsp;&nbsp; 豫ICP备19009575号-1</a>
        <div class="ui inverted divider"></div>
        <p class="item m-line-space m-opacity">Copyright © 2019 <router-link to="/index">stalern</router-link>. &nbsp;&nbsp;|&nbsp;&nbsp; All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import user from '../api/user'

export default {
  name: 'myFooter',
  data () {
    return {
      time: '2019/09/21 00:00:00',
      num: 0,
      nums: 0
    }
  },
  methods: {
    getTime: function (oldTime) {
      return Math.floor((new Date() - new Date(oldTime)) / (24 * 3600 * 1000))
    },
    getUserNum: function () {
      let _this = this
      user.getUserNum().then(function (response) {
        // console.log(response)
        _this.num = response.data
      })
    },
    getUserLogNum: function () {
      let _this = this
      user.getUserLogNum().then(function (response) {
        // console.log(response)
        _this.nums = response.data
      })
    }
  },
  created () {
    this.getUserNum()
    this.getUserLogNum()
  }
}
</script>

<style scoped>
  /*字间距*/
   .m-line-space{
      letter-spacing: 1px !important;
   }
  /*透明度*/
  .m-opacity{
    opacity: 1.2;
  }
</style>
