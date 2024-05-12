import { computed, ref } from 'vue';

import type { Pageable } from '@/models/pageable';
import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { isNil, omitBy } from 'lodash';
import { defineStore } from 'pinia';

import type { Stay } from '../models/stay.model';

interface StaysState {
  isPosting: boolean;
  isDeleting: boolean;
  staysList: {
    pageable: Pageable<Stay>;
    loading: boolean;
    error: boolean;
  };
}

const initialState: StaysState = {
  isPosting: false,
  isDeleting: false,
  staysList: {
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

export const useStaysStore = defineStore('stays', () => {
  const toastStore = useToastStore();

  const state = ref<StaysState>(initialState);

  const stays = computed(() => state.value.staysList.pageable.content);
  const currentPage = computed(() => state.value.staysList.pageable.currentPage);
  const totalElements = computed(() => state.value.staysList.pageable.totalElements);
  const totalPages = computed(() => state.value.staysList.pageable.totalPages);
  const loading = computed(() => state.value.staysList.loading);

  async function postStay(stay: Partial<Stay>) {
    state.value.isPosting = true;

    try {
      const newStay = await httpClient
        .post<Stay>('stays', omitBy(stay, isNil))
        .then((res) => res.data);

      state.value.staysList.pageable.content?.unshift(newStay);
      state.value.staysList.pageable.totalElements! += 1;

      toastStore.show({
        severity: 'success',
        summary: 'Estadia cadastrada com sucesso',
        detail: 'A estadia foi cadastrada com êxito.',
      });
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao cadastrar nova estadia',
        detail:
          'Ocorreu um problema ao cadastrar a nova estadia. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isPosting = false;
  }

  async function fetchStays(page: number = 0, size: number = 10) {
    state.value.staysList.loading = true;

    try {
      const params = new URLSearchParams();
      params.append('page', `${page}`);
      params.append('size', `${size}`);

      const staysPageable = await httpClient
        .get<Pageable<Stay>>('stays', { params })
        .then((res) => res.data);

      state.value.staysList.pageable = staysPageable;
      state.value.staysList.error = false;
    } catch (error) {
      state.value.staysList.error = true;

      toastStore.show({
        severity: 'error',
        summary: 'Erro ao recuperar estadias',
        detail:
          'Ocorreu um problema ao recuperar as estadias. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.staysList.loading = false;
  }

  async function deleteStay(stayId: string) {
    state.value.isDeleting = true;

    try {
      await httpClient.delete(`stays/${stayId}`);

      toastStore.show({
        severity: 'success',
        summary: 'Estadia deletada com sucesso',
        detail: 'A estadia foi deletada com êxito.',
      });

      state.value.staysList.pageable.content = state.value.staysList.pageable.content?.filter(
        (stay) => stay.id !== stayId,
      );
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao deletar estadia',
        detail:
          'Ocorreu um problema ao deletar a estadia. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isDeleting = false;
  }

  async function editStay(stay: Partial<Stay>) {
    state.value.isPosting = true;

    try {
      const updatedStay = await httpClient
        .put<Stay>(`stays/${stay.id}`, omitBy(stay, isNil))
        .then((res) => res.data);

      state.value.staysList.pageable.content = state.value.staysList.pageable.content?.map((el) =>
        el.id == updatedStay.id ? updatedStay : el,
      );

      toastStore.show({
        severity: 'success',
        summary: 'Estadia editada com sucesso',
        detail: 'A estadia foi editada com êxito.',
      });
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao editar estadia',
        detail:
          'Ocorreu um problema ao editar a estadia. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isPosting = false;
  }

  return {
    state,
    stays,
    currentPage,
    totalElements,
    totalPages,
    loading,
    postStay,
    fetchStays,
    deleteStay,
    editStay,
  };
});
