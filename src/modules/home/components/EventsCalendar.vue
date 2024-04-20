<script setup lang="ts">
import { computed } from 'vue';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Fullcalendar from '@fullcalendar/vue3';

import type { CalendarEvent } from '../models/calendar-event.model';

const props = defineProps<{
  events: CalendarEvent[];
}>();

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  locale: 'pt-BR',
  buttonText: {
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
  },
  headerToolbar: {
    start: 'title',
    center: 'dayGridMonth timeGridWeek',
    end: 'prev today next',
  },
  dateClick: handleDateClick,
  eventClick: handleEventClick,
  events: props.events,
}));

const emit = defineEmits<{
  (e: 'dayClicked', value: any): void;
  (e: 'calendarEventClicked', value: any): void;
}>();

function handleDateClick(event: any) {
  emit('dayClicked', event);
}

function handleEventClick(calendarEvent: any) {
  emit('calendarEventClicked', calendarEvent);
}
</script>
<template>
  <div class="bg-white p-4 rounded font-base text-surface-700 border border-surface-200">
    <Fullcalendar :options="calendarOptions" />
  </div>
</template>
