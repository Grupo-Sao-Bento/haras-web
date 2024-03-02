import AppVue from '@/App.vue'
import AppWorkspaceVue from '@/views/AppWorkspace.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppVue,
      children: [
        {
          path: 'w',
          component: AppWorkspaceVue
        }
      ]
    }
  ]
})

export default router
