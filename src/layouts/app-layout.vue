<template>
  <app-preloader class="print:hidden"></app-preloader>

  <!-- Page Wrapper -->
  <div class="h-100vh flex grow bg-slate-100 dark:bg-slate-900">
    <app-sidebar class="print:hidden"></app-sidebar>
    <app-header class="print:hidden"></app-header>
    <main class="main-content">
      <RouterView />
    </main>
    <app-bottom-navigation v-if="isMobileBreakpoint()" class="print:hidden"></app-bottom-navigation>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppPreloader from '@/components/app-preloader.vue'
import AppSidebar from './app-sidebar.vue'
import AppHeader from './app-header.vue'
import AppBottomNavigation from './app-bottom-navigation.vue'
import { useMobileBreakpoint } from '@/composable/mobile-breakpoint'

const { isMobileBreakpoint } = useMobileBreakpoint()
</script>
