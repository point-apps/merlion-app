<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="header-container relative flex w-full">
      <div class="flex w-full items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <component :is="ComponentToggleSidebar" class="pr-2" />
          <p class="font-semibold uppercase"></p>
        </div>

        <!-- Right: Header Buttons -->
        <div class="flex items-center space-x-2">
          <fa-icon icon="fa-solid fa-user-circle w-5 h-5"></fa-icon>
          <p>{{ name }}</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const name = authStore.$state.user.name
</script>
