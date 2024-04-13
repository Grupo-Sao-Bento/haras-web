<script setup lang="ts">
import { ref } from 'vue';

import AppFeatureHeader from '@/components/AppFeatureHeader.vue';
import AppFullScreenModal from '@/components/AppFullScreenModal.vue';
import AppFullScreenModalCard from '@/components/AppFullScreenModalCard.vue';
import SearchBar from '@/components/forms/SearchBar.vue';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import Button from 'primevue/button';

import CustomerForm from '../../components/CustomerForm.vue';
import type { Customer } from '../../models/customer';
import { useCustomersStore } from '../../state/customers.store';
import { cpf, phoneNumber } from '../../utils/validators';

const customersStore = useCustomersStore();

const modalHeader = ref('Adicionar cliente');
const modalVisible = ref(false);

const formModel = ref<Partial<Customer>>({
  firstName: '',
  lastName: '',
  cpf: '',
  email: '',
  phoneNumber: '',
});
const rules = {
  firstName: { required },
  lastName: { required },
  cpf: { required, cpf },
  email: { required, email },
  phoneNumber: { required, phoneNumber },
};
const v$ = useVuelidate();

function closeModal() {
  modalVisible.value = false;
  formModel.value = {
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    phoneNumber: '',
  };
}

function createCustomer() {
  customersStore.postCustomer(formModel.value);
  closeModal();
}
</script>

<template>
  <AppFeatureHeader
    title="Clientes"
    subtitle="Gerencie aqui os clientes do seu Haras."
    :has-tabs="true"
  >
    <template #actions>
      <SearchBar />
      <Button label="Adicionar" icon="fa-solid fa-plus" @click="modalVisible = true" />
    </template>
  </AppFeatureHeader>

  <AppFullScreenModal
    :headerTitle="modalHeader"
    :visible="modalVisible"
    :isPrimaryButtonDisabled="v$.$invalid"
    @hide="closeModal"
    @primary-clicked="createCustomer"
  >
    <template #modalContent>
      <AppFullScreenModalCard>
        <CustomerForm v-model:form-model="formModel" :validation-rules="rules" />
      </AppFullScreenModalCard>
    </template>
  </AppFullScreenModal>
</template>
