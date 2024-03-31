<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import type { PageState } from 'primevue/paginator';
import Tag from 'primevue/tag';
import { useConfirm } from 'primevue/useconfirm';

import AnimalForm from '../components/AnimalForm.vue';
import { AnimalTypes } from '../enums/animal-types.enum';
import { Coats } from '../enums/coats.enum';
import { Genders } from '../enums/genders.enum';
import type { Animal } from '../models/animal.model';
import { useAnimalsStore } from '../state/animals.store';

const animalsStore = useAnimalsStore();
const confirmService = useConfirm();

const expandedRows = ref();
const modalVisible = ref(false);
const isFormValid = ref(false);
const newAnimal = ref<Partial<Animal>>({});

const entitiesPerPage = ref(10);
const rowsPerPageOptions = [entitiesPerPage.value, entitiesPerPage.value * 2];

async function pageChanges(event: PageState) {
  await animalsStore.fetchAnimals(event.page, entitiesPerPage.value);
}

onMounted(async () => {
  await animalsStore.fetchAnimals(0, entitiesPerPage.value);
});

function openCreationModal() {
  modalVisible.value = !modalVisible.value;
}

function createAnimal() {
  animalsStore.postAnimal(newAnimal.value);
  modalVisible.value = false;
}

function onUpdateRows(rowsPerPage: number) {
  entitiesPerPage.value = rowsPerPage;
}

function getFormattedDate(date: Date | string): string {
  return new Date(date).toJSON()?.slice(0, 10).split('-').reverse().join('/');
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
    v-on:update:rows="onUpdateRows($event)"
    @page="pageChanges"
  >
    <Column expander style="max-width: 2rem" />
    <Column field="name" header="Nome" />
    <Column field="coat" header="Pelagem">
      <template #body="slotProps">{{ Coats[slotProps.data.coat as keyof typeof Coats] }}</template>
    </Column>
    <Column field="registry" header="Registro" />
    <Column field="gender" header="Sexo">
      <template #body="slotProps">
        <Tag
          :severity="
            (slotProps.data.gender as string).charAt(0).toLowerCase() === 'm' ? 'info' : 'danger'
          "
          :value="Genders[slotProps.data.gender as keyof typeof Genders]"
        />
      </template>
    </Column>
    <Column :exportable="false" header="Ações">
      <template #body="slotProps">
        <Button icon="fa-solid fa-pen" outlined class="mr-2" />
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
        <p><span class="font-bold">Nome:</span> {{ (slotProps.data as Animal).name }}</p>
        <p>
          <span class="font-bold">Pelagem:</span>
          {{ Coats[slotProps.data.coat as keyof typeof Coats] }}
        </p>
        <p>
          <span class="font-bold">Sexo:</span>
          {{ Genders[slotProps.data.gender as keyof typeof Genders] }}
        </p>
        <p>
          <span class="font-bold">Tipo:</span>
          {{ AnimalTypes[slotProps.data.type as keyof typeof AnimalTypes] }}
        </p>
        <p v-if="(slotProps.data as Animal).registry">
          <span class="font-bold">Registro interno:</span>
          {{ (slotProps.data as Animal).registry }}
        </p>
        <p v-if="(slotProps.data as Animal).birthDate">
          <span class="font-bold">Nascimento:</span>
          {{ getFormattedDate((slotProps.data as Animal).birthDate) }}
        </p>
        <p v-if="(slotProps.data as Animal).dailyFee">
          <span class="font-bold">Valor da diária:</span>
          R$ {{ (slotProps.data as Animal).dailyFee }}
        </p>
        <p v-if="(slotProps.data as Animal).isAlive">
          <span class="font-bold">Estado de vida:</span>
          {{ (slotProps.data as Animal).isAlive ? 'Vivo' : 'Morto' }}
        </p>
        <p>
          <span class="font-bold">Registro criado em:</span>
          {{ getFormattedDate((slotProps.data as Animal).createdAt) }}
        </p>
        <p>
          <span class="font-bold">Registro criado por:</span>
          {{ (slotProps.data as Animal).createdBy?.login }}
        </p>
        <p v-if="(slotProps.data as Animal).updatedAt">
          <span class="font-bold">Última atualização em:</span>
          {{ getFormattedDate((slotProps.data as Animal).updatedAt) }}
        </p>
        <p v-if="(slotProps.data as Animal).updatedBy">
          <span class="font-bold">Última atualização por:</span>
          {{ (slotProps.data as Animal).updatedBy?.login }}
        </p>
      </div>
    </template>
  </DataTable>

  <AppFullScreenModal
    headerTitle="Adicionar Animal"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="!isFormValid"
    @hide="modalVisible = false"
    @primary-clicked="createAnimal"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <AnimalForm @form-changed="newAnimal = $event" @is-invalid="isFormValid = !$event" />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
