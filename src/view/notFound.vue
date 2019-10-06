<template>
  <div id="not-found">
    <div class="ui container m-margin-tb-big">
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
              <img src="../assets/404page.png" class="ui medium circular image" alt="这是一张帅气的头像">
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
      <h4 class="ui horizontal divider header" v-rainbow>服务器再不知名的路上迷失了自己。。。</h4>
      <div class="ui center aligned container">
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
        <br>
        <button class="ui left primary labeled icon button" @click="back"><i class="left arrow icon"></i> 返回上个页面 </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'notFound',
  directives: {
    'rainbow': {
      bind (el) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  methods: {
    back () {
      history.back()
    }
  }
}
</script>
<style scoped>
  .m-margin-tb-big{
    margin-top: 5em !important;
    margin-bottom: 2em !important;
  }
  .m-image-size{
    width: 2.6em;
    height: auto;
  }
  .m-font{
    font-weight: bolder !important;
  }
</style>
