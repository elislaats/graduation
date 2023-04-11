import { createRouter, createWebHistory } from 'vue-router'
import LoadingView from '../views/LoadingView.vue'

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: LoadingView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
