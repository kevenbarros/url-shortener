import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Register from '../views/register/Register.vue'
import Login from '../views/login/Login.vue'
import List from '../views/list/List.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

  ]
})

export default router
