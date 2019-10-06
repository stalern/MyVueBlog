<template>
  <div class="ui bottom top segment m-margin-tb-big" id="my-comment">
    <!--          按钮-->
    <div class="ui middle aligned two column grid m-margin-lr-big">
      <div class="ui column">
        <button @click="showComment" class="ui secondary basic button">{{clickMessage}}</button>
      </div>
      <div class="ui column right aligned">
        <button @click="writeComment" class="ui primary basic button">{{clickWrite}}</button>
      </div>
    </div>
    <div v-if="showFlag" class="ui brown segment">
      <!--          评论-->
      <div class="ui threaded comments m-margin-lr-big">
        <div class="comment" v-for="(articleComment, index) in articleCommentTree.children" :key="articleComment.object.id">
          <a class="avatar" >
            <img :src=changeImgSrc(articleCommentTree.children.length)[index] alt="头像">
          </a>
          <div class="content">
            <a class="author">{{articleComment.object.name}}</a>
            <div class="metadata">
              <span class="date">{{articleComment.object.createByStr}}</span>
            </div>
            <div class="text">{{articleComment.object.content}}</div>
            <div class="actions">
              <a class="reply" @click="writeReply(articleComment.object.id)">回复</a>
              <a class="reply" @click="deleteComment(articleComment.object.id)" v-if="role === 'ADMIN'">删除</a>
            </div>
          </div>
          <div v-if="flag === articleComment.object.id" class="ui form">
            <div class="field">
              <send-comment :comment-id="articleComment.object.id" :article-id="articleId"/>
            </div>
          </div>
          <multistage :children="articleComment.children" :article-id="articleId"/>
        </div>
        <div v-if="flag === -2" class="ui form">
          <div class="field">
            <send-comment :comment-id="0" :article-id="articleId"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multistage from './multistage/multistageComment'
import SendComment from './sendComment'
import store from '../store/store'
import comment from '../api/comment'

export default {
  name: 'myComment',
  components: { SendComment, Multistage },
  props: ['articleCommentTree', 'articleId'],
  data: function () {
    return {
      flag: store.state.commentFlag,
      showFlag: true,
      clickMessage: '隐藏评论',
      clickWrite: '发表评论',
      content: '',
      name: '',
      contact: '',
      role: localStorage.getItem('role')
      // role: store.state.user.role
    }
  },
  methods: {
    changeImgSrc (length) {
      let img = []
      for (let i = 0; i < length; i++) {
        img[i] = 'https://picsum.photos/id/' + Math.floor(Math.random() * 100) + '/100/100'
      }
      return img
    },
    showComment: function () {
      this.showFlag === true ? this.showFlag = false : this.showFlag = true
      this.clickMessage === '隐藏评论' ? this.clickMessage = '显示评论' : this.clickMessage = '隐藏评论'
    },
    writeComment: function () {
      if (this.clickWrite === '不发表了') {
        this.clickWrite = '发表评论'
        store.commit('changeCommentFlag', -1)
        this.flag = store.state.commentFlag
      } else {
        this.clickWrite = '不发表了'
        store.commit('changeCommentFlag', -2)
        this.flag = store.state.commentFlag
      }
    },
    writeReply: function (id) {
      store.commit('changeCommentFlag', id)
      this.flag = store.state.commentFlag
      this.clickWrite = '不发表了'
    },
    deleteComment (id) {
      if (confirm('确定删除该评论吗？')) {
        comment.deleteComment(id).then(function (response) {
          if (response) {
            alert('删除成功')
            location.reload()
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .m-margin-lr-big {
    margin-left: 3em;
    margin-right: 3em;
  }
</style>
