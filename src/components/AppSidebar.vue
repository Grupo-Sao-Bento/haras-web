<script setup lang="ts">
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

const menuItems: MenuItem[] = [
  {
    label: 'Início',
    icon: 'pi pi-home'
  }
]
</script>

<template>
  <div class="fixed h-[calc(100vh-4rem)] p-8 w-72 top-16 text-sm">
    <Menu class="min-h-full shadow" :model="menuItems" />
  </div>
</template>
