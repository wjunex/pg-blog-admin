import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/article',
      name: 'article',
      component: () => import("@/views/article/index.vue")
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import("@/views/article/list.vue")
    }
  ],
});

export default router;
