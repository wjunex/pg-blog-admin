<template>
  <div class="content">
    <el-button type="primary" style="margin-bottom:20px;" @click="() => (dialogFormVisible = true)">新增分类</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" :index="1"  width="180" align="center" />
      <!-- <el-table-column prop="id" label="分类id" width="80" /> -->
      <el-table-column prop="name" label="分类名称" width="180" />
      <el-table-column prop="create_date" label="创建时间" width="180" />
      <el-table-column>
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


    <el-dialog v-model="dialogFormVisible" :title="isAdd ? '新增分类' : '编辑分类'" @close="closeDialog(formRef)">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="分类名称" :label-width="100" prop="categoryName">
          <el-input v-model="form.categoryName" :placeholder="curr_options.name || '请输入分类名称'" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm(formRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { getCategoryList, addCategory, updateCategory, delCategory } from '@/api/blog/category';
import { ElMessage } from 'element-plus'

onMounted(() => {
  getTableData(page.value)
})

const tableData = ref([])
const page = ref(1)
function getTableData(page) {
  getCategoryList({ page }).then(res => {
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
  delCategory({
    id: item.id
  }).then(() => {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    getTableData(page.value)
  })
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
const confirm = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addCategory({
          name: form.categoryName
        }).then(() => {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          getTableData(page.value)
        })
      } else {
        updateCategory({
          id: curr_options.id,
          name: form.categoryName
        }).then(() => {
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          getTableData(page.value)
        })
      }
      dialogFormVisible.value = false
    }
  })
}

</script>

<style scoped lang="scss">
.content {
  background-color: #fff;
}
</style>