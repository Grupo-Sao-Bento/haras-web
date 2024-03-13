<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import TabMenu from 'primevue/tabmenu';

const activeIndex = defineModel<number>();

defineProps<{
  tabs: MenuItem[];
}>();
</script>

<template>
  <TabMenu
    class="rounded-lg rounded-b-none z-20 border border-surface-200 dark:border-surface-700 border-b-0"
    v-model:activeIndex="activeIndex"
    :model="tabs"
    :pt="{
      action: {
        style: {
          padding: '0.75rem',
          'font-size': '0.875rem',
        },
      },
    }"
  />
</template>
