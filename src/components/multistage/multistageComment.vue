<template>
  <div class="multistage">
  <div v-if="children != null" class="comments">
    <div class="comment" v-for="(subArticleComment,index) in children" :key="subArticleComment.object.id">
      <a class="avatar">
        <img :src=changeImgSrc(children.length)[index] alt="头像">
      </a>
      <div class="content">
        <a class="author">{{subArticleComment.object.name}}</a>
        <div class="metadata">
          <span class="date">{{subArticleComment.object.createByStr}}</span>
        </div>
        <div class="text">{{subArticleComment.object.content}} </div>
        <div class="actions">
          <a class="reply" v-if="flag === subArticleComment.object.id" @click="flag = -1">收起<i class="angle up icon"></i></a>
          <a class="reply" v-else @click="flag = subArticleComment.object.id">回复<i class="angle down icon"></i></a>
          <a class="reply" v-if="role === 'ADMIN'" @click="deleteComment(subArticleComment.object.id)">删除</a>
        </div>
        <div v-if="flag === subArticleComment.object.id" class="ui form">
          <div class="field">
            <send-comment :comment-id="subArticleComment.object.id" :article-id="articleId"/>
          </div>
        </div>
      </div>
      <multistage :children="subArticleComment.children" :article-id="articleId"/>
    </div>
  </div>
  </div>
</template>

<script>
import SendComment from '../sendComment'
import store from '../../store/store'
import comment from '../../api/comment'
export default {
  name: 'multistage',
  props: ['children', 'articleId'],
  components: { SendComment },
  data () {
    return {
      flag: store.state.commentFlag,
      role: localStorage.getItem('role')
      // role: store.state.user.role
    }
  },
  methods: {
    writeReply: function (id) {
      store.commit('changeCommentFlag', id)
      this.flag = store.state.commentFlag
      // this.clickWrite = '不发表了'
    },
    changeImgSrc (length) {
      let img = []
      for (let i = 0; i < length; i++) {
        img[i] = 'https://picsum.photos/id/' + Math.floor(Math.random() * 100) + '/100/100'
      }
      return img
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

</style>
