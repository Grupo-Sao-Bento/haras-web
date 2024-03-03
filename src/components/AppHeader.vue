<script setup lang="ts">
import Button from 'primevue/button'
import Menu from 'primevue/menu'
</script>

<template>
  <div class="px-8 py-4 fixed w-full">
    <Menu class="shadow-sm">
      <template #start>
        <div class="flex items-center justify-between w-56">
          <h2 class="text-2xl ml-8 font-bold">HorseOps</h2>
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
