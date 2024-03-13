<script setup lang="ts">
import Menubar from 'primevue/menubar';

defineProps<{
  title: String;
  subtitle: String;
  hasTabs?: boolean;
}>();
</script>

<template>
  <Menubar
    class="px-4 py-3 z-10 !bg-surface-0 dark:!bg-surface-700"
    :class="{ 'border-t-0 rounded-t-none': hasTabs }"
  >
    <template #start>
      <h1 class="text-2xl font-bold text-surface-900 dark:!text-surface-100">
        {{ title }}
      </h1>
      <p class="text-sm text-surface-950 dark:!text-surface-300">
        {{ subtitle }}
      </p>
    </template>

    <template #end>
      <div class="flex justify-between gap-2">
        <slot name="actions"></slot>
      </div>
    </template>
  </Menubar>
</template>
