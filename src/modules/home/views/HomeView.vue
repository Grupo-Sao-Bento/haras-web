<script setup lang="ts">
import { ref } from 'vue';

import EventModal from '../components/EventModal.vue';
import EventsCalendar from '../components/EventsCalendar.vue';

const modalVisible = ref(false);
const isPrimaryButtonDisabled = ref(false);
const clickedDate = ref(new Date());

function openEventModal(event: any) {
  clickedDate.value = event.date;
  modalVisible.value = true;
}
</script>

<template>
  <h1 class="text-4xl font-semibold text-surface-800 mb-8">Bem vindo!</h1>
  <EventsCalendar @day-clicked="openEventModal($event)" />

  <EventModal
    :visible="modalVisible"
    :is-primary-button-disabled="isPrimaryButtonDisabled"
    :clicked-date="clickedDate"
    @hide="modalVisible = false"
  />
</template>
