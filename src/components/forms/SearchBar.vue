<script setup lang="ts">
import InputText from 'primevue/inputtext';

const model = defineModel<string>();

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: 'Pesquisar...',
  },
);
</script>

<template>
  <span class="relative">
    <i
      class="fa fa-magnifying-glass absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
    />
    <InputText
      v-model="model"
      type="text"
      class="pl-10 w-44"
      size="small"
      :placeholder="placeholder"
    />
  </span>
</template>
