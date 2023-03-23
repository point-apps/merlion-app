<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Avatar</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'Template' }, { name: 'Element' }, { name: 'Avatar' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Avatar</h3>
        <component :is="Switch" v-model="avatarCodeToggle" label="code" />
      </div>
      <p>
        The Avatar component creates a scalable, colorable element that can have text, icon or image within its shape.
      </p>
      <div class="flex flex-wrap gap-5">
        <div class="avatar h-24 w-24">
          <img class="rounded-full" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
        <div class="avatar h-24 w-24">
          <img class="rounded-lg" src="https://via.placeholder.com/150" alt="avatar" />
        </div>
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': avatarCodeToggle,
          'max-h-0 overflow-hidden': !avatarCodeToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="avatarCode" />
      </div>
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Avatar</h3>
        <component :is="Switch" v-model="avatarInitialCodeToggle" label="code" />
      </div>
      <p>In the absence of a image, you can use the initial. Initials can be used in various variants.</p>
      <div class="flex flex-wrap gap-5">
        <div class="avatar h-12 w-12">
          <div
            class="initial dark:bg-navy-500 dark:text-navy-100 rounded-full bg-slate-200 text-base uppercase text-slate-600"
          >
            jd
          </div>
        </div>
        <div class="avatar h-12 w-12">
          <div
            class="initial dark:bg-navy-500 dark:text-navy-100 rounded-lg bg-slate-200 text-base uppercase text-slate-600"
          >
            jd
          </div>
        </div>
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': avatarInitialCodeToggle,
          'max-h-0 overflow-hidden': !avatarInitialCodeToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="avatarInitialCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const avatarCodeToggle = ref(false)
const avatarCode = `<div class="avatar h-24 w-24">
  <img class="rounded-full" src="https://via.placeholder.com/150" alt="avatar" />
</div>
<div class="avatar h-24 w-24">
  <img class="rounded-lg" src="https://via.placeholder.com/150" alt="avatar" />
</div>`

const avatarInitialCodeToggle = ref(false)
const avatarInitialCode = `<div class="avatar h-12 w-12">
  <div class="initial dark:bg-navy-500 dark:text-navy-100 rounded-full bg-slate-200 text-base uppercase text-slate-600">
    jd
  </div>
</div>
<div class="avatar h-12 w-12">
  <div class="initial dark:bg-navy-500 dark:text-navy-100 rounded-lg bg-slate-200 text-base uppercase text-slate-600">
    jd
  </div>
</div>`
</script>
