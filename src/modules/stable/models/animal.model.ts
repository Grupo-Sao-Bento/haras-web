import type { User } from '@/models/auth/user.model';

import type { AnimalTypes } from '../enums/animal-types.enum';
import type { Breeds } from '../enums/breeds.enum';
import type { Coats } from '../enums/coats.enum';
import type { Genders } from '../enums/genders.enum';

export interface Animal {
  id: string;
  name: string;
  coat: Coats;
  breed: Breeds;
  type: AnimalTypes;
  gender: Genders;
  registry: string;
  owner: string;
  birthDate: Date;
  dailyFee: number;
  isAlive: boolean;
  father: Animal;
  mother: Animal;
  createdBy: User;
  createdAt: Date;
  updatedBy: User;
  updatedAt: Date;
}
