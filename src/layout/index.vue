<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
</script>

<style scoped lang="scss">
.el-header {
  display: flex;
  align-items: center;
  padding: 0;
}


</style>