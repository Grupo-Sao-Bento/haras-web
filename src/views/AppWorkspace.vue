<script setup lang="ts">
import { ref } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import { RouterView } from 'vue-router';

const isMenuVisible = ref(true);
</script>

<template>
  <div class="min-h-screen bg-zinc-100 dark:bg-surface-900">
    <AppHeader @toggleMenu="isMenuVisible = !isMenuVisible" />
    <AppSidebar v-if="isMenuVisible" />
    <div
      class="pt-24 pr-8 min-h-screen"
      :class="{ 'ml-72': isMenuVisible, 'pl-8': !isMenuVisible }"
    >
      <div class="w-full min-h-[calc(100vh-8rem)] text-surface-950 dark:text-surface-50">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
