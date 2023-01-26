<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Strength Mapping</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'strength mapping' }]" />
    </div>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
      <router-link
        to="/strength-mapping/capture"
        class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow"
      >
        <fa-icon icon="fa-thin fa-circle-camera w-12 h-12" />
        <span>Capture</span>
      </router-link>
      <router-link
        to="/strength-mapping/report/spider-chart"
        class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow"
      >
        <fa-icon icon="fa-thin fa-chart-line w-12 h-12" />
        <span>Report</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
</script>
