<script setup lang="ts">
import { defineProps } from 'vue';

import Menubar from 'primevue/menubar';

const props = defineProps<{
  title: String;
  subtitle: String;
}>();
</script>

<template>
  <Menubar class="px-4 py-3 !bg-surface-0 dark:!bg-surface-700">
    <template #start>
      <h1 class="text-2xl font-bold text-surface-900 dark:!text-surface-100">{{ props.title }}</h1>
      <p class="text-sm text-surface-950 dark:!text-surface-300">
        {{ props.subtitle }}
      </p>
    </template>
    <template #end>
      <div class="flex justify-between gap-2">
        <slot name="actions"></slot>
      </div>
    </template>
  </Menubar>
</template>
