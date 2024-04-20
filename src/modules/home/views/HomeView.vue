<script setup lang="ts">
import { onMounted, ref } from 'vue';

import EventDetailsModal from '../components/EventDetailsModal.vue';
import EventModal from '../components/EventModal.vue';
import EventsCalendar from '../components/EventsCalendar.vue';
import type { CalendarEvent } from '../models/calendar-event.model';
import { useCalendarStore } from '../state/calendar.store';

const calendarStore = useCalendarStore();

const eventModalVisible = ref(false);
const eventDetailsVisible = ref(false);
const selectedEvent = ref({} as CalendarEvent);
const isPrimaryButtonDisabled = ref(false);
const clickedDate = ref(new Date());

function openEventModal(event: any) {
  clickedDate.value = event.date;
  eventModalVisible.value = true;
}

function openEventDetails(event: any) {
  selectedEvent.value = event.event as CalendarEvent;
  eventDetailsVisible.value = true;
}

async function createEvent(event: Partial<CalendarEvent>) {
  await calendarStore.createEvent(event);
}

async function cancelEvent(eventId: string) {
  await calendarStore.cancelEvent(eventId);
}

onMounted(async () => {
  await calendarStore.getEvents();
});
</script>

<template>
  <h1 class="text-4xl font-semibold text-surface-800 mb-8">Bem vindo!</h1>
  <EventsCalendar
    :events="calendarStore.state.events"
    @day-clicked="openEventModal($event)"
    @calendar-event-clicked="openEventDetails($event)"
  />

  <EventModal
    :visible="eventModalVisible"
    :is-primary-button-disabled="isPrimaryButtonDisabled"
    :clicked-date="clickedDate"
    @hide="eventModalVisible = false"
    @primary-clicked="createEvent($event)"
  />
  <EventDetailsModal
    :visible="eventDetailsVisible"
    :is-primary-button-disabled="false"
    :event="selectedEvent"
    @hide="eventDetailsVisible = false"
    @primary-clicked="cancelEvent($event)"
  />
</template>
