<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="header-container relative flex w-full">
      <div class="flex w-full items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <component :is="ComponentToggleSidebar" class="pr-2" />
          <p class="font-semibold uppercase">Strength Mapping</p>
        </div>

        <!-- Right: Header Buttons -->
        <div class="flex items-center space-x-2">
          <p>{{ fullName }}</p>
          <!-- <div><component :is="ComponentNotification" /></div>
          <div><component :is="ComponentDarkMode" /></div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ComponentDarkMode from './component-dark-mode.vue'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import ComponentNotification from './component-notification.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const fullName = authStore.$state.user.name
</script>
