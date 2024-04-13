import type { User } from '@/models/auth/user.model';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  cpf: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdBy: User;
  createdAt: Date;
  updatedBy: User;
  updatedAt: Date;
}
