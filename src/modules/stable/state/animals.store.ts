import { computed, ref } from 'vue';

import type { Pageable } from '@/models/pageable';
import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { isNil, omitBy } from 'lodash';
import { defineStore } from 'pinia';

import type { Animal } from '../models/animal.model';

interface AnimalsState {
  isPosting: boolean;
  isDeleting: boolean;
  animalsList: {
    pageable: Pageable<Animal>;
    loading: boolean;
    error: boolean;
  };
}

const initialState: AnimalsState = {
  isPosting: false,
  isDeleting: false,
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

export const useAnimalsStore = defineStore('animals', () => {
  const toastStore = useToastStore();

  const state = ref<AnimalsState>(initialState);

  const animals = computed(() => state.value.animalsList.pageable.content);
  const currentPage = computed(() => state.value.animalsList.pageable.currentPage);
  const totalElements = computed(() => state.value.animalsList.pageable.totalElements);
  const totalPages = computed(() => state.value.animalsList.pageable.totalPages);
  const loading = computed(() => state.value.animalsList.loading);

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

  async function fetchAnimals(page: number = 0, size: number = 10) {
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

  async function deleteAnimal(animalId: string) {
    state.value.isDeleting = true;

    try {
      await httpClient.delete(`animals/${animalId}`);

      toastStore.show({
        severity: 'success',
        summary: 'Animal deletado com sucesso',
        detail: 'O animal foi deletado com êxito.',
      });

      state.value.animalsList.pageable.content = state.value.animalsList.pageable.content?.filter(
        (animal) => animal.id !== animalId,
      );
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao deletar animal',
        detail:
          'Ocorreu um problema ao deletar o animal. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isDeleting = false;
  }

  async function editAnimal(animal: Partial<Animal>) {
    state.value.isPosting = true;

    try {
      await httpClient
        .put<Animal>(`animals/${animal.id}`, omitBy(animal, isNil))
        .then((res) => res.data);

      toastStore.show({
        severity: 'success',
        summary: 'Animal editado com sucesso',
        detail: 'O animal foi editado com êxito.',
      });
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao editar animal',
        detail:
          'Ocorreu um problema ao editar o animal. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isPosting = false;
  }

  return {
    state,
    animals,
    currentPage,
    totalElements,
    totalPages,
    loading,
    postAnimal,
    fetchAnimals,
    deleteAnimal,
    editAnimal,
  };
});
