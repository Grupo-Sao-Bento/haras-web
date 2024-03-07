<script setup lang="ts">
import router from '@/router';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';

const menuItems: MenuItem[] = [
  {
    label: 'Início',
    icon: 'fa-solid fa-house',
    command: () => {
      router.push(`${import.meta.env.BASE_URL}w/home`);
    },
  },
  {
    label: 'Animais',
    icon: 'fa-solid fa-horse-head',
    command: () => {
      router.push(`${import.meta.env.BASE_URL}w/stable`);
    },
  },
  {
    label: 'Clientes e Condomínios',
    icon: 'fa-solid fa-user-group',
    command: () => {
      router.push(`${import.meta.env.BASE_URL}w/customers`);
    },
  },
];
</script>

<template>
  <div class="fixed h-[calc(100vh-4rem)] p-8 w-72 top-16 text-sm">
    <Menu class="min-h-full shadow" :model="menuItems" />
  </div>
</template>
