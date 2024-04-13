<script setup lang="ts">
import FormControl from '@/components/forms/FormControl.vue';
import MaskFormControl from '@/components/forms/MaskFormControl.vue';
</script>

<template>
  <h2 class="text-xl font-semibold mb-2">Dados pessoais</h2>
  <hr class="mb-6" />

  <div class="gap-4 grid grid-cols-3 mb-4">
    <FormControl
      label="Nome*"
      id="customer-name"
      name="customer-name"
      type="text"
      placeholder="Primeiro nome"
      classes="col-span-1"
    />

    <FormControl
      label="Sobrenome*"
      id="customer-last-name"
      name="customer-last-name"
      type="text"
      placeholder="Sobrenome"
      classes="col-span-2"
    />
  </div>

  <MaskFormControl
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
      label="Telefone*"
      id="customer-phone-number"
      name="customer-phone-number"
      type="tel"
      placeholder="(99) 99999-9999"
      mask="(99) 99999-9999"
      classes="w-full"
    />

    <FormControl
      label="Email*"
      id="customer-email"
      name="customer-email"
      type="email"
      placeholder="exemplo@email.com"
      classes="w-full"
    />
  </div>
</template>
