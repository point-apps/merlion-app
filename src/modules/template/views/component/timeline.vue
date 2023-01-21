<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Accordion</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'element' }, { name: 'typography' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <h3>Breadcrumb</h3>
      <p>
        Breadcrumb consist of a list of links that help a user visualize a page's location within the hierarchical
        structure of a website.
      </p>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
</script>
