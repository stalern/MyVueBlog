<template>
  <div id="about">
    <!--    容器有响应式的效果-->
    <div class="ui m-container m-margin-tb-big">
      <!--      top有圆角效果-->
      <div class="ui top teal attached segment">
          <div class="middle aligned">
            <div class="ui horizontal link list">
              <div class="item">
                <i class="calendar icon"></i>
              </div>
              <div class="item m-margin-l-small">
                <a href="#">{{articleContent.createByStr}}</a>
              </div>
              <div class="item">
                <i class="eye icon"></i>{{articleInfo.traffic}}
              </div>
            </div>
        </div>
      </div>
      <div class="ui attached m-padded-lr-big segment">
<!--        头像-->
        <div class="ui center aligned container">
          <div class="ui five column grid">
            <div class="ui middle aligned column">
              <div class="ui right pointing purple basic label">热爱</div>
              <button class="ui circular linkedin icon button m-margin-l-bigger" onclick="location.href='https://wpa.qq.com/msgrd?v=3&uin=2305450070'">
                <i class="qq icon"></i>
              </button>
            </div>
            <div class="ui middle aligned column">
              <div class="ui right pointing green basic label">认真</div>
              <button class="ui circular teal icon button m-margin-l-middle" onclick="location.href='mailto:stonee233@163.com'">
                <i class="mail icon"></i>
              </button>
            </div>
            <div class="ui column">
              <div class="ui small image m-margin-l-middle">
                <img src="../assets/me1.jpg" class="ui medium circular image" alt="这是一张帅气的头像">
              </div>
            </div>
            <div class="ui middle aligned column">
              <button class="ui circular white icon button m-margin-l-middle" onclick="location.href='https://github.com/stalean'">
                <i class="github icon"></i>
              </button>
              <div class="ui left pointing grey basic label">规律</div>
            </div>
            <div class="ui middle aligned column">
              <button class="ui circular google plus icon button m-image-size m-margin-l-middle">
                <a href="https://blog.csdn.net/coder_what" class="ui big image">
                  <img src="../assets/csdnico.jpg" class="ui circular image" alt="这是一张csdn的图标">
                </a>
              </button>
              <div class="ui left pointing orange basic label">坚持</div>
            </div>
          </div>
        </div>

        <h2 v-rainbow class="ui header center aligned">这里王星星</h2>
        <mavon-editor v-model="articleContent.content" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" class="mavon"/>
        <h4 class="ui horizontal divider header">我的朋友们</h4>
        <br>
        <div class="ui link cards">
          <div class="card">
            <a class="image" href="https://blog.csdn.net/qq_42322103">
              <img src="https://avatars3.githubusercontent.com/u/38468655?s=460&v=4" alt="头像">
            </a>
            <div class="content">
              <div class="header">沉晓</div>
              <div class="meta">
                <a>好友</a>
              </div>
              <div class="description">一个超低调的大佬</div>
            </div>
          </div>
        </div>
        <br>
      </div>
      <!-- 版权-->
      <div class="ui attached positive message bottom">
          <div class="ui">
            <ul class="list">
              <li>版权声明：不得以任何方式和理由转载本文</li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store/store'
import article from '../api/article'
export default {
  name: 'about',
  data () {
    return {
      articleContent: {},
      articleInfo: {}
    }
  },
  store,
  methods: {
    loadArticleById () {
      let _this = this
      article.getArticleById(2).then(function (response) {
        _this.articleContent = response.data[0]
      }).then(
        article.getArticleInfoById(2).then(function (response) {
          _this.articleInfo = response.data
        }))
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
    store.commit('activeOne', 3)
    this.loadArticleById()
  }
}
</script>

<style scoped>
  .m-margin-tb-big{
    margin-top: 5em !important;
    margin-bottom: 5em !important;
  }
  .m-container{
    max-width: 70em !important;
    margin: auto;
  }
  .m-margin-l-small{
    margin-left: 0.1em !important;
  }
  .m-image-size{
    width: 2.6em;
    height: auto;
  }
  .m-padded-lr-big{
    padding-left: 4em !important;
    padding-right: 4em !important;
  }
  #editor{
    margin-left: -20px !important;
    margin-right: -20px !important;
  }
</style>
