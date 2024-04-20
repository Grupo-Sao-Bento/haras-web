import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { CalendarEvent } from '../models/calendar-event.model';

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

export const useCalendarStore = defineStore('calendar', () => {
  const state = ref<CalendarState>(initialState);

  return { state };
});
