import type { Animal } from '@/modules/stable/models/animal.model';

export interface Stay {
  id: string;
  animal: Animal;
  start: Date;
  end: Date;
}
