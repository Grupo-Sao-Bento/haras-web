import type { RouteRecordRaw } from 'vue-router';

import CustomersView from './views/CustomersView.vue';
import GroupsView from './views/CustomersView/GroupsView.vue';
import StandaloneView from './views/CustomersView/StandaloneView.vue';

const customersRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: CustomersView,
    redirect: '/w/customers/standalone',
    children: [
      {
        path: 'standalone',
        component: StandaloneView,
      },
      {
        path: 'groups',
        component: GroupsView,
      },
    ],
  },
];

export default customersRoutes;
