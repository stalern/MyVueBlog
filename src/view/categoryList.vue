<template>
  <div id="category-list" class="m-padded-tb-large">
    <!--    容器有响应式的效果-->
    <div class="ui container">
      <div class="ui stackable grid">
        <!--        左边7份-->
        <div  class="eleven wide column">
          <article-list :cid="this.$route.params.cid" :type="this.$route.params.type"/>
        </div>
        <!--        右边5份-->
        <div class="five wide column">
          <my-aside/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAside from '../components/myaside'
import ArticleList from '../components/articlelist'
import store from '../store/store'
export default {
  name: 'categoryList',
  store,
  components: { ArticleList, MyAside },
  created () {
    store.commit('activeOne', 4)
  }
}

</script>

<style scoped>
  .m-padded-tb-large{
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
