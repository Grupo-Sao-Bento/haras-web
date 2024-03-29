export type Toast = {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
};
