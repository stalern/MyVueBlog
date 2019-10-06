<template>
  <div class="ui center aligned container">
    <div class="radio">
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>
    <br>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.time"
        :color="rainbow()">
        <el-card>
          <router-link :to="{name:'categoryList', params: {cid:index,type:activity.time}}">
            <div v-if="activity.time === '2019-7'">共更新{{activity.num - 2}}篇博客</div>
            <div v-else>共更新{{activity.num }}篇博客</div>
          </router-link>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import article from '../api/article'
export default {
  name: 'myTag',
  data () {
    return {
      reverse: true,
      activities: []
    }
  },
  methods: {
    rainbow: function () {
      return '#' + Math.random().toString(16).slice(2, 8)
    },
    loadNumOfTime () {
      let _this = this
      article.listNumOfTime().then(function (response) {
        // console.log(response)
        _this.activities = response.data
      })
    }
  },
  created () {
    this.loadNumOfTime()
  }
}
</script>

<style scoped>

</style>
