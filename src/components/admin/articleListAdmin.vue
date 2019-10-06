<template>
  <div id="article-list-admin">
    <el-table :data="articleInfoCategoryList" style="width: 100%" max-height="628" height="628">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="分类">
              <div class="ui breadcrumb" v-for="(articleC, index) in props.row.articleCategoryNames" :key="index">
                <span>- {{articleC}} -</span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.articleInfo.createByStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章 ID" prop="articleInfo.id"></el-table-column>
      <el-table-column label="文章名称" prop="articleInfo.title"></el-table-column>
      <el-table-column label="描述" prop="articleInfo.summary"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.articleInfo.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.articleInfo.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ui attached">
      <div class="center middle aligned column">
        <el-pagination layout="prev, pager, next" :total="total" :current-page="page" :page-size="size"
                       @current-change="currentChange" @prev-click="page=page-1" @next-click="page=page+1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import article from '../../api/article'
export default {
  name: 'articleListAdmin',
  props: ['flag'],
  methods: {
    handleEdit (id) {
      this.$emit('showList', 0)
      this.$emit('changeCome', id)
    },
    handleDelete (id) {
      if (confirm('确定删除吗？')) {
        article.deleteArticleById(id).then(function (response) {
          if (response) {
            alert('删除成功')
            location.reload()
          } else {
            alert('删除失败了QAQ')
          }
        })
      }
    },
    loadArticleInfoByTime (page) {
      let _this = this
      article.listArticleInfoByTime(page, this.size).then(function (response) {
        _this.articleInfoCategoryList = response.data.list
        _this.total = response.data.total
      })
    },
    currentChange (page) {
      this.page = page
      this.loadArticleInfoByTime(page)
      scrollTo(0, 0)
    }
  },
  data () {
    return {
      total: 0,
      page: 1, // 当前页数
      size: 10, // 每页显示10条
      articleInfoCategoryList: []
    }
  },
  created () {
    this.loadArticleInfoByTime(this.page)
  }
}
</script>

<style scoped>
  /*element*/
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
