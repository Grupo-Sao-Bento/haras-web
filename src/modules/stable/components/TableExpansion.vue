<script setup lang="ts">
import { AnimalTypes } from '../enums/animal-types.enum';
import { Breeds } from '../enums/breeds.enum';
import { Coats } from '../enums/coats.enum';
import { Genders } from '../enums/genders.enum';
import type { Animal } from '../models/animal.model';
import type { Customer } from '@/modules/customers/models/customer';

defineProps<{ animal: Animal }>();

function getFormattedDate(date: Date | string): string {
  return new Date(date).toJSON()?.slice(0, 10).split('-').reverse().join('/');
}
</script>

<template>
  <p><span class="font-bold">Nome:</span> {{ animal.name }}</p>
  <p>
    <span class="font-bold">Pelagem:</span>
    {{ Coats[animal.coat as unknown as keyof typeof Coats] }}
  </p>
  <p>
    <span class="font-bold">Sexo:</span>
    {{ Genders[animal.gender as unknown as keyof typeof Genders] }}
  </p>
  <p>
    <span class="font-bold">Tipo:</span>
    {{ AnimalTypes[animal.type as unknown as keyof typeof AnimalTypes] }}
  </p>
  <p v-if="animal.breed">
    <span class="font-bold">Raça:</span>
    {{ Breeds[animal.breed as unknown as keyof typeof Breeds] }}
  </p>
  <p v-if="animal.owner">
    <span class="font-bold">Proprietário:</span>
    {{ animal.owner.firstName }}
  </p>
  <p v-if="animal.father">
    <span class="font-bold">Pai:</span>
    {{ animal.father.name }}
  </p>
  <p v-if="animal.mother">
    <span class="font-bold">Mãe:</span>
    {{ animal.mother.name }}
  </p>
  <p v-if="animal.registry">
    <span class="font-bold">Registro interno:</span>
    {{ animal.registry }}
  </p>
  <p v-if="animal.birthDate">
    <span class="font-bold">Nascimento:</span>
    {{ getFormattedDate(animal.birthDate) }}
  </p>
  <p v-if="animal.dailyFee">
    <span class="font-bold">Valor da diária:</span>
    R$ {{ animal.dailyFee }}
  </p>
  <p v-if="animal.isAlive">
    <span class="font-bold">Estado de vida:</span>
    {{ animal.isAlive ? 'Vivo' : 'Morto' }}
  </p>
  <p>
    <span class="font-bold">Registro criado em:</span>
    {{ getFormattedDate(animal.createdAt) }}
  </p>
  <p>
    <span class="font-bold">Registro criado por:</span>
    {{ animal.createdBy?.login }}
  </p>
  <p v-if="animal.updatedAt">
    <span class="font-bold">Última atualização em:</span>
    {{ getFormattedDate(animal.updatedAt) }}
  </p>
  <p v-if="animal.updatedBy">
    <span class="font-bold">Última atualização por:</span>
    {{ animal.updatedBy?.login }}
  </p>
</template>
