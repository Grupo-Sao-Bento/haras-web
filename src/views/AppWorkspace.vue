<script setup lang="ts">
import { ref } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import { useToastStore } from '@/stores/toast.store';
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { RouterView } from 'vue-router';

const isMenuVisible = ref(true);

const toastStore = useToastStore();
const toast = useToast();

toastStore.$subscribe((_, state) => {
  toast.add({ severity: state.severity, summary: state.summary, detail: state.detail, life: 4000 });
});
</script>

<template>
  <DynamicDialog />
  <Toast />

  <div class="min-h-screen bg-surface-100 dark:bg-surface-900">
    <AppHeader @toggleMenu="isMenuVisible = !isMenuVisible" />
    <AppSidebar v-if="isMenuVisible" />
    <div
      class="pt-[5.5rem] pr-4 min-h-screen"
      :class="{ 'ml-72': isMenuVisible, 'pl-4': !isMenuVisible }"
    >
      <div class="w-full min-h-[calc(100vh-8rem)] text-surface-950 dark:text-surface-50">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
