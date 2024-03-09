<script setup lang="ts">
import { ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const visible = ref(false);

function openCreationModal() {
  visible.value = !visible.value;
}
</script>

<template>
  <AppFeatureHeader title="Animais" subtitle="Gerencie aqui os animais da sua fazenda.">
    <template #actions>
      <span class="relative">
        <i
          class="fa fa-magnifying-glass absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
        />
        <InputText type="text" placeholder="Pesquisar..." class="pl-10 w-44" size="small" />
      </span>
      <Button @click="openCreationModal" label="Adicionar" icon="fa-solid fa-plus" size="small" />
    </template>
  </AppFeatureHeader>

  <AppFullScreenModal
    @hide="visible = false"
    :visible="visible"
    :isPrimaryButtonDisabled="false"
    headerTitle="Adicionar Animal"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <h1>Card content example</h1>
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
