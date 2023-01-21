<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2 class="heading2">Typography</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'element' }, { name: 'typography' }]" />
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="card p-4 space-y-5">
        <h2>Basic Heading</h2>
        <p>HTML headings are titles or subtitles that you want to display on a webpage.</p>
        <div class="space-y-3">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
      </div>
      <div class="card p-4 space-y-5">
        <h2>Light Heading</h2>
        <p>HTML headings are available with light variant.</p>
        <div class="space-y-3">
          <h1 class="font-light">Heading 1</h1>
          <h2 class="font-light">Heading 2</h2>
          <h3 class="font-light">Heading 3</h3>
          <h4 class="font-light">Heading 4</h4>
          <h5 class="font-light">Heading 5</h5>
          <h6 class="font-light">Heading 6</h6>
        </div>
      </div>
      <div class="card p-4 space-y-5">
        <h2>Bold Heading</h2>
        <p>HTML headings are available with light variant.</p>
        <div class="space-y-3">
          <h1 class="font-bold">Heading 1</h1>
          <h2 class="font-bold">Heading 2</h2>
          <h3 class="font-bold">Heading 3</h3>
          <h4 class="font-bold">Heading 4</h4>
          <h5 class="font-bold">Heading 5</h5>
          <h6 class="font-bold">Heading 6</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
</script>
