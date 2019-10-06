<template>
  <div id="write-article" class="ui container">
    <el-form :model="article" :rules="rules" ref="article" label-width="100px" class="demo-article">
      <el-form-item label="博客标题" prop="name">
        <el-input v-model="article.name"></el-input>
      </el-form-item>
      <el-form-item label="博客描述" prop="summary">
        <el-input v-model="article.summary"></el-input>
      </el-form-item>
      <el-form-item label="博客内容" prop="content" size="medium">
        <mavon-editor ref=md :toolbars="toolbars" @save="save()" v-model="article.content" id="editor" style="height: 600px"/>
      </el-form-item>
      <div class="ui two column grid">
        <div class="ui column">
          <el-form-item label="博客分类" prop="c">
            <el-select v-model="article.c" placeholder="请选择分类" value="" >
                <div v-for="category in article.category" :key="category.id">
                  <div v-if="category.name !== '公告' && category.name !== '关于'">
                    <el-option :label="category.name" :value="category.id"></el-option>
                  </div>
                </div>
            </el-select>
          </el-form-item>
        </div>
        <div class="ui center right aligned column">
          <el-form-item>
            <el-button v-if="comeFrom === -1" class="ui grey basic button" @click="submitForm('article')">立即发布</el-button>
            <el-button v-else class="ui grey basic button" @click="submitForm('article')">立即更新</el-button>
            <el-button class="ui blue basic button" @click="resetForm('article')">重置</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import article from '../../api/article'
import categoryInfo from '../../api/categoryInfo'
export default {
  name: 'writeArticle',
  props: ['comeFrom'],
  data () {
    return {
      article: {
        c: '',
        name: '',
        category: '',
        summary: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入详细信息', trigger: 'change' }
        ],
        c: [
          { required: true, message: '请选择一个分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ]
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: false, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.comeFrom === -1) {
            this.postArticleA()
          } else {
            this.updateArticleA()
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    loadCategoryInfoPa () {
      let _this = this
      categoryInfo.listCategoryInfoPa().then(function (response) {
        _this.article.category = response.data
      })
    },
    postArticleA () {
      let _this = this
      article.postArticle(this.article.c, this.article.name, this.article.summary, this.article.content).then(function (response) {
        if (response) {
          alert('发布成功')
          _this.$router.push({ // 路由跳转
            path: '/index'
          })
        }
      })
    },
    updateArticleA () {
      let _this = this
      article.updateArticle(this.comeFrom, this.article.c, this.article.name, this.article.summary, this.article.content).then(function (response) {
        if (response) {
          alert('更新成功')
          _this.$router.push({ // 路由跳转
            path: '/article/' + _this.comeFrom
          })
        }
      })
    },
    loadArticleContentById () {
      let _this = this
      article.getArticleContentById(this.comeFrom).then(function (response) {
        _this.article.content = response.data.content
      })
    },
    loadArticleInfoById () {
      let _this = this
      article.getArticleInfoById(this.comeFrom).then(function (response) {
        _this.article.name = response.data.title
        _this.article.summary = response.data.summary
      })
    },
    loadCategoryNameById () {
      let _this = this
      categoryInfo.getCategoryInfoByArticleId(this.comeFrom).then(function (response) {
        // console.log(response)
        _this.article.c = response.data.id
      })
    }
  },
  directives: {
    'rainbow': {
      bind (el) {
        el.style.color = '#' + Math.random().toString(16).slice(2, 8)
      }
    }
  },
  watch: {
    comeFrom: {
      handler () {
        this.article.content = ''
        this.article.name = ''
        this.article.summary = ''
        this.article.c = ''
      },
      deep: true
    }
  },
  created () {
    this.loadCategoryInfoPa()
    // console.log(this.comeFrom)
    if (this.comeFrom !== -1) {
      this.loadArticleInfoById()
      this.loadArticleContentById()
      this.loadCategoryNameById()
    }
  }
}
</script>

<style scoped>
</style>
