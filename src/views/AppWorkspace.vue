<script setup lang="ts">
import { ref } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { useUserStore } from '@/stores/user.store';
import ConfirmPopup from 'primevue/confirmpopup';
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { RouterView } from 'vue-router';

const userStore = useUserStore();
const authStore = useAuthStore();

const currentYear = new Date().getFullYear();

const isMenuVisible = ref(true);

const toastStore = useToastStore();
const toast = useToast();

toastStore.$subscribe((_, state) => {
  toast.add({ severity: state.severity, summary: state.summary, detail: state.detail, life: 4000 });
});
</script>

<template>
  <DynamicDialog />
  <ConfirmPopup />
  <Toast />

  <div class="min-h-screen bg-surface-100 dark:bg-surface-900">
    <AppHeader
      :displayName="userStore.state.user.firstName"
      @toggleMenu="isMenuVisible = !isMenuVisible"
      @logout="authStore.logout"
    />
    <AppSidebar v-if="isMenuVisible" />
    <div
      class="pt-[5.5rem] pr-4 min-h-screen"
      :class="{ 'ml-72': isMenuVisible, 'pl-4': !isMenuVisible }"
    >
      <div class="w-full min-h-[calc(100vh-8rem)] text-surface-950 dark:text-surface-50">
        <RouterView />
        <p class="text-sm text-surface-500 text-center mt-8 pb-4">
          &copy; Grupo SB - {{ currentYear }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
