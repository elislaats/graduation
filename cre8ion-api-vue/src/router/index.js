import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    name: "404",
    path: "/:pathMatch(.*)",
    component: () => import("@/views/PageNotFound.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
