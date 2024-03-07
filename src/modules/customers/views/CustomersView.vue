<script setup lang="ts">
import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
</script>

<template>
  <AppFeatureHeader title="Clientes" subtitle="Gerencie aqui os clientes do seu Haras.">
    <template #actions>
      <span class="relative">
        <i
          class="fa fa-magnifying-glass absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
        />
        <InputText type="text" placeholder="Pesquisar..." class="pl-10 w-44" size="small" />
      </span>
      <Button label="Adicionar" icon="fa-solid fa-plus" size="small" />
    </template>
  </AppFeatureHeader>
</template>
