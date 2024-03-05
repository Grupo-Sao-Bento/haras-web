import type { RouteRecordRaw } from 'vue-router';
import HomeView from './views/HomeView.vue';

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: HomeView,
  },
];

export default homeRoutes;
