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

import AnimalForm from '../components/AnimalForm.vue';
import TableExpansion from '../components/TableExpansion.vue';
import { AnimalBreeds } from '../enums/animal-breeds.enum';
import { Coats } from '../enums/coats.enum';
import type { Animal } from '../models/animal.model';
import { useAnimalsStore } from '../state/animals.store';

const animalsStore = useAnimalsStore();
const confirmService = useConfirm();

const expandedRows = ref();

const modalVisible = ref(false);
const modalHeader = ref('Adicionar animal');
const isEditing = ref(false);
const selectedAnimal = ref<Partial<Animal>>({});

const entitiesPerPage = ref(10);
const rowsPerPageOptions = [entitiesPerPage.value, entitiesPerPage.value * 2];

const formModel = ref<Partial<Animal>>({
  name: undefined,
  coat: undefined,
  breed: undefined,
  type: undefined,
  gender: undefined,
  registry: undefined,
  owner: undefined,
  birthDate: undefined,
  dailyFee: undefined,
  isAlive: true,
});
const rules = {
  name: { required },
  coat: { required },
  type: { required },
  gender: { required },
};
const v$ = useVuelidate();

onMounted(async () => {
  await animalsStore.fetchAnimals(0, entitiesPerPage.value);
});

async function pageChanges(event: PageState) {
  await animalsStore.fetchAnimals(event.page, entitiesPerPage.value);
}

function openCreationModal() {
  isEditing.value = false;
  modalHeader.value = 'Adicionar animal';
  modalVisible.value = true;
}

function openEditionModal(animal: Animal) {
  isEditing.value = true;
  modalHeader.value = 'Editar animal';
  selectedAnimal.value = animal;
  formModel.value = animal;
  formModel.value.birthDate = animal.birthDate ? new Date(animal.birthDate) : undefined;
  modalVisible.value = true;
}

function createAnimal() {
  animalsStore.postAnimal(formModel.value);
  closeModal();
}

function editAnimal() {
  const updatedAnimal = {
    ...selectedAnimal.value,
    ...omitBy(formModel.value, isNil),
  };
  animalsStore.editAnimal(updatedAnimal);
  closeModal();
}

function onUpdateRows(rowsPerPage: number) {
  entitiesPerPage.value = rowsPerPage;
}

function confirmDeletion(event: any, animalId: string) {
  confirmService.require({
    target: event.currentTarget,
    message: 'Tem certeza que deseja deletar esse registro?',
    icon: 'fa-solid fa-exclamation-triangle',
    acceptClass:
      '!bg-red-500 dark:!bg-red-40 !border-red-500 dark:!border-red-400 !ring-red-500 dark:!ring-red-400 hover:!bg-red-600 dark:hover:!bg-red-300 hover:!border-red-600 dark:hover:!border-red-300 focus:!ring-red-400/50 dark:!focus:ring-red-300/50',
    rejectLabel: 'Não',
    acceptLabel: 'Sim',
    accept: async () => {
      await animalsStore.deleteAnimal(animalId);
    },
  });
}

function closeModal() {
  modalVisible.value = false;
  isEditing.value = false;
  formModel.value = {
    name: undefined,
    coat: undefined,
    breed: undefined,
    type: undefined,
    gender: undefined,
    registry: undefined,
    owner: undefined,
    birthDate: undefined,
    dailyFee: undefined,
    isAlive: true,
  };
}
</script>

<template>
  <AppFeatureHeader title="Animais" subtitle="Gerencie aqui os animais da sua fazenda.">
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
    :value="animalsStore.animals"
    :loading="animalsStore.loading"
    :rows="entitiesPerPage"
    :rowsPerPageOptions="rowsPerPageOptions"
    :totalRecords="animalsStore.totalElements"
    @update:rows="onUpdateRows($event)"
    @page="pageChanges"
  >
    <Column expander style="max-width: 2rem" />
    <Column field="name" header="Nome" />
    <Column field="coat" header="Pelagem">
      <template #body="slotProps">{{ Coats[slotProps.data.coat as keyof typeof Coats] }}</template>
    </Column>
    <Column field="breed" header="Raça">
      <template #body="slotProps">{{
        AnimalBreeds[slotProps.data.breed as keyof typeof AnimalBreeds]
      }}</template>
    </Column>
    <Column field="registry" header="Registro" />
    <Column field="gender" header="Sexo">
      <template #body="slotProps">
        <Tag
          :severity="
            (slotProps.data.gender as string).charAt(0).toLowerCase() === 'm' ? 'info' : 'danger'
          "
          :value="(slotProps.data as Animal).gender.charAt(0)"
        />
      </template>
    </Column>
    <Column field="isAlive" header="Estado de vida">
      <template #body="slotProps">
        <Tag
          :severity="(slotProps.data as Animal).isAlive ? 'primary' : 'warning'"
          :value="(slotProps.data as Animal).isAlive ? 'Vivo' : 'Morto'"
        />
      </template>
    </Column>
    <Column :exportable="false" header="Ações">
      <template #body="slotProps">
        <Button
          icon="fa-solid fa-pen"
          outlined
          class="mr-2"
          @click="openEditionModal(Object.create(slotProps.data as Animal))"
        />
        <Button
          icon="fa-solid fa-trash"
          outlined
          severity="danger"
          @click="confirmDeletion($event, (slotProps.data as Animal).id)"
        />
      </template>
    </Column>

    <template #expansion="slotProps">
      <div class="p-2">
        <TableExpansion :animal="slotProps.data" />
      </div>
    </template>
  </DataTable>

  <AppFullScreenModal
    :headerTitle="modalHeader"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="v$.$invalid"
    @hide="closeModal"
    @primary-clicked="isEditing ? editAnimal() : createAnimal()"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <AnimalForm v-model:form-model="formModel" :validation-rules="rules" />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
