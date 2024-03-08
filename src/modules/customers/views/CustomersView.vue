<script setup lang="ts">
import { ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import type { MenuItem } from 'primevue/menuitem';
import { RouterView } from 'vue-router';

const menuItems: MenuItem[] = [
  {
    label: 'Clientes',
    icon: 'fa-solid fa-user',
    key: '/w/customers/standalone',
  },
  {
    label: 'Condomínios',
    icon: 'fa-solid fa-user-group',
    key: '/w/customers/groups',
  },
];
const headerTitle = ref('Clientes');
const headerSubtitle = ref('Gerencie aqui os clientes e condomínios do seu Haras.');
</script>

<template>
  <AppFeatureHeader :title="headerTitle" :subtitle="headerSubtitle" :tabs="menuItems">
    <template #actions>
      <span class="relative">
        <i
          class="fa fa-magnifying-glass absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
        />
        <InputText type="text" placeholder="Pesquisar..." class="pl-10 w-44" size="small" />
      </span>
      <Button label="Adicionar" icon="fa-solid fa-plus" size="small" />
    </template>
  </AppFeatureHeader>

  <RouterView class="mt-6" />
</template>
