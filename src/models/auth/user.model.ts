import type { Roles } from './roles.enum';

export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  role: Roles;
  createdAt: Date;
}
