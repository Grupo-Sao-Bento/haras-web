import { ref } from 'vue';

import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { isNil, omitBy } from 'lodash';
import { defineStore } from 'pinia';

import type { Animal } from '../models/animal.model';

interface AnimalsState {
  isPosting: boolean;
}

const initialState: AnimalsState = {
  isPosting: false,
};

export const useAnimalsStore = defineStore('animals', () => {
  const toastStore = useToastStore();

  const state = ref<{ isPosting: boolean }>(initialState);

  async function postAnimal(animal: Partial<Animal>) {
    state.value.isPosting = true;

    try {
      await httpClient.post<Animal>('animals', omitBy(animal, isNil)).then((res) => res.data);

      toastStore.show({
        severity: 'success',
        summary: 'Animal cadastrado com sucesso',
        detail: 'O animal foi cadastrado com êxito.',
      });
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao cadastrar novo animal',
        detail:
          'Ocorreu um problema ao cadastrar o novo animal. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isPosting = false;
  }

  return { state, postAnimal };
});
