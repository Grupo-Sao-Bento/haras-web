<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import type { CalendarEvent } from '../models/calendar-event.model';

const props = defineProps<{
  visible: boolean;
  isPrimaryButtonDisabled: boolean;
  event: CalendarEvent;
}>();
const isVisible = ref(false);

const emit = defineEmits<{
  (e: 'hide'): void;
  (e: 'primaryClicked', eventId: string): void;
}>();

watch(
  () => props.visible,
  (visible) => {
    isVisible.value = visible;
  },
);

function cancelEvent() {
  emit('primaryClicked', props.event.id);
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
      <h3 class="font-bold text-lg">{{ event.title }}</h3>
    </div>
    <div class="mb-3">
      <span class="font-bold">Início:</span> {{ event.start.toLocaleString('pt-BR') }}
    </div>
    <div class="mb-5">
      <div v-if="event.end">
        <span class="font-bold">Fim:</span> {{ event.end.toLocaleString('pt-BR') }}
      </div>
      <div v-if="event.allDay">
        <span class="font-bold">Fim:</span>
        O evento dura o dia todo.
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancelar evento"
        severity="danger"
        outlined
        @click="cancelEvent"
      ></Button>
      <Button type="button" label="Fechar" @click="isVisible = false"></Button>
    </div>
  </Dialog>
</template>
