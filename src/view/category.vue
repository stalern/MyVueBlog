<template>
  <div id="category" class="m-padded-tb-large">
    <div class="ui container">
      <div class="ui stackable grid">
        <!--左边7份-->
        <div  class="eleven wide column">
          <div class="ui top bottom segment container">
            <!--按钮-->
            <div class="ui bottom top violet segment m-margin-tb-big center aligned">
              <div class="ui inverted buttons">
                <button class="ui primary basic button" @click="getFile(1)">标签</button>
                <div class="or"></div>
                <button class="ui black basic button" @click="getFile(0)">归档</button>
              </div>
            </div>
            <div class="ui top bottom segment">
              <!--时间线-->
              <div v-if="toFile" >
                <my-tag/>
              </div>
              <div v-else>
                <my-type/>
              </div>
            </div>
          </div>
        </div>
        <!--右边5份-->
        <div class="five wide column">
          <my-aside/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAside from '../components/myaside'
import MyTag from '../components/mytag'
import MyType from '../components/mytype'
import store from '../store/store'
export default {
  name: 'category',
  store,
  components: { MyAside, MyTag, MyType },
  data () {
    return {
      toFile: false
    }
  },
  methods: {
    getFile: function (i) {
      i === 1 ? this.toFile = false : this.toFile = true
    },
    rainbow: function () {
      return '#' + Math.random().toString(16).slice(2, 8)
    }
  },
  created () {
    store.commit('activeOne', 1)
  }
}
</script>

<style scoped>
  .m-padded-tb-large{
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
