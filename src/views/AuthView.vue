<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';

import FormControl from '@/components/forms/FormControl.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const form = reactive({
  email: '',
  password: '',
});
const rules = computed(() => ({
  email: { required, email },
  password: { required },
}));
const v$ = useVuelidate(rules, form);
const loading = ref(false);
const authStore = useAuthStore();
const toastStore = useToastStore();
const toast = useToast();

toastStore.$subscribe((_, state) => {
  toast.add({ severity: state.severity, summary: state.summary, detail: state.detail, life: 4000 });
});

onMounted(async () => {
  v$.value.$validate();
});

async function login(): Promise<void> {
  loading.value = true;
  await authStore.login(form.email, form.password);
  loading.value = false;
}
</script>

<template>
  <Toast />

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
            @click="login"
            label="Entrar"
            size="large"
            class="w-full"
            :loading="loading"
            :disabled="v$.$error"
            :pt="{ label: 'text-lg font-semibold' }"
          />
        </div>
      </div>
    </div>
    <img src="@/assets/images/horses.jpg" class="object-cover h-full" />
  </div>
</template>
