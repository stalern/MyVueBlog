<template>
  <div id="article-list">
    <!--          头部一个框-->
    <div class="ui top attached segment">
      <!--            把7列重新变为两列，并垂直居中-->
      <div class="ui middle two column grid">
        <!--              第一列-->
        <div class="column">
          <h3 class="ui teal header">{{type}}文章</h3>
        </div>
        <div class="column right aligned">
          共 <h3 class="ui orange header m-inline-block">{{total}}</h3> 篇
        </div>
      </div>
    </div>
    <!--        中间内容-->
    <div class="ui attached segment">
      <div v-for="articleInfo in articleInfoCategoryList" :key="articleInfo.articleInfo.id">
        <div class="ui padded m-margin-tb-big segment" v-if="articleInfo.articleInfo.title !== '公告' && articleInfo.articleInfo.title !== '关于' && articleInfo.articleInfo.id !== null">
        <router-link :to="{name:'articleDetail', params: {id:articleInfo.articleInfo.id}}" class="ui grid m-padded-b-big">
          <div class="eleven wide column">
            <h3 v-rainbow class="ui header">{{articleInfo.articleInfo.title}}</h3>
          </div>
          <div class="five wide right aligned column">
            <div class="ui horizontal link list">
              <div class="item">
                <i class="eye icon"></i>{{articleInfo.articleInfo.traffic}}
              </div>
              <div class="item">
                <i class="heart icon"></i>{{articleInfo.articleInfo.loveNum}}
              </div>
            </div>
          </div>
        </router-link>
        <p class="m-text m-opacity">{{articleInfo.articleInfo.summary}}</p>
        <div class="ui  grid">
          <div class="five wide column">
            <!--                  水平list-->
            <div class="ui horizontal link list">
              <div class="item">
                <i class="calendar icon"></i>
              </div>
              <div class="item">
                <a href="#">{{articleInfo.articleInfo.createByStr}}</a>
              </div>
            </div>
          </div>
          <div class="eleven wide right aligned column">
            <div class="ui breadcrumb" v-for="(articleC, index) in articleInfo.articleCategoryNames" :key="index">
              <a v-rainbow :class="index === articleInfo.articleCategoryNames.length -1 ? active : ''" class="section">{{articleC}}</a>
              <i v-if="index !== articleInfo.articleCategoryNames.length -1" class="right chevron icon divider"></i>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <!--        尾部-->
    <div class="ui pink attached segment bottom">
      <div class="ui container">
        <div class="center middle aligned column">
          <el-pagination layout="prev, pager, next" :total="total" :current-page="page" :page-size="size"
                         @current-change="currentChange" @prev-click="page=page-1" @next-click="page=page+1">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import article from '../api/article'
export default {
  name: 'articleList',
  props: ['cid', 'type'], // 分类id
  data () {
    return {
      active: 'active',
      total: 0,
      articleInfoCategoryList: [], // 文章信息
      page: 1, // 当前页数
      size: 6 // 每页显示6条
    }
  },
  methods: {
    loadArticleInfoByTime (page) {
      let _this = this
      article.listArticleInfoByTime(page, this.size).then(function (response) {
        _this.articleInfoCategoryList = response.data.list
        _this.total = response.data.total - 2
        // console.log(response)
      })
    },
    loadArticleInfoByCategoryId (page) {
      let _this = this
      article.listArticleInfoByCategoryId(page, this.size, this.cid).then(function (response) {
        _this.total = response.data.total
        _this.articleInfoCategoryList = response.data.list
      })
    },
    loadArticleInfoByTimeNum (page) {
      let _this = this
      article.listArticleInfoByTimeNum(page, this.size, this.type).then(function (response) {
        // console.log(response)
        _this.total = response.data.total
        _this.articleInfoCategoryList = response.data.list
      })
    },
    currentChange (page) {
      this.page = page
      if (this.type === null) {
        this.loadArticleInfoByTime(page)
      } else if (this.type.includes('201')) {
        this.loadArticleInfoByTimeNum(page)
      } else {
        this.loadArticleInfoByCategoryId(page)
      }
      scrollTo(0, 0)
    }
  },
  directives: {
    'rainbow': {
      bind (el) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  mounted () {
    if (this.type === null) {
      this.loadArticleInfoByTime(this.page)
    } else if (this.type.includes('201')) {
      this.loadArticleInfoByTimeNum(this.page)
    } else {
      this.loadArticleInfoByCategoryId(this.page)
    }
    // console.log(this.type)
    // console.log(this.cid)
  }
}
</script>

<style scoped>
  /*转换block*/
  .m-inline-block{
    display: inline-block;
  }
  .m-padded-b-big{
    padding-bottom: 0.8em;
  }
  .m-margin-tb-big{
    margin-bottom: 1em !important;
    margin-top: 1em !important;
  }
  .m-text{
    letter-spacing: 1px !important;
    line-height: 1.5;
  }
  /*透明度*/
  .m-opacity{
    opacity: 0.8;
  }
</style>
