<script setup lang="ts">
import FormControl from '@/components/forms/FormControl.vue';
import Button from 'primevue/button';
</script>

<template>
  <div class="w-screen h-screen bg-primary-500 grid grid-cols-1 overflow-x-hidden md:grid-cols-2">
    <div class="w-full h-full p-8 sm:p-8 bg-surface-50 flex items-center justify-center">
      <div class="py-16">
        <h1 class="text-3xl font-semibold">Bem vindo de volta!</h1>
        <p class="mb-16 text-surface-500">Acesse sua conta e inicie as operações do seu Haras</p>

        <div>
          <FormControl
            label="Email"
            id="email"
            placeholder="Endereço de e-mail"
            size="large"
            classes="mb-4"
          />
          <FormControl
            label="Senha"
            id="password"
            type="password"
            placeholder="••••••••"
            size="large"
            classes="mb-8"
          />

          <Button
            label="Entrar"
            size="large"
            class="w-full"
            :pt="{ label: 'text-lg font-semibold' }"
          />
        </div>
      </div>
    </div>
    <img src="@/assets/images/horses.jpg" class="object-cover h-full" />
  </div>
</template>