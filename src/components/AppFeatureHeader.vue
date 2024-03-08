<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Menubar from 'primevue/menubar';
import type { MenuItem } from 'primevue/menuitem';
import TabMenu from 'primevue/tabmenu';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  title: String;
  subtitle: String;
  tabs?: MenuItem[];
}>();
const activeIndex = ref(0);
const selectedMenu = ref(props.tabs ? props.tabs[0] : null);

onMounted(() => {
  if (props.tabs && router.currentRoute.value.fullPath !== props.tabs[0].key) {
    activeIndex.value = props.tabs.indexOf(
      props.tabs.filter((tab) => tab.key === router.currentRoute.value.fullPath)[0],
    );
    selectedMenu.value = props.tabs[activeIndex.value];
  }
});

function selectMenu(item: MenuItem): void {
  if (router.currentRoute.value.fullPath !== item.key) {
    selectedMenu.value = item;
    router.push(`${item.key}`);
  }
}
</script>

<template>
  <TabMenu
    v-if="!!props.tabs"
    :model="tabs"
    :activeIndex="activeIndex"
    class="rounded-lg rounded-b-none z-20 -mt-0 border border-surface-200 dark:border-surface-700 border-b-0"
  >
    <template #item="{ item, props }">
      <a
        v-bind="props.action"
        @click="selectMenu(item)"
        class="flex items-center text-sm gap-2 !py-3 !px-6"
      >
        <i :class="item.icon"></i>
        <span class="font-bold">{{ item.label }}</span>
      </a>
    </template>
  </TabMenu>

  <Menubar
    class="px-4 py-3 z-10 !bg-surface-0 dark:!bg-surface-700"
    :class="{ 'border-t-0 rounded-t-none': props.tabs }"
  >
    <template #start>
      <h1 class="text-2xl font-bold text-surface-900 dark:!text-surface-100">
        {{ selectedMenu?.label || props.title }}
      </h1>
      <p class="text-sm text-surface-950 dark:!text-surface-300">
        {{ props.subtitle }}
      </p>
    </template>

    <template #end>
      <div class="flex justify-between gap-2">
        <slot name="actions"></slot>
      </div>
    </template>
  </Menubar>
</template>
