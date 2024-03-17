import { ref } from 'vue';

import httpClient from '@/services/httpClient';
import { defineStore } from 'pinia';

import { useToastStore } from './toast.store';

export const useAuthStore = defineStore('auth', () => {
  const toastStore = useToastStore();

  const state = ref({ user: {}, token: '' });

  const login = async (email: string, password: string) => {
    try {
      const token = await httpClient
        .post<{ token: string }>('login', { email, password })
        .then((res) => res.data.token);

      state.value.token = token;
      localStorage.setItem('jwt', token);
    } catch (err: any) {
      switch (err.response.status) {
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
