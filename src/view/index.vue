<template>
  <div id="index" class="m-padded-tb-large">
<!--    容器有响应式的效果-->
    <div class="ui container">
      <div class="ui stackable grid">
<!--        左边7份-->
        <div  class="eleven wide column">
          <article-list :cid="cid" :type="type"/>
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
import user from '../api/user'
export default {
  name: 'index',
  data () {
    return {
      cid: 0,
      type: null
    }
  },
  store,
  components: { ArticleList, MyAside },
  methods: {
    postUser () {
      user.postUser()
    }
  },
  created () {
    store.commit('activeOne', 0)
    this.postUser()
  }
}

</script>

<style scoped>
  .m-padded-tb-large{
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
