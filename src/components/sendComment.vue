<template>
    <div id="send-comment" v-if="isRouterAlive">
      <label for="comment-me2"></label><textarea v-model="content" id="comment-me2" cols="30" rows="1" placeholder="请输入评论"></textarea>
      <div class="ui three column grid m-margin-t-tiny">
        <div class="column">
          <p v-if="user.name !== '未注册'" class="ui image label"><img :src=changeImgSrc() alt="未加载"> {{user.name}}</p>
          <div class="ui left icon input" v-else>
            <i class="user icon"></i>
            <input type="text" v-model="name" placeholder="昵称必填项">
          </div>
        </div>
        <div class="column">
          <div class="ui left icon input">
            <i v-if="user.name === '未注册'" class="mail icon"></i>
            <input v-if="user.name === '未注册'" type="text" v-model="connect" placeholder="必填项QQ/Website/E-mail">
          </div>
        </div>
        <div class="center aligned column">
          <button class="ui teal right floated button" @click="sendComment()">
            <i class="edit icon"></i>发布
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import comment from '../api/comment'
import user from '../api/user'
export default {
  name: 'sendComment',
  props: ['commentId', 'articleId'],
  data: function () {
    return {
      isRouterAlive: true,
      content: '',
      name: '',
      connect: '',
      user: {}
    }
  },
  methods: {
    changeImgSrc () {
      return 'https://picsum.photos/id/' + Math.floor(Math.random() * 100) + '/100/100'
    },
    sendComment: function () {
      if ((this.name === '' || this.content === '' || this.connect === '') && this.user.name === '未注册') {
        alert('请输入必填项')
      } else {
        comment.sendComment(this.articleId, this.commentId, this.name, this.connect, this.content).then(function (response) {
          if (response) {
            alert('发送成功')
            location.reload()
          }
        })
      }
    },
    getUserInfo: function () {
      let _this = this
      user.getUserByIp().then(function (response) {
        _this.user = response.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .m-margin-t-tiny{
    margin-top: 0.5em !important;
    margin-bottom: 0 !important;
  }
</style>
