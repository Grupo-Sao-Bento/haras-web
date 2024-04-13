import { computed, ref } from 'vue';

import type { Pageable } from '@/models/pageable';
import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { isNil, omitBy } from 'lodash';
import { defineStore } from 'pinia';

import type { Customer } from '../models/customer';

interface CustomersState {
  isPosting: boolean;
  isDeleting: boolean;
  customersList: {
    pageable: Pageable<Customer>;
    loading: boolean;
    error: boolean;
  };
}

const initialState: CustomersState = {
  isPosting: false,
  isDeleting: false,
  customersList: {
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

export const useCustomersStore = defineStore('customers', () => {
  const toastStore = useToastStore();

  const state = ref<CustomersState>(initialState);

  const customers = computed(() => state.value.customersList.pageable.content);
  const currentPage = computed(() => state.value.customersList.pageable.currentPage);
  const totalElements = computed(() => state.value.customersList.pageable.totalElements);
  const totalPages = computed(() => state.value.customersList.pageable.totalPages);
  const loading = computed(() => state.value.customersList.loading);

  async function postCustomer(customer: Partial<Customer>) {
    state.value.isPosting = true;

    try {
      const newCustomer = await httpClient
        .post<Customer>('clients', omitBy(customer, isNil))
        .then((res) => res.data);

      state.value.customersList.pageable.content?.unshift(newCustomer);
      state.value.customersList.pageable.totalElements! += 1;

      toastStore.show({
        severity: 'success',
        summary: 'Cliente cadastrado com sucesso',
        detail: 'O novo cliente foi salvo no sistema.',
      });
    } catch (err) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao cadastrar cliente',
        detail:
          'Ocorreu um problema ao salvar o novo cliente. Tente novamente mais tarde ou contate o suporte.',
      });
    }

    state.value.isPosting = false;
  }

  return { state, postCustomer };
});
