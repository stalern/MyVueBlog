<template>
<div id="article-admin">
  <div class="ui attached pointing menu">
    <div class="ui container">
      <div class="right menu">
        <el-button round class="item" @click="showList(0)">发布博客</el-button>
        <el-button round class="item" @click="showList(1)">博客列表</el-button>
      </div>
    </div>
  </div>
  <div class="ui middle aligned container m-padded-tb-large">
    <div class="ui teal segment">
      <article-list-admin v-if="showListFlag" @showList="showList" @changeCome="changeCome"/>
      <write-article v-else :come-from="comeFrom"/>
    </div>
  </div>
</div>
</template>

<script>
import store from '../../store/store'
import ArticleListAdmin from '../../components/admin/articleListAdmin'
import WriteArticle from '../../components/admin/writeArticle'
export default {
  name: 'articleAdmin',
  data () {
    return {
      showListFlag: true,
      comeFrom: -1
    }
  },
  components: { WriteArticle, ArticleListAdmin },
  methods: {
    showList (flag) {
      if (flag === 1) {
        this.showListFlag = true
      } else {
        this.showListFlag = false
        this.comeFrom = -1
      }
    },
    changeCome (id) {
      this.comeFrom = id
    }
  },
  created () {
    store.commit('activeOne', 4)
  }
}
</script>

<style scoped>
  .m-padded-tb-large{
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
