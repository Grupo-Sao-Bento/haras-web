<script setup lang="ts">
import Button from 'primevue/button';
import Menu from 'primevue/menu';

defineProps<{ displayName?: string }>();
</script>

<template>
  <div class="pb-4 fixed w-full z-50">
    <div class="w-full h-4 bg-surface-100 dark:bg-surface-900"></div>
    <div class="px-4">
      <Menu class="shadow flex items-center justify-between px-6 py-3">
        <template #start>
          <div class="flex items-center justify-between w-56">
            <h2 class="text-2xl font-bold">EquinoGest</h2>
            <div>
              <Button
                @click="$emit('toggleMenu')"
                icon="fa-solid fa-bars"
                severity="secondary"
                aria-label="Mostrar ou esconder menu"
                outlined
              />
            </div>
          </div>
        </template>

        <template #end>
          <div class="flex items-center h-full justify-between gap-7">
            <div class="flex items-center gap-2 max-w-40">
              <i class="fa-solid fa-circle-user fa-lg"></i>
              <div class="truncate">{{ displayName || 'Usuário' }}</div>
            </div>
            <Button
              @click="$emit('logout')"
              icon="fa-solid fa-right-from-bracket"
              severity="danger"
              aria-label="Mostrar ou esconder menu"
              outlined
            />
          </div>
        </template>
      </Menu>
    </div>
  </div>
</template>
