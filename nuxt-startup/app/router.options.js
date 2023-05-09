export default {
  routes: (_routes) => [
    {
      name: "loading",
      path: "/",
      component: () => import("@/views/LoadingView.vue"),
    },
  ],
};
