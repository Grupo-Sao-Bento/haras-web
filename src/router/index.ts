import AppVue from '@/App.vue';
import customersRoutes from '@/modules/customers/router';
import homeRoutes from '@/modules/home/router';
import stableRoutes from '@/modules/stable/router';
import { createRouter, createWebHistory } from 'vue-router';

import authenticationGuard from './guards/authenticationGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppVue,
      redirect: '/auth',
      name: 'Root',
      children: [
        {
          path: 'auth',
          component: () => import('@/views/AuthView.vue'),
        },
        {
          path: 'w',
          component: () => import('@/views/AppWorkspace.vue'),
          redirect: '/w/home',
          beforeEnter: [authenticationGuard],
          children: [
            {
              path: 'home',
              component: () => import('@/modules/home/HomeModule.vue'),
              children: homeRoutes,
            },
            {
              path: 'stable',
              component: () => import('@/modules/stable/StableModule.vue'),
              children: stableRoutes,
            },
            {
              path: 'customers',
              component: () => import('@/modules/customers/CustomersModule.vue'),
              children: customersRoutes,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
