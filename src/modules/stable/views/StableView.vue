<script setup lang="ts">
import { ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import AnimalFormVue from '../components/AnimalForm.vue';

const modalVisible = ref(false);
const isFormValid = ref(false);

function openCreationModal() {
  modalVisible.value = !modalVisible.value;
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

  <AppFullScreenModal
    @hide="modalVisible = false"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="!isFormValid"
    headerTitle="Adicionar Animal"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <AnimalFormVue @is-invalid="isFormValid = !$event" />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
