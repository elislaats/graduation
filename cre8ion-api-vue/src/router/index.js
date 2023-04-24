import { createRouter, createWebHistory } from "vue-router";

function checkForParent(goal) {
  const routes = router.getRoutes();
  let foundParent = false;
  routes.forEach((route) => {
    if (goal.path.includes(route.path)) {
      foundParent = route;
    }
  });
  return foundParent;
}

function createDetailRoute(parent) {
  if (!router.hasRoute(`${parent.name}-detail-hidden`)) {
    const route = {
      name: `${parent.name} detail`,
      path: `${parent.path}/:slug`,
      component: () => import("@/views/DetailView.vue"),
      props: true,
    };
    router.addRoute(route);
  }
}

const routes = [
  {
    name: "404",
    path: "/:catchAll(.*)?",
    beforeEnter: (to, from, next) => {
      if (!to.meta.wasChecked) {
        const parent = checkForParent(to);
        if (parent) {
          createDetailRoute(parent, to);
          next(to.path);
        } else {
          next();
        }
      } else {
        next();
      }
    },
    component: () => import("@/views/PageNotFound.vue"),
    meta: { wasChecked: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
