<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const props = defineProps<{
  visible: boolean;
  headerTitle: string;
  isPrimaryButtonDisabled: boolean;
}>();
const isVisible = ref(false);

defineEmits(['hide', 'primaryClicked']);

watch(
  () => props.visible,
  (visible) => (isVisible.value = visible),
);
</script>

<template>
  <Dialog
    @hide="$emit('hide')"
    v-model:visible="isVisible"
    modal
    class="bg-surface-100 text-surface-950 dark:text-surface-100 w-[90vw] h-full dark:bg-surface-900"
  >
    <template #container="{ closeCallback }">
      <div
        class="w-full z-50 flex justify-between items-center rounded-t-md py-4 px-6 shadow bg-white dark:bg-surface-700"
      >
        <h1 class="font-bold text-2xl">{{ headerTitle }}</h1>
        <div class="flex gap-2">
          <Button @click="closeCallback" label="Cancelar" severity="danger" />
          <Button
            @click="$emit('primaryClicked')"
            label="Adicionar"
            :disabled="isPrimaryButtonDisabled"
          />
        </div>
      </div>

      <div class="p-8 overflow-y-auto">
        <slot name="modalContent"></slot>
      </div>
    </template>
  </Dialog>
</template>
