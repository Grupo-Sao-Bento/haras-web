import type { RouteRecordRaw } from 'vue-router';

import CustomersView from './views/CustomersView.vue';

const customersRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: CustomersView,
  },
];

export default customersRoutes;
