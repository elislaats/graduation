import { createRouter, createWebHistory } from "vue-router";
import LoadingView from "../views/LoadingView.vue";

const routes = [
  {
    name: 'Loading',
    path: "/",
    component: LoadingView,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
