export default {
  routes: () => {
    return [
      {
        name: "Pagina Niet gevonden",
        path: "/:catchAll(.*)*",
        component: () => import("@/views/NotFound.vue"),
      },
    ];
  },
};