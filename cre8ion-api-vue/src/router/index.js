import { createRouter, createWebHistory } from "vue-router";

function checkForParent(goal) {
  const routes = router.getRoutes();
  let foundParent = false;
  routes.forEach((route) => {
    if (goal.path.includes(route.path)) {
      console.log(route.path, goal.path);
      foundParent = route;
    }
  });
  return foundParent;
}

function createDetailRoute(parent) {
  if (!router.hasRoute(`${parent.name}-detail-hidden`)) {
    const route = {
      name: `${parent.name}-detail-hidden`,
      path: `${parent.path}/:slug`,
      component: () => import("../views/DetailView.vue"),
      props: true,
    };
    router.addRoute(route);
  }
}

const routes = [
  {
    path: "/:catchAll(.*)",
    beforeEnter: (to, from, next) => {
      const parent = checkForParent(to);
      if (parent) {
        createDetailRoute(parent, to);
        next(to.path);
      } else {
        next();
      }
    },
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
