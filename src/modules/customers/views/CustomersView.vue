<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppTabs from '@/components/AppTabs.vue';
import router from '@/router';
import type { MenuItem } from 'primevue/menuitem';
import { RouterView } from 'vue-router';

const menuItems: MenuItem[] = [
  {
    label: 'Clientes',
    icon: 'fa-solid fa-user',
    key: 'standalone',
    command: () => {
      router.push('/w/customers/standalone');
    },
  },
  {
    label: 'Condomínios',
    icon: 'fa-solid fa-user-group',
    key: 'groups',
    command: () => {
      router.push('/w/customers/groups');
    },
  },
];
const activeIndex = ref(0);

onMounted(() => {
  if (router.currentRoute.value.fullPath.includes(menuItems[1].key!)) {
    activeIndex.value = 1;
  }
});
</script>

<template>
  <AppTabs :tabs="menuItems" v-model:activeIndex="activeIndex" />
  <RouterView />
</template>
