import { computed, ref } from 'vue';

import type { Pageable } from '@/models/pageable';
import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { defineStore } from 'pinia';

import type { Animal } from '../../stable/models/animal.model';

interface AnimalsState {
  animalsList: {
    pageable: Pageable<Animal>;
    loading: boolean;
    error: boolean;
  };
}

const initialState: AnimalsState = {
  animalsList: {
    pageable: {
      content: [],
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
    },
    loading: false,
    error: false,
  },
};

export const useStaysAnimalsFormStore = defineStore('animals', () => {
  const toastStore = useToastStore();

  const state = ref<AnimalsState>(initialState);

  const animals = computed(() => state.value.animalsList.pageable.content);
  const currentPage = computed(() => state.value.animalsList.pageable.currentPage);
  const totalElements = computed(() => state.value.animalsList.pageable.totalElements);
  const totalPages = computed(() => state.value.animalsList.pageable.totalPages);
  const loading = computed(() => state.value.animalsList.loading);

  async function fetchAnimals(page: number = 0, size: number = 1000) {
    state.value.animalsList.loading = true;

    try {
      const params = new URLSearchParams();
      params.append('page', `${page}`);
      params.append('size', `${size}`);

      const animalsPageable = await httpClient
        .get<Pageable<Animal>>('animals', { params })
        .then((res) => res.data);

      state.value.animalsList.pageable = animalsPageable;
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
    currentPage,
    totalElements,
    totalPages,
    loading,
    fetchAnimals,
  };
});
