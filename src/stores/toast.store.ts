import type { Toast } from '@/models/toast';
import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: (): Toast => ({
    severity: 'info',
    summary: '',
    detail: '',
  }),
  actions: {
    show(toast: Toast): void {
      this.$state = toast;
    },
  },
});
