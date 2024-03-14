<script setup lang="ts">
import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import SearchBar from '@/components/forms/SearchBar.vue';
import Button from 'primevue/button';
</script>

<template>
  <AppFeatureHeader
    title="Clientes"
    subtitle="Gerencie aqui os clientes do seu Haras."
    :has-tabs="true"
  >
    <template #actions>
      <SearchBar />
      <Button label="Adicionar" icon="fa-solid fa-plus" />
    </template>
  </AppFeatureHeader>
</template>
