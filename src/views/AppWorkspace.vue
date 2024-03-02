<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-zinc-100">
    <AppHeader />
    <AppSidebar />
    <div class="ml-72 pt-24 pr-8 min-h-screen">
      <div class="w-full min-h-[calc(100vh-8rem)]"></div>
    </div>
  </div>
</template>

<style scoped></style>
