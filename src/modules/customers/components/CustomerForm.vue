<script setup lang="ts">
import { computed, onMounted } from 'vue';

import FormControl from '@/components/forms/FormControl.vue';
import MaskFormControl from '@/components/forms/MaskFormControl.vue';
import useVuelidate from '@vuelidate/core';

import type { Customer } from '../models/customer';

const props = defineProps<{
  formModel: Partial<Customer>;
  validationRules: Object;
}>();
const emit = defineEmits<{
  (e: 'update:formModel', value: Partial<Customer>): void;
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

onMounted(async () => {
  await v$.value.$validate();
});
</script>

<template>
  <h2 class="text-xl font-semibold mb-2">Dados pessoais</h2>
  <hr class="mb-6" />

  <div class="gap-4 grid grid-cols-3 mb-4">
    <FormControl
      v-model="form.firstName"
      label="Nome*"
      id="customer-name"
      name="customer-name"
      type="text"
      placeholder="Primeiro nome"
      classes="col-span-1"
    />

    <FormControl
      v-model="form.lastName"
      label="Sobrenome*"
      id="customer-last-name"
      name="customer-last-name"
      type="text"
      placeholder="Sobrenome"
      classes="col-span-2"
    />
  </div>

  <MaskFormControl
    v-model="form.cpf"
    label="CPF*"
    id="customer-cpf"
    name="customer-cpf"
    type="text"
    placeholder="000.000.000-00"
    mask="999.999.999-99"
    classes="mb-4"
  />

  <h2 class="text-xl font-semibold mb-2 mt-8">Informações de contato</h2>
  <hr class="mb-6" />

  <div class="gap-4 flex mb-4">
    <MaskFormControl
      v-model="form.phoneNumber"
      label="Telefone*"
      id="customer-phone-number"
      name="customer-phone-number"
      type="tel"
      placeholder="(99) 99999-9999"
      mask="(99) 99999-9999"
      classes="w-full"
    />

    <FormControl
      v-model="form.email"
      label="Email*"
      id="customer-email"
      name="customer-email"
      type="email"
      placeholder="exemplo@email.com"
      classes="w-full"
    />
  </div>
</template>
