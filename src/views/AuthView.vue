<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';

import FormControl from '@/components/forms/FormControl.vue';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import Button from 'primevue/button';

const form = reactive({
  email: '',
  password: '',
});
const rules = computed(() => ({
  email: { required, email },
  password: { required },
}));
const v$ = useVuelidate(rules, form);

onMounted(() => {
  v$.value.$validate();
});
</script>

<template>
  <div class="w-screen h-screen bg-primary-500 grid grid-cols-1 overflow-x-hidden md:grid-cols-2">
    <div
      class="w-full h-full p-8 sm:p-8 flex items-center justify-center bg-surface-50 text-surface-950 dark:bg-surface-800 dark:text-surface-100"
    >
      <div class="py-16">
        <h1 class="text-3xl font-semibold">Bem vindo de volta!</h1>
        <p class="mb-16 text-surface-500">Acesse sua conta e inicie as operações do seu Haras.</p>

        <div>
          <FormControl
            v-model="form.email"
            label="Email"
            id="email"
            type="email"
            placeholder="Endereço de e-mail"
            size="large"
            classes="mb-4"
          />
          <FormControl
            v-model="form.password"
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
            :disabled="v$.$error"
            :pt="{ label: 'text-lg font-semibold' }"
          />
        </div>
      </div>
    </div>
    <img src="@/assets/images/horses.jpg" class="object-cover h-full" />
  </div>
</template>
