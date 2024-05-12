<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { isNil, omitBy } from 'lodash';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import type { PageState } from 'primevue/paginator';
import Tag from 'primevue/tag';
import { useConfirm } from 'primevue/useconfirm';

import StaysForm from '../components/StaysForm.vue';
import type { Stay } from '../models/stay.model';
import { useStaysStore } from '../state/stays.store';

const staysStore = useStaysStore();
const confirmService = useConfirm();

const expandedRows = ref();

const modalVisible = ref(false);
const modalHeader = ref('Adicionar estadia');
const isEditing = ref(false);
const selectedStay = ref<Partial<Stay>>({});

const entitiesPerPage = ref(10);
const rowsPerPageOptions = [entitiesPerPage.value, entitiesPerPage.value * 2];

const formModel = ref<Partial<Stay>>({
  animal: undefined,
  start: undefined,
  end: undefined,
});
const rules = {
  animal: { required },
  start: { required },
  end: { required },
};
const v$ = useVuelidate();

onMounted(async () => {
  await staysStore.fetchStays(0, entitiesPerPage.value);
});

async function pageChanges(event: PageState) {
  await staysStore.fetchStays(event.page, entitiesPerPage.value);
}

function getFormattedDate(date: Date | string): string {
  return new Date(date).toJSON()?.slice(0, 10).split('-').reverse().join('/');
}

function openCreationModal() {
  isEditing.value = false;
  modalHeader.value = 'Adicionar estadia';
  modalVisible.value = true;
}

function openEditionModal(stay: Stay) {
  isEditing.value = true;
  modalHeader.value = 'Editar estadia';
  selectedStay.value = stay;
  formModel.value = stay;
  formModel.value.start = stay.start ? new Date(stay.start) : undefined;
  formModel.value.end = stay.end ? new Date(stay.end) : undefined;
  modalVisible.value = true;
}

function createStay() {
  staysStore.postStay(formModel.value);
  closeModal();
}

function editStay() {
  const updatedStay = {
    ...selectedStay.value,
    ...omitBy(formModel.value, isNil),
  };
  staysStore.editStay(updatedStay);
  closeModal();
}

function onUpdateRows(rowsPerPage: number) {
  entitiesPerPage.value = rowsPerPage;
}

function confirmDeletion(event: any, stayId: string) {
  confirmService.require({
    target: event.currentTarget,
    message: 'Tem certeza que deseja deletar esse registro?',
    icon: 'fa-solid fa-exclamation-triangle',
    acceptClass:
      '!bg-red-500 dark:!bg-red-40 !border-red-500 dark:!border-red-400 !ring-red-500 dark:!ring-red-400 hover:!bg-red-600 dark:hover:!bg-red-300 hover:!border-red-600 dark:hover:!border-red-300 focus:!ring-red-400/50 dark:!focus:ring-red-300/50',
    rejectLabel: 'Não',
    acceptLabel: 'Sim',
    accept: async () => {
      await staysStore.deleteStay(stayId);
    },
  });
}

function closeModal() {
  modalVisible.value = false;
  isEditing.value = false;
  formModel.value = {
    animal: undefined,
    start: undefined,
    end: undefined,
  };
}
</script>

<template>
  <AppFeatureHeader title="Cocheiras" subtitle="Gerencie aqui as estadias da sua fazenda.">
    <template #actions>
      <span class="relative">
        <i
          class="fa fa-magnifying-glass absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
        />
        <InputText type="text" placeholder="Pesquisar..." class="pl-10 w-44" />
      </span>
      <Button @click="openCreationModal" label="Adicionar" icon="fa-solid fa-plus" />
    </template>
  </AppFeatureHeader>

  <DataTable
    lazy
    paginator
    stripedRows
    class="shadow-md mt-4"
    v-model:expanded-rows="expandedRows"
    :value="staysStore.stays"
    :loading="staysStore.loading"
    :rows="entitiesPerPage"
    :rowsPerPageOptions="rowsPerPageOptions"
    :totalRecords="staysStore.totalElements"
    @update:rows="onUpdateRows($event)"
    @page="pageChanges"
  >
    <Column field="" />
    <Column field="animal.name" header="Animal" />
    <Column field="start" header="Entrada">
      <template #body="slotProps">
        <Tag :value="getFormattedDate((slotProps.data as Stay).start)" />
      </template>
    </Column>
    <Column field="end" header="Saída">
      <template #body="slotProps">
        <Tag severity="danger" :value="getFormattedDate((slotProps.data as Stay).end)" />
      </template>
    </Column>
    <Column :exportable="false" header="Ações">
      <template #body="slotProps">
        <Button
          icon="fa-solid fa-pen"
          outlined
          class="mr-2"
          @click="openEditionModal(Object.create(slotProps.data as Stay))"
        />
        <Button
          icon="fa-solid fa-trash"
          outlined
          severity="danger"
          @click="confirmDeletion($event, (slotProps.data as Stay).id)"
        />
      </template>
    </Column>
  </DataTable>

  <AppFullScreenModal
    :headerTitle="modalHeader"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="v$.$invalid"
    @hide="closeModal"
    @primary-clicked="isEditing ? editStay() : createStay()"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <StaysForm v-model:form-model="formModel" :validation-rules="rules" />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
