<script setup lang="ts">
import InputText from 'primevue/inputtext';
import type { Nullable } from 'primevue/ts-helpers';

const value = defineModel<Nullable<string>>();

defineProps<{
  label?: string;
  id?: string;
  hint?: string;
  size?: 'small' | 'large';
  classes?: string;
}>();
</script>

<template>
  <div class="flex flex-col" :class="classes">
    <label v-if="label" class="mb-2 font-bold" :for="id">{{ label }}</label>
    <InputText mask="99-9999" v-model="value" :id="id" :size="size" v-bind="$attrs" />
    <small v-if="hint" class="mt-1 text-surface-500">{{ hint }}</small>
  </div>
</template>
