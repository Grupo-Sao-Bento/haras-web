<script setup lang="ts">
import { computed, onMounted } from 'vue';

import useVuelidate from '@vuelidate/core';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';

import type { Stay } from '../models/stay.model';
import { useStaysAnimalsFormStore } from '../state/stays-animals.store';

const props = defineProps<{
  formModel: Partial<Stay>;
  validationRules: Object;
  animalName: string;
}>();

const emit = defineEmits<{
  (e: 'update:formModel', value: Partial<Stay>): void;
  (e: 'update:animal-name', value: string): void;
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

const staysAnimalsFormStore = useStaysAnimalsFormStore();

const searchAnimalResults = computed(() => {
  return staysAnimalsFormStore.animals?.map((animal) => ({ id: animal.id, name: animal.name }));
});

function updateAnimalName(selectedAnimalId: string) {
  const selectedAnimal = searchAnimalResults.value?.find(
    (animal) => animal.id === selectedAnimalId,
  );
  const animalName = selectedAnimal ? selectedAnimal.name : '';
  emit('update:animal-name', animalName);
}

onMounted(async () => {
  await staysAnimalsFormStore.fetchAnimals();
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
        @update:modelValue="updateAnimalName"
      />
    </div>
  </div>

  <label class="font-bold">Entrada*</label> <br />
  <Calendar v-model="form.start" placeholder="dd/mm/aaaa" class="mt-2 w-6/12 mb-4" />
  <br />

  <label class="font-bold">Saída*</label> <br />
  <Calendar v-model="form.end" placeholder="dd/mm/aaaa" class="mt-2 w-6/12 mb-4" />
</template>
