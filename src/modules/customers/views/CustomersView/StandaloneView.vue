<script setup lang="ts">
import { ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import SearchBar from '@/components/forms/SearchBar.vue';
import Button from 'primevue/button';

import CustomerForm from '../../components/CustomerForm.vue';

const modalHeader = ref('Adicionar cliente');
const modalVisible = ref(false);

function closeModal() {
  modalVisible.value = false;
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
      <Button label="Adicionar" icon="fa-solid fa-plus" @click="modalVisible = true" />
    </template>
  </AppFeatureHeader>

  <AppFullScreenModal
    :headerTitle="modalHeader"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="false"
    @hide="closeModal"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <CustomerForm />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
