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
                  <a href="#">{{article.articleInfo.createByStr}}</a>
                </div>
                <div class="item">
                  <i class="eye icon"></i>{{article.articleInfo.traffic}}
                </div>
                <div class="item">
                  <i class="heart icon"></i>{{article.articleInfo.loveNum}}
                </div>
              </div>
          </div>
          <div class="column right aligned">
            <div class="ui breadcrumb" v-for="(articleC, index) in article.articleCategory" :key="articleC.id">
              <a v-rainbow :class="index === article.articleCategory.length -1 ? active : ''" class="section">{{articleC}}</a>
              <i v-if="index !== article.articleCategory.length -1" class="right chevron icon divider"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="ui attached basic m-padded-lr-big segment">
        <h2 class="ui header center aligned">{{article.articleInfo.title}}</h2>
        <mavon-editor v-model="article.articleContent.content" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" class="mavon"/>
<!--        赞赏-->
        <div class="ui center aligned basic segment">
          <h4 v-rainbow class="ui horizontal divider header">纷吾既又此内美兮，又重之以修能</h4>
          <button @click="payButton" class="ui orange basic circular button">赞赏</button>
        </div>
        <div v-if="flag" class="ui orange center aligned container">
            <div class="ui images" style="font-size: inherit !important;">
              <div class="image">
                <img src="../assets/wechatPay.png" alt="微信二维码" class="ui rounded bordered image" style="width: 120px">
                <div>微信</div>
              </div>
              <div class="image">
                <img src="../assets/aliPay.jpg" alt="支付宝二维码" class="ui rounded bordered image" style="width: 120px">
                <div>支付宝</div>
              </div>
            </div>
        </div>
      </div>
<!--      点赞-->
      <div class="ui attached positive message bottom">
        <div class="ui middle aligned two column grid">
          <div class="ui column">
            <ul class="list">
              <li v-if="article.articleContent.modifiedByStr > article.articleContent.createByStr">本文于 {{article.articleContent.modifiedByStr}} 修改</li>
              <li>版权声明：转载需注明本文链接和作者，并在下方留言</li>
            </ul>
          </div>
          <div v-rainbow class="ui column right aligned">
            喜欢就点个赞吧~
            <b @click="addLove">
              <i v-if="heart" class="heart outline icon"></i>
              <i v-else class="heart icon"></i>
            </b>
          </div>
        </div>
      </div>
<!--      评论-->
      <my-comment :article-comment-tree="article.articleComment" :article-id="article.articleInfo.id" id="my-comment"/>
    </div>
    <div  style="position: fixed;bottom: 0;padding: 1em!important;right: 0;z-index: 1">
    <div class="ui vertical icon buttons">
      <button type="button" class="ui teal button">目录</button>
      <a href="#my-comment" class="ui teal button">留言</a>
      <a href="#" class="ui icon button"><i class="chevron up icon"></i></a>
    </div>
    </div>
  </div>
</template>

<script>
import MyComment from '../components/mycomment'
import store from '../store/store'
import article from '../api/article'
export default {
  name: 'articleDetail',
  components: { MyComment },
  store,
  data: function () {
    return {
      active: 'active',
      flag: false,
      heart: true,
      uid: '',
      article: {
        articleInfo: {},
        articleContent: {},
        articleComment: {},
        articleCategory: {}
      }
    }
  },
  methods: {
    payButton: function () {
      this.flag === true ? this.flag = false : this.flag = true
    },
    addLove: function () {
      if (this.heart === true) {
        this.heart = false
        article.postLover(this.$route.params.id, true)
        this.article.articleInfo.loveNum += 1
      } else {
        this.heart = true
        article.postLover(this.$route.params.id, false)
        this.article.articleInfo.loveNum -= 1
      }
    },
    loadArticleInfoById () {
      let _this = this
      article.getArticleInfoById(this.$route.params.id).then(function (response) {
        // console.log(response)
        _this.article.articleInfo = response.data
      })
    },
    loadArticleById () {
      let _this = this
      article.getArticleById(this.$route.params.id).then(function (response) {
        // console.log(response)
        _this.article.articleContent = response.data[0]
        _this.article.articleComment = response.data[1]
        _this.article.articleCategory = response.data[2]
      })
    },
    getTrueOrFalse: function () {
      let _this = this
      article.getLoveTrueOrFalse(this.$route.params.id).then(function (response) {
        if (response.data !== -1) {
          _this.heart = false
          _this.uid = response.data
        }
      })
    }
  },
  directives: {
    'rainbow': {
      bind (el) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  created () {
    store.commit('activeOne', 4)
    this.loadArticleInfoById()
    this.loadArticleById()
    this.getTrueOrFalse()
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
  .m-margin-tb-big{
    margin-top: 5em;
    margin-bottom: 5em;
  }
  .m-padded-lr-big{
    padding-left: 4em !important;
    padding-right: 4em !important;
  }
  .mavon{
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
