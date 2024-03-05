import AppVue from '@/App.vue';
import AppWorkspaceVue from '@/views/AppWorkspace.vue';
import HomeModuleVue from '@/modules/home/HomeModule.vue';
import { createRouter, createWebHistory } from 'vue-router';
import homeRoutes from '@/modules/home/router';
import StableModule from '@/modules/stable/StableModule.vue';
import stableRoutes from '@/modules/stable/router';

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
              name: 'home-module',
              component: HomeModuleVue,
              children: homeRoutes,
            },
            {
              path: 'stable',
              name: 'stable-module',
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
