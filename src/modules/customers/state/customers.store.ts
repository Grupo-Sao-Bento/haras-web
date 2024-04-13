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

  const customers = computed<Customer[] | undefined>(
    () => state.value.customersList.pageable.content,
  );
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

  async function fetchCustomers(page = 0, size = 10) {
    state.value.customersList.loading = true;

    try {
      const params = new URLSearchParams();
      params.append('page', `${page}`);
      params.append('size', `${size}`);

      const customersPageable = await httpClient
        .get<Pageable<Customer>>('clients', { params })
        .then((res) => res.data);

      state.value.customersList.pageable = customersPageable;
      state.value.customersList.error = false;
    } catch (error) {
      state.value.customersList.error = true;

      toastStore.show({
        severity: 'error',
        summary: 'Erro ao carregar clientes',
        detail:
          'Ocorreu um erro ao carregar os clientes. Tente novamente mais tarde ou contate o suporte.',
      });
    }

    state.value.customersList.loading = false;
  }

  async function deleteCustomer(customerId: string) {
    state.value.isDeleting = true;

    try {
      await httpClient.delete(`clients/${customerId}`);

      toastStore.show({
        severity: 'success',
        summary: 'Cliente deletado com sucesso',
        detail: 'O cliente foi deletado com êxito.',
      });

      state.value.customersList.pageable.content =
        state.value.customersList.pageable.content?.filter((animal) => animal.id !== customerId);
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao deletar cliente',
        detail:
          'Ocorreu um problema ao deletar o cliente. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isDeleting = false;
  }

  async function editCustomer(customer: Partial<Customer>) {
    state.value.isPosting = true;

    try {
      const updatedCustomer = await httpClient
        .put<Customer>(`clients/${customer.id}`, omitBy(customer, isNil))
        .then((res) => res.data);

      state.value.customersList.pageable.content = state.value.customersList.pageable.content?.map(
        (el) => (el.id == updatedCustomer.id ? updatedCustomer : el),
      );

      toastStore.show({
        severity: 'success',
        summary: 'Cliente editado com sucesso',
        detail: 'O cliente foi editado com êxito.',
      });
    } catch (error) {
      toastStore.show({
        severity: 'error',
        summary: 'Erro ao editar cliente',
        detail:
          'Ocorreu um problema ao editar o cliente. Tente novamente mais tarde ou contate o suporte caso o problema persista.',
      });
    }

    state.value.isPosting = false;
  }

  return {
    state,
    customers,
    currentPage,
    totalElements,
    totalPages,
    loading,
    postCustomer,
    fetchCustomers,
    deleteCustomer,
    editCustomer,
  };
});
