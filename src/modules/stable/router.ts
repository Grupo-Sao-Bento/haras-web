import type { RouteRecordRaw } from 'vue-router';

import StableView from './views/StableView.vue';

const stableRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: StableView,
  },
];

export default stableRoutes;
