import { createApp } from 'vue';

import Lara from '@/presets/lara';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import './assets/styles.css';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});

app.mount('#app');
