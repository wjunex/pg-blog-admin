<template>
  <div class="aside">
    <div class="logo">
      瓶格后台
    </div>
    <div class="menu">
      <RouterLink :to="item.url" v-for="(item, index) in menuList" :key="index">
        <div class="menu-item">
          {{ item.name }}
        </div>
      </RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from "vue-router";


const menuList = ref([
  {
    name: '首页',
    url: '/'
  },
  {
    name: '写文章',
    url: '/article'
  },
  {
    name: '文章管理',
    url: '/blog'
  },
  {
    name: '博客分类管理',
    url: '/about'
  }
])
</script>

<style scoped lang="scss">
.aside {
  color: rgb(191, 203, 217);
  background-color: rgb(48, 65, 86);
  height: 100vh;
  width: 200px;

  position: fixed;
  top: 0;
  left: 0;

  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu {

    a {
      color: #fff;
      text-decoration: none;
    }
    
    a.router-link-exact-active {
      color: aqua;
    }

    .menu-item {
      width: 100%;
      height: 40px;
      display: flex;
      // justify-content: center;
      box-sizing: border-box;
      padding: 0 30px;
      align-items: center;

    }
  }
}
</style>