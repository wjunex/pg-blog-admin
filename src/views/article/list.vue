<template>
  <div class="content">
    <el-button type="primary" style="margin-bottom:20px;" @click="">写文章</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" :index="1" width="80" align="center" />
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="category" label="分类名称" width="180" />
      <el-table-column prop="img" label="文章封面" width="180" />
      <el-table-column prop="describes" label="文章摘要" width="180" />
      <el-table-column prop="content" label="文章内容" width="180" />
      <el-table-column prop="isPublic" label="是否公开" width="180" />
      <el-table-column prop="create_time" label="发布时间" width="180" />
      <el-table-column prop="update_time" label="修改时间" width="180" />
      
      <el-table-column width="150" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除？" confirm-button-text="是" cancel-button-text="否"
            @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { getBlogList } from '@/api/blog/article'

import { ElMessage } from 'element-plus'

onMounted(() => {
  getTableData(page.value)
})

const tableData = ref([])
const page = ref(1)
function getTableData(page) {
  getBlogList({ page, pageSize: 10 }).then(res => {
    tableData.value = res.data
  })
}

function handleEdit(index, item) {
  dialogFormVisible.value = true;
  isAdd.value = false;
  curr_options.name = item.name
  curr_options.id = item.id
}

function handleDelete(index, item) {
  // delCategory({
  //   id: item.id
  // }).then(() => {
  //   ElMessage({
  //     message: '删除成功',
  //     type: 'success',
  //   })
  //   getTableData(page.value)
  // })
}

const dialogFormVisible = ref(false);
const form = reactive({
  categoryName: ''
})
const isAdd = ref(true)
const curr_options = reactive({
  id: 0,
  name: ''
});
const rules = reactive({
  categoryName: [{
    required: true,
    message: '请输入分类名称',
    tirgger: 'blur'
  }]
})




const formRef = ref(null)
const closeDialog = (formRef) => {
  curr_options.name = ''
  curr_options.id = 0
  isAdd.value = true
  formRef.resetFields()

}


</script>

<style scoped lang="scss">
.content {
  background-color: #fff;
}
</style>