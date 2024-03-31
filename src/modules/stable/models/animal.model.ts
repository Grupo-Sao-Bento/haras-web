import type { User } from '@/models/auth/user.model';

import type { AnimalTypes } from '../enums/animal-types.enum';
import type { Coats } from '../enums/coats.enum';
import type { Genders } from '../enums/genders.enum';

export interface Animal {
  id: string;
  name: string;
  coat: Coats;
  type: AnimalTypes;
  gender: Genders;
  registry: string;
  owner: string;
  birthDate: Date;
  dailyFee: number;
  isAlive: boolean;
  createdBy: User;
  createdAt: Date;
  updatedBy: User;
  updatedAt: Date;
}
