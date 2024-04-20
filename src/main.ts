import { createApp } from 'vue';

import { brLocale } from '@/assets/locale.js';
import Wind from '@/presets/wind';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import './assets/styles.css';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);
app.use(DialogService);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind,
  ripple: true,
  locale: brLocale,
});

app.mount('#app');
