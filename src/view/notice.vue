<template>
  <div id="article-detail">
    <!--    容器有响应式的效果-->
    <div class="ui m-container m-margin-tb-big">
      <!--      top有圆角效果-->
      <div class="ui top attached segment">
        <div class="ui middle two column grid">
          <div class="column middle aligned">
            <div class="ui horizontal link list">
              <div class="item">
                <i class="calendar icon"></i>
              </div>
              <div class="item m-margin-l-small">
                <a href="#">{{articleContent.modifiedByStr}}</a>
              </div>
              <div class="item">
                <i class="eye icon"></i>{{articleInfo.traffic}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui attached teal m-padded-lr-big segment">
        <h2 class="ui horizontal divider header m-margin-tb-middle">本站公告</h2>
        <div class="m-margin-tb-middle">
          <mavon-editor v-model="articleContent.content" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" class="mavon"/>
        </div>
      </div>
      <!-- 版权-->
      <div class="ui attached positive message bottom">
        <div class="ui">
          <ul class="list">
            <li>版权声明：不得以任何方式和理由转载本文</li>
          </ul>
        </div>
      </div>
      <!--      评论-->
      <my-comment :article-comment-tree="articleComment" :article-id="articleInfo.id"/>
    </div>
  </div>
</template>

<script>
import MyComment from '../components/mycomment'
import store from '../store/store'
import article from '../api/article'
export default {
  name: 'notice',
  components: { MyComment },
  data () {
    return {
      articleContent: {},
      articleInfo: {},
      articleComment: {}
    }
  },
  methods: {
    loadArticleById: function () {
      let _this = this
      article.getArticleById(3).then(function (response) {
        _this.articleContent = response.data[0]
        _this.articleComment = response.data[1]
      }).then(
        article.getArticleInfoById(3).then(function (response) {
          _this.articleInfo = response.data
          // console.log(response.data)
        }))
    }
  },
  created () {
    store.commit('activeOne', 2)
    this.loadArticleById()
  }
}
</script>

<style scoped>
  .m-container{
    max-width: 70em !important;
    margin: auto;
  }
  .m-margin-l-small{
    margin-left: 0.1em !important;
  }
  .m-margin-tb-middle{
    margin-top: 1em !important;
    margin-bottom: 2em;
  }
  .m-margin-tb-big{
    margin-top: 5em;
    margin-bottom: 5em;
  }
  .m-padded-lr-big{
    padding-left: 4em !important;
    padding-right: 4em !important;
  }
  #editor{
    margin-left: -20px !important;
    margin-right: -20px !important;
  }
  @media screen and (max-width: 768px){
    .m-padded-lr-big{
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
