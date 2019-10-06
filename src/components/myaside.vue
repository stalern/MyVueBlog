<template>
  <div id="my-aside">
    <div class="ui container">
      <router-link to="/about" class="ui medium image m-margin-l-middle">
        <img src="../assets/me.jpg" class="ui medium circular image" alt="这是一张帅气的头像">
        <div class="ui pointing purple basic label m-margin-l-big">热爱</div>
        <div class="ui pointing red basic label">认真</div>
        <div class="ui pointing blue basic label">规律</div>
        <div class="ui pointing violet basic label">坚持</div>
      </router-link>
    </div>
    <br>
    <div class="ui container">
      <audio controls="controls" class="m-margin-l-middle">
        <source src="../assets/backgroundMusic.mp3" type="audio/mp3" />
        <source src="../assets/backgroundMusic.mp3" type="audio/ogg" />
        <embed height="100" width="100" autostart="true" loop="true" src="../assets/backgroundMusic.mp3" />
      </audio>
    </div>
    <h4 class="ui horizontal divider header">有一头鲸鱼正跳出阿拉斯加的海面</h4>
    <div class="m-text m-font" style="text-align: center">
      <br>
      <p v-rainbow>早起早睡</p>
      <p v-rainbow>一日三餐</p>
      <p v-rainbow>带管不宜多</p>
      <p v-rainbow>午休不能少</p>
      <p v-rainbow>运动篮球常跑步</p>
      <p v-rainbow>怡宝百岁多喝水</p>
      <p v-rainbow>大热天记得带遮阳伞</p>
      <p v-rainbow>夏末时必要穿长秋裤</p>
    </div>
    <div class="list link horizontal m-margin-t-big">
      <button class="ui circular linkedin icon button m-margin-l-bigger" onclick="location.href='https://wpa.qq.com/msgrd?v=3&uin=2305450070'">
        <i class="qq icon"></i>
      </button>
      <button class="ui circular teal icon button m-margin-l-middle" onclick="location.href='mailto:stonee233@163.com'">
        <i class="mail icon"></i>
      </button>
      <button class="ui circular white icon button m-margin-l-middle" onclick="location.href='https://github.com/stalern'">
        <i class="github icon"></i>
      </button>
      <button class="ui circular google plus icon button m-image-size m-margin-l-middle">
        <a href="https://blog.csdn.net/coder_what" class="ui big image">
          <img src="../assets/csdnico.jpg" class="ui circular image" alt="这是一张csdn的图标">
        </a>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myAside',
  directives: {
    'rainbow': {
      bind (el) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  }
}
</script>

<style scoped>
  .m-margin-l-big{
    margin-left: 4em;
  }
  .m-margin-l-bigger{
    margin-left: 4.5em;
  }
  .m-margin-l-middle{
    margin-left: 1.2em;
  }
  .m-margin-t-big{
    margin-top: 3em;
  }
  .m-font{
    font-weight: bolder !important;
  }
  .m-image-size{
    width: 2.6em;
    height: auto;
  }
</style>
