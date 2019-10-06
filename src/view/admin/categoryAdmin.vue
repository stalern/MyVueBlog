<template>
  <div id="category-admin">
    <div class="ui container m-padded-tb-large">
      <div class="ui bottom top violet segment m-margin-tb-big">
        <div class="ui middle aligned grid">
          <div class="thirteen wide column">
            <h3 class="ui teal header">分类管理</h3>
          </div>
          <div class="three wide column right aligned">
            <el-input v-model="category" placeholder="填入分类"></el-input>
          </div>
        </div>
      </div>
      <div class="ui teal segment" style="min-height: 600px">
        <div class="custom-tree-container">
          <div class="block">
            <el-tree :data="categoryInfoTree" node-key="id" default-expand-all :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.data.object.name }}</span>
                <span>
                  <el-button v-if="node.data.object.name !== '公告' && node.data.object.name !== '关于'"
                             type="text" size="mini" @click="() => append(node, data)">Append</el-button>
                  <el-button v-if="node.data.object.name !== '生活' && node.data.object.name !== '技术' &&
                                   node.data.object.name !== '公告' && node.data.object.name !== '关于'"
                             type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/store'
import categoryInfo from '../../api/categoryInfo'
let id = 1000
export default {
  name: 'categoryAdmin',
  created () {
    store.commit('activeOne', 4)
    this.loadCategoryInfo()
  },
  data () {
    return {
      category: '',
      categoryInfoTree: []
    }
  },

  methods: {
    append (node, data) {
      if (this.category !== '') {
        const newChild = { id: id++, object: { name: this.category }, children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        categoryInfo.postCategoryInfo(this.category, data.id)
        // console.log(node)
        // console.log(data)
      } else {
        alert('请填入要添加的分类')
      }
    },
    remove (node, data) {
      if (confirm('确定删除' + data.object.name + '吗?')) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        // console.log(data)
        categoryInfo.deleteCategoryById(data.object.id)
      }
    },
    loadCategoryInfo () {
      let _this = this
      categoryInfo.listCategoryInfo().then(function (response) {
        // console.log(response)
        _this.categoryInfoTree = response.data.children
      })
    }
  },
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
  .m-padded-tb-large{
    padding-top: 3em;
    padding-bottom: 3em;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
