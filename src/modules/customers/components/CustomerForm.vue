<script setup lang="ts">
import FormControl from '@/components/forms/FormControl.vue';
</script>

<template>
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

  <div class="gap-4 flex mb-4">
    <FormControl
      label="Telefone*"
      id="customer-phone-number"
      name="customer-phone-number"
      type="tel"
      placeholder="(10) 98765-4321"
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

  <div class="gap-4 flex wb-4">
    <FormControl
      label="CPF"
      id="customer-cpf"
      name="customer-cpf"
      type="text"
      placeholder="000.000.000-00"
      classes="w-full"
    />

    <FormControl
      label="CNPJ"
      id="customer-cnpj"
      name="customer-cnpj"
      type="email"
      placeholder="00.000.000/0001-00"
      classes="w-full"
    />
  </div>
</template>
