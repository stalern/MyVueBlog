<template>
  <div class="multistage">
    <div v-if="children != null" class="comments">
      <div class="comment" v-for="categoryInfo in children" :key="categoryInfo.object.id">
        <div class="ui middle three column grid">
          <div class="column middle aligned">
            <div class="ui labeled button">
              <router-link :to="{name:'categoryList', params: {cid:categoryInfo.id,type:categoryInfo.object.name}}" class="ui primary basic button">
                <h4 v-rainbow>{{categoryInfo.object.name}}</h4>
              </router-link>
              <label class="ui teal basic left pointing label" v-rainbow>{{categoryInfo.object.number}}</label>
            </div>
          </div>
          <div class="column middle aligned">
            <div class="ui horizontal divider">-</div>
          </div>
          <div class="column right aligned " v-if="categoryInfo.children !== null">
            <i v-if="flag !== categoryInfo.object.id" @click="flag === categoryInfo.object.id ? flag=-1 : flag = categoryInfo.object.id" class="angle double down icon"></i>
            <i v-else @click="flag === categoryInfo.object.id ? flag=-1 : flag = categoryInfo.object.id" class="angle double up icon"></i>
          </div>
        </div>
        <multistage :children="categoryInfo.children" v-if="flag === categoryInfo.object.id"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'multistage',
  props: ['children'],
  data () {
    return {
      flag: -1
    }
  },
  directives: {
    'rainbow': {
      bind (el) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
