import { createRouter, createWebHistory } from 'vue-router'
import StartupView from '@/views/StartupView.vue'


const routes = [
  {
    path: '/',
    name: 'load',
    component: StartupView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router