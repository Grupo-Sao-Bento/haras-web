import { computed, ref } from 'vue';

import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { defineStore } from 'pinia';

import type { Animal } from '../models/animal.model';

interface AnimalsState {
  animalsList: {
    animals: Animal[];
    loading: boolean;
    error: boolean;
  };
}

const initialState: AnimalsState = {
  animalsList: {
    animals: [],
    loading: false,
    error: false,
  },
};

export const useAnimalsFormStore = defineStore('animals', () => {
  const toastStore = useToastStore();

  const state = ref<AnimalsState>(initialState);

  const animals = computed(() => state.value.animalsList.animals);
  const loading = computed(() => state.value.animalsList.loading);

  async function fetchAnimals() {
    state.value.animalsList.loading = true;

    try {
      const animalsList = await httpClient.get<Animal[]>('animals').then((res) => res.data);
      state.value.animalsList.animals = animalsList;
      state.value.animalsList.error = false;
    } catch (error) {
      state.value.animalsList.error = true;

      toastStore.show({
        severity: 'error',
        summary: 'Erro ao recuperar animais',
        detail:
          'Ocorreu um problema ao recuperar animais. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.animalsList.loading = false;
  }

  return {
    state,
    animals,
    loading,
    fetchAnimals,
  };
});
