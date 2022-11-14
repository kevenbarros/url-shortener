import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import Register from "../views/register/Register.vue";
import ListUser from "../views/listUser/ListUser.vue";
import NotFound from "../views/404/Page404.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/list",
      name: "list",
      component: ListUser,
    },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  ],
});

export default router;
