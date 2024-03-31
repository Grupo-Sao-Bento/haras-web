<script setup lang="ts">
import { computed, onMounted } from 'vue';

import FormControl from '@/components/forms/FormControl.vue';
import useVuelidate from '@vuelidate/core';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';

import { AnimalTypes } from '../enums/animal-types.enum';
import { Coats } from '../enums/coats.enum';
import { Genders } from '../enums/genders.enum';
import type { Animal } from '../models/animal.model';

const props = defineProps<{
  formModel: Partial<Animal>;
  validationRules: Object;
}>();

const emit = defineEmits<{
  (e: 'update:formModel', value: Partial<Animal>): void;
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

const coats = Object.entries(Coats).map(([enumKey, enumValue]) => ({
  text: enumValue,
  value: enumKey,
}));
const animalTypes = Object.entries(AnimalTypes).map(([enumKey, enumValue]) => ({
  text: enumValue,
  value: enumKey,
}));
const genders = Object.entries(Genders).map(([enumKey, enumValue]) => ({
  text: enumValue,
  value: enumKey,
}));

onMounted(async () => {
  await v$.value.$validate();
});
</script>

<template>
  <FormControl
    v-model="form.name"
    label="Nome*"
    id="animal-name"
    name="animal-name"
    type="text"
    placeholder="Nome do animal"
    classes="mb-4"
  />

  <label class="font-bold">Pelagem*</label>
  <Dropdown
    v-model="form.coat"
    :options="coats"
    optionLabel="text"
    optionValue="value"
    placeholder="Selecione uma pelagem"
    class="w-full mt-2"
  />

  <div class="flex gap-4 mt-4">
    <div class="w-full">
      <label class="font-bold">Sexo*</label>
      <Dropdown
        v-model="form.gender"
        :options="genders"
        optionLabel="text"
        optionValue="value"
        placeholder="Selecione o sexo do animal"
        class="w-full mt-2"
      />
    </div>

    <div class="w-full">
      <label class="font-bold">Tipo*</label>
      <Dropdown
        v-model="form.type"
        optionLabel="text"
        optionValue="value"
        placeholder="Selecione o tipo do animal"
        class="w-full mt-2"
        :options="animalTypes"
      />
    </div>
  </div>

  <FormControl
    v-model="form.registry"
    label="Registro"
    id="registry"
    type="text"
    placeholder="Registro interno"
    hint="Use esse campo para salvar qualquer tipo de registro interno usado na sua fazenda."
    classes="mt-4 mb-4"
  />

  <FormControl
    v-model="form.owner"
    label="Proprietário"
    id="owner"
    type="text"
    placeholder="Nome do proprietário"
    classes="mb-4"
  />

  <label class="font-bold">Data de Nascimento</label> <br />
  <Calendar v-model="form.birthDate" placeholder="dd/mm/aaaa" class="mt-2 w-6/12 mb-4" />

  <div>
    <label class="font-bold">Valor da diária</label> <br />
    <InputNumber
      v-model="form.dailyFee"
      locale="pt-BR"
      mode="currency"
      currency="BRL"
      placeholder="R$ 00,00"
      class="mt-2 w-6/12"
    />
  </div>

  <div class="mt-4">
    <label class="font-bold">Estado de Vida</label>
    <div class="flex items-center mt-2">
      <RadioButton v-model="form.isAlive" name="isAlive" inputId="is-alive-true" :value="true" />
      <label for="is-alive-true" class="ml-2">Vivo</label>
    </div>
    <div class="flex items-center">
      <RadioButton v-model="form.isAlive" name="isAlive" inputId="is-alive-false" :value="false" />
      <label for="is-alive-false" class="ml-2">Morto</label>
    </div>
  </div>
</template>
