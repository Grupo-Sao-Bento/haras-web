<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import SearchBar from '@/components/forms/SearchBar.vue';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import type { PageState } from 'primevue/paginator';
import { useConfirm } from 'primevue/useconfirm';

import CustomerForm from '../../components/CustomerForm.vue';
import type { Customer } from '../../models/customer';
import { useCustomersStore } from '../../state/customers.store';
import { cpf, phoneNumber } from '../../utils/validators';

const customersStore = useCustomersStore();
const confirmService = useConfirm();

const customers = computed<Customer[] | undefined>(() =>
  customersStore.customers?.map((customer) => ({
    ...customer,
    fullName: `${customer.firstName} ${customer.lastName}`,
  })),
);

const expandedRows = ref();
const entitiesPerPage = ref(10);
const rowsPerPageOptions = ref([entitiesPerPage.value, entitiesPerPage.value * 2]);

const modalHeader = ref('Adicionar Cliente');
const modalVisible = ref(false);
const isEditing = ref(false);

const formModel = ref<Partial<Customer>>({
  firstName: '',
  lastName: '',
  cpf: '',
  email: '',
  phoneNumber: '',
});
const rules = {
  firstName: { required },
  lastName: { required },
  cpf: { required, cpf },
  email: { required, email },
  phoneNumber: { required, phoneNumber },
};
const v$ = useVuelidate();

onMounted(async () => {
  customersStore.fetchCustomers();
});

async function pageChanges(event: PageState) {
  await customersStore.fetchCustomers(event.page, entitiesPerPage.value);
}

function confirmDeletion(event: any, customerId: string) {
  confirmService.require({
    target: event.currentTarget,
    message: 'Tem certeza que deseja deletar esse registro?',
    icon: 'fa-solid fa-exclamation-triangle',
    acceptClass:
      '!bg-red-500 dark:!bg-red-40 !border-red-500 dark:!border-red-400 !ring-red-500 dark:!ring-red-400 hover:!bg-red-600 dark:hover:!bg-red-300 hover:!border-red-600 dark:hover:!border-red-300 focus:!ring-red-400/50 dark:!focus:ring-red-300/50',
    rejectLabel: 'Não',
    acceptLabel: 'Sim',
    accept: async () => {
      await customersStore.deleteCustomer(customerId);
    },
  });
}

function onUpdateRows(rowsPerPage: number) {
  entitiesPerPage.value = rowsPerPage;
}

function openCreationModal() {
  isEditing.value = false;
  modalHeader.value = 'Adicionar Cliente';
  modalVisible.value = true;
}

function openEditionModal(customer: Customer) {
  isEditing.value = true;
  modalHeader.value = 'Editar Cliente';
  formModel.value = customer;
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
  formModel.value = {
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    phoneNumber: '',
  };
}

function saveCustomer() {
  if (isEditing.value) {
    customersStore.editCustomer(formModel.value);
  } else {
    customersStore.postCustomer(formModel.value);
  }

  closeModal();
}
</script>

<template>
  <AppFeatureHeader
    title="Clientes"
    subtitle="Gerencie aqui os clientes do seu Haras."
    :has-tabs="true"
  >
    <template #actions>
      <SearchBar />
      <Button label="Adicionar" icon="fa-solid fa-plus" @click="openCreationModal" />
    </template>
  </AppFeatureHeader>

  <DataTable
    lazy
    paginator
    stripedRows
    class="shadow-md mt-4"
    v-model:expanded-rows="expandedRows"
    :value="customers"
    :loading="customersStore.loading"
    :rows="entitiesPerPage"
    :rowsPerPageOptions="rowsPerPageOptions"
    :totalRecords="customersStore.totalElements"
    @update:rows="onUpdateRows($event)"
    @page="pageChanges"
  >
    <Column expander style="max-width: 2rem" />
    <Column field="fullName" header="Nome" />
    <Column field="phoneNumber" header="Telefone" />
    <Column field="email" header="Email" />
    <Column :exportable="false" header="Ações">
      <template #body="slotProps">
        <Button
          icon="fa-solid fa-pen"
          outlined
          class="mr-2"
          @click="openEditionModal(Object.create(slotProps.data as Customer))"
        />
        <Button
          icon="fa-solid fa-trash"
          outlined
          severity="danger"
          @click="confirmDeletion($event, (slotProps.data as Customer).id)"
        />
      </template>
    </Column>

    <template #expansion="slotProps">
      <div class="p-2">
        <p><span class="font-bold">Nome:</span> {{ slotProps.data.fullName }}</p>
        <p><span class="font-bold">Telefone:</span> {{ slotProps.data.phoneNumber }}</p>
        <p><span class="font-bold">Email:</span> {{ slotProps.data.email }}</p>
        <p><span class="font-bold">CPF:</span> {{ slotProps.data.cpf }}</p>
        <p><span class="font-bold">Criado por:</span> {{ slotProps.data.createdBy.login }}</p>
      </div>
    </template>
  </DataTable>

  <AppFullScreenModal
    :headerTitle="modalHeader"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="v$.$invalid"
    @hide="closeModal"
    @primary-clicked="saveCustomer"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <CustomerForm v-model:form-model="formModel" :validation-rules="rules" />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
