import AppVue from '@/App.vue';
import HomeModuleVue from '@/modules/home/HomeModule.vue';
import homeRoutes from '@/modules/home/router';
import StableModule from '@/modules/stable/StableModule.vue';
import stableRoutes from '@/modules/stable/router';
import AppWorkspaceVue from '@/views/AppWorkspace.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppVue,
      redirect: '/w',
      children: [
        {
          path: 'w',
          component: AppWorkspaceVue,
          redirect: '/w/home',
          children: [
            {
              path: 'home',
              component: HomeModuleVue,
              children: homeRoutes,
            },
            {
              path: 'stable',
              component: StableModule,
              children: stableRoutes,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
