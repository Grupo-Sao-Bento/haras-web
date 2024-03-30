import type { AnimalTypes } from '../enums/animal-types.enum';
import type { Coats } from '../enums/coats.enum';
import type { Genders } from '../enums/genders.enum';

export interface Animal {
  name: string;
  coat: Coats;
  type: AnimalTypes;
  gender: Genders;
  registry: string;
  owner: string;
  birthDate: Date;
  dailyFee: number;
  isAlive: boolean;
}
