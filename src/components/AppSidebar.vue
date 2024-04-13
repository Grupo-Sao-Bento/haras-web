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
  {
    label: 'Cocheiras',
    icon: 'fa-solid fa-warehouse',
  },
  {
    label: 'Estoque',
    icon: 'fa-solid fa-boxes-stacked',
  },
  {
    label: 'Gestão de Reprodução',
    icon: 'fa-solid fa-mars-and-venus',
  },
  {
    label: 'Procedimentos',
    icon: 'fa-solid fa-stethoscope',
  },
  {
    label: 'Controle Financeiro',
    icon: 'fa-solid fa-money-check',
  },
];
</script>

<template>
  <div class="fixed h-[calc(100vh-4rem)] p-4 pt-6 w-72 top-16 text-sm">
    <Menu class="min-h-full shadow-lg" :model="menuItems" />
  </div>
</template>
