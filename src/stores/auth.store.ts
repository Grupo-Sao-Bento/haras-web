import { ref } from 'vue';

import router from '@/router';
import httpClient from '@/services/http-client';
import { defineStore } from 'pinia';

import { useToastStore } from './toast.store';
import { useUserStore } from './user.store';

export const useAuthStore = defineStore('auth', () => {
  const toastStore = useToastStore();
  const userStore = useUserStore();

  const state = ref({ token: '' });

  const login = async (login: string, password: string) => {
    try {
      const token = await httpClient
        .post<{ token: string }>('auth/login', { login, password })
        .then((res) => res.data.token);

      state.value.token = token;
      localStorage.setItem('jwt', token);

      await userStore.getMyInfo();
      if (userStore.state.user.id) {
        router.push('/w');
      }
    } catch (err: any) {
      switch (err.response?.status) {
        case 401:
          toastStore.show({
            severity: 'error',
            summary: 'Falha ao entrar',
            detail: 'Usuário e/ou senha incorretos',
          });
          break;
        default:
          toastStore.show({
            severity: 'error',
            summary: 'Ocorreu um erro interno',
            detail: 'Tente novamente mais tarde, ou contate o suporte.',
          });
          break;
      }
    }
  };

  return { state, login };
});
