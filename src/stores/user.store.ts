import { ref } from 'vue';

import type { User } from '@/models/auth/user.model';
import httpClient from '@/services/httpClient';
import { defineStore } from 'pinia';

import { useToastStore } from './toast.store';

export const useUserStore = defineStore('user', () => {
  const toastStore = useToastStore();

  const state = ref<{ user: Partial<User> }>({ user: {} });

  async function getMyInfo() {
    try {
      const fetchedUser = await httpClient.get<User>('users/my-info').then((res) => res.data);

      state.value.user = fetchedUser;
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao recuperar suas informações',
        detail:
          'Houve um erro inesperado ao recuperar as suas informações. Tente entrar novamente ou contate o suporte caso o erro persista.',
      });
    }
  }

  return { state, getMyInfo };
});
