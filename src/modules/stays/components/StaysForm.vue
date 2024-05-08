<script setup lang="ts">
import { computed, onMounted } from 'vue';

import useVuelidate from '@vuelidate/core';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';

import { useAnimalsFormStore } from '../../stable/state/animals-form.store';
import type { Stay } from '../models/stay.model';

const props = defineProps<{
  formModel: Partial<Stay>;
  validationRules: Object;
}>();

const emit = defineEmits<{
  (e: 'update:formModel', value: Partial<Stay>): void;
}>();

const form = computed({
  get() {
    return props.formModel;
  },
  set(formValue) {
    emit('update:formModel', formValue);
  },
});
const v$ = useVuelidate(props.validationRules, form.value);

const animalsFormStore = useAnimalsFormStore();

const searchAnimalResults = computed(() => {
  return animalsFormStore.animals?.map((animal) => ({ id: animal.id, name: animal.name }));
});

onMounted(async () => {
  await animalsFormStore.fetchAnimals();
  await v$.value.$validate();
});
</script>

<template>
  <div class="flex gap-4 mt-4 mb-4">
    <div class="w-full">
      <label class="font-bold">Animal*</label>
      <Dropdown
        v-model="form.animal"
        :options="searchAnimalResults"
        filter
        optionValue="id"
        optionLabel="name"
        placeholder="Selecione o Animal"
        class="w-full md:w-14rem mt-2"
      />
    </div>
  </div>

  <label class="font-bold">Entrada*</label> <br />
  <Calendar v-model="form.start" placeholder="dd/mm/aaaa" class="mt-2 w-6/12 mb-4" />
  <br />

  <label class="font-bold">Saída*</label> <br />
  <Calendar v-model="form.end" placeholder="dd/mm/aaaa" class="mt-2 w-6/12 mb-4" />
</template>
