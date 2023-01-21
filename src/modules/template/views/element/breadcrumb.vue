<template>
  <div class="flex flex-col justify-center py-5 space-y-5 lg:py-6">
    <div class="main-content-header">
      <h2 class="heading2">Breadcrumb</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'Template' }, { name: 'Element' }, { name: 'Breadcrumb' }]" />
    </div>
    <div class="space-y-5">
      <div class="card p-4 space-y-5">
        <h2 class="font-bold text-slate-700 dark:text-slate-50">Breadcrumb</h2>
        <p>
          Breadcrumb consist of a list of links that help a user visualize a page's location within the hierarchical
          structure of a website.
        </p>
        <component :is="Breadcrumb" :breadcrumbs="breadcrumbs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'

const breadcrumbs = [{ name: 'Template', path: '#' }, { name: 'Element', path: '#' }, { name: 'Breadcrumb' }]
</script>
