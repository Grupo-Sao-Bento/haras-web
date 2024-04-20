<script setup lang="ts">
import { ref, watch } from 'vue';

import FormControl from '@/components/forms/FormControl.vue';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';

import type { CalendarEvent } from '../models/calendar-event.model';

const props = defineProps<{
  visible: boolean;
  isPrimaryButtonDisabled: boolean;
  clickedDate: Date;
}>();
const isVisible = ref(false);

const title = ref('Novo evento');
const start = ref(new Date());
const end = ref(new Date(start.value.getTime() + 60 * 60 * 1000));
const allDay = ref(false);

const emit = defineEmits<{
  (e: 'hide'): void;
  (e: 'primary-clicked', value: Partial<CalendarEvent>): void;
}>();

watch(
  () => props.visible,
  (visible) => {
    title.value = 'Novo evento';
    isVisible.value = visible;
  },
);
watch(
  () => props.clickedDate,
  (date) => (start.value = getStartDate(date)),
);
watch(start, () => (end.value = new Date(start.value.getTime() + 60 * 60 * 1000)));

function getStartDate(date: Date) {
  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();

  date.setHours(currentHours);
  date.setMinutes(currentMinutes);

  return date;
}

function submitEvent() {
  const newEvent: Partial<CalendarEvent> = {
    title: title.value,
    start: start.value,
    end: end.value,
    allDay: allDay.value,
  };

  emit('primary-clicked', newEvent);
  isVisible.value = false;
}
</script>

<template>
  <Dialog
    @hide="$emit('hide')"
    v-model:visible="isVisible"
    modal
    header="Evento"
    :style="{ width: '25rem' }"
  >
    <div class="mb-3">
      <FormControl
        v-model="title"
        label="Título"
        id="event-title"
        name="event-title"
        type="text"
        placeholder="Título do evento"
        classes="w-full"
      />
    </div>
    <div class="mb-3">
      <label class="font-bold">Início</label> <br />
      <Calendar v-model="start" class="mt-2 w-6/12" showTime hour-format="24" />
    </div>
    <div class="mb-3">
      <label class="font-bold">Fim</label> <br />
      <Calendar
        v-model="end"
        class="mt-2 w-6/12"
        date-format="dd/mm/yy"
        showTime
        hour-format="24"
      />
    </div>
    <div class="mb-5 flex items-center gap-2">
      <Checkbox v-model="allDay" binary input-id="all-day" name="all-day" />
      <label for="all-day" class="cursor-pointer">Este evento dura o dia todo</label>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancelar"
        severity="danger"
        outlined
        @click="isVisible = false"
      ></Button>
      <Button type="button" label="Salvar" :disabled="!title" @click="submitEvent"></Button>
    </div>
  </Dialog>
</template>
