<script setup lang="ts">
import InputMask from 'primevue/inputmask';

const value = defineModel<string>();

defineProps<{
  label?: string;
  id?: string;
  hint?: string;
  size?: 'small' | 'large';
  mask?: string;
  classes?: string;
}>();
</script>

<template>
  <div class="flex flex-col" :class="classes">
    <label v-if="label" class="mb-2 font-bold" :for="id">{{ label }}</label>
    <InputMask v-model="value" :id="id" :size="size" :mask="mask" v-bind="$attrs" />
    <small v-if="hint" class="mt-1 text-surface-500">{{ hint }}</small>
  </div>
</template>
