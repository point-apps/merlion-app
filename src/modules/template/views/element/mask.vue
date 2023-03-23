<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Mask</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'Template' }, { name: 'Element' }, { name: 'Mask' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Mask</h3>
        <component :is="Switch" v-model="maskCodeToggle" label="code" />
      </div>
      <p>Mask crops the content of the element to common shapes.</p>
      <div class="flex flex-wrap gap-5">
        <div class="avatar h-36 w-36">
          <img class="mask mask-squircle" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-reuleaux-triangle" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-diamond" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-hexagon" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-hexagon-2" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-octagon" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-star" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-star-2" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-36 w-36">
          <img class="mask mask-heart" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': maskCodeToggle,
          'max-h-0 overflow-hidden': !maskCodeToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="maskCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const maskCodeToggle = ref(false)
const maskCode = `<div class="avatar h-36 w-36">
  <img class="mask mask-squircle" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-reuleaux-triangle" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-diamond" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-hexagon" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-hexagon-2" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-octagon" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-star" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-star-2" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-36 w-36">
  <img class="mask mask-heart" src="https://via.placeholder.com/150" alt="avatar" />
</div>`
</script>
