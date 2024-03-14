import { createApp } from 'vue';

import Wind from '@/presets/wind';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import './assets/styles.css';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(DialogService);
app.use(ToastService);
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind,
  ripple: true,
});

app.mount('#app');
