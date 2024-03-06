<script setup lang="ts">
import Button from 'primevue/button';
import Menu from 'primevue/menu';
</script>

<template>
  <div class="px-8 pb-4 fixed w-full">
    <div class="w-full h-4 bg-zinc-100 dark:bg-surface-900"></div>
    <Menu class="shadow-sm">
      <template #start>
        <div class="flex items-center justify-between w-56">
          <h2 class="text-2xl ml-8 font-bold">EquinoGest</h2>
          <div>
            <Button
              @click="$emit('toggleMenu')"
              icon="pi pi-bars"
              severity="secondary"
              aria-label="Mostrar ou esconder menu"
              outlined
            />
          </div>
        </div>
      </template>
    </Menu>
  </div>
</template>
