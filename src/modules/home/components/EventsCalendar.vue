<script setup lang="ts">
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Fullcalendar from '@fullcalendar/vue3';

const events = [
  {
    title: 'teste 1',
    start: '2024-04-19 10:00:00',
    end: '2024-04-19 14:00:00',
    allDay: false,
  },
  {
    title: 'teste 1',
    start: '2024-04-19 10:00:00',
    end: '2024-04-19 14:00:00',
    allDay: false,
  },
  {
    title: 'teste 1',
    start: '2024-04-19 10:00:00',
    end: '2024-04-19 14:00:00',
    allDay: false,
  },
  {
    title: 'teste 1',
    start: '2024-04-19 10:00:00',
    end: '2024-04-19 14:00:00',
    allDay: false,
  },
  {
    title: 'teste 2',
    start: '2024-04-19 11:00:00',
    end: '2024-04-22 14:00:00',
    allDay: false,
  },
];
const calendarOptions = {
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
  events,
};

const emit = defineEmits<{
  (e: 'dayClicked', value: any): void;
}>();

function handleDateClick(event: any) {
  emit('dayClicked', event);
}
</script>
<template>
  <div class="bg-white p-4 rounded font-base text-surface-700 border border-surface-200">
    <Fullcalendar :options="calendarOptions" />
  </div>
</template>
