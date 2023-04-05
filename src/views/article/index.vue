<template>
  <div id="main">
    <el-form ref="formRef" :model="formData" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" />
      </el-form-item>
      <!-- <el-form-item label="文章分类" prop="category">
        <el-select v-model="formData.category" placeholder="请选择文章分类">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="String(item.id)" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="文章摘要" prop="summary">
        <el-input v-model="formData.summary" type="textarea" placeholder="文章摘要..." />
      </el-form-item>
      <!-- <el-form-item label="文章封面">
      </el-form-item> -->
      <el-form-item>
        <v-md-editor v-model="formData.content" height="600px" placeholder="文章内容..."></v-md-editor>
      </el-form-item>

      <el-form-item label="是否公开">
        <el-switch v-model="formData.is_public" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item>
        <el-button>存草稿</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// import { getCategoryList } from '@/api/blog/category';
import { ElMessage } from 'element-plus'
import { addBlog } from '@/api/blog/blog'


const categoryList = ref([])
onMounted(async () => {
  // getCategoryList().then(res => {
  //   categoryList.value = res.data
  // })
  // categoryList.value = (await getCategoryList()).data
})


const formRef = ref(null)
const formData = reactive({
  title: '',
  content: '',
  category: '',
  is_public: 0,
  cover: 'https://w.wallhaven.cc/full/d6/wallhaven-d66eej.jpg',
  summary: ''
})
const rules = reactive({
  title: [{ required: true, message: '请输入文章标题', tirgger: 'blur' }],
  category: [{ required: true, message: '请选择文章分类', tirgger: 'blur' }],
  summary: [{ required: true, message: '请选择文章分类', tirgger: 'blur' }],
})

const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(formData)
      if (formData.content) {
        addBlog(formData).then(res => {
          if (res.code) {
            formEl.resetFields()
            ElMessage({
              message: '发布成功',
              type: 'success',
            })
          } else {
            ElMessage({
              message: '发布失败',
              type: 'error',
            })
          }
        })
      } else {
        ElMessage({
          message: '文章内容为空',
          type: 'warning',
        })
      }
    }
  })
}
</script>

<style scoped lang="scss">
.v-md-editor {
  // margin: 20px 0;
}
</style>