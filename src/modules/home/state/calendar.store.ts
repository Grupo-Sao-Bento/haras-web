import { ref } from 'vue';

import httpClient from '@/services/http-client';
import { useToastStore } from '@/stores/toast.store';
import { defineStore } from 'pinia';

import type { CalendarEvent } from '../models/calendar-event.model';

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

export const useCalendarStore = defineStore('calendar', () => {
  const toastService = useToastStore();

  const state = ref<CalendarState>(initialState);

  async function createEvent(event: Partial<CalendarEvent>) {
    try {
      const newEvent = await httpClient
        .post<CalendarEvent>('events', event)
        .then((res) => res.data);

      state.value.events.push(newEvent);

      toastService.show({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Evento criado com sucesso!',
      });
    } catch (err: any) {
      toastService.show({
        severity: 'error',
        summary: 'Erro ao criar evento',
        detail:
          'Ocorreu um erro ao criar o evento. Tente novamente mais tarde ou contate o suporte.',
      });
    }
  }

  async function getEvents() {
    try {
      const events = await httpClient.get<CalendarEvent[]>('events').then((res) => res.data);

      state.value.events = events;
    } catch (error: any) {
      toastService.show({
        severity: 'error',
        summary: 'Erro ao recuperar eventos',
        detail:
          'Ocorreu um erro ao buscar os eventos. Tente novamente mais tarde ou contate o suporte.',
      });
    }
  }

  async function cancelEvent(eventId: string) {
    try {
      await httpClient.delete(`events/${eventId}`);

      state.value.events = state.value.events.filter((event) => event.id !== eventId);

      toastService.show({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Evento cancelado com sucesso!',
      });
    } catch (error: any) {
      toastService.show({
        severity: 'error',
        summary: 'Erro ao cancelar evento',
        detail:
          'Ocorreu um erro ao cancelar o evento. Tente novamente mais tarde ou contate o suporte.',
      });
    }
  }

  return { state, createEvent, getEvents, cancelEvent };
});
