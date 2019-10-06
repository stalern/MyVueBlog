<template>
  <div id="app" >
    <my-header/>
    <router-view/>
    <my-footer/>
  </div>
</template>

<script>
import myFooter from './components/myfooter'
import myHeader from './components/myheader'
export default {
  name: 'app',
  components: {
    myFooter, myHeader
  }
}
</script>

<style>
  body {
    background: url('./assets/background.png');
    font-family: "等线",serif;
  }
</style>
