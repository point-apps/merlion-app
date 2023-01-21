<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Button</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'element' }, { name: 'button' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Button</h3>
        <component :is="Switch" v-model="buttonCodeToggle" label="code" />
      </div>
      <p>
        Use Button component for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
      </p>
      <div class="flex flex-wrap gap-3">
        <button
          class="btn btn-base bg-slate-150 dark:bg-slate-500 dark:text-slate-50 dark:hover:bg-slate-500 dark:focus:bg-slate-500 dark:active:bg-slate-500/90 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80"
        >
          Button
        </button>
        <button class="btn btn-base btn-blue font-medium">Button</button>
      </div>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': buttonCodeToggle,
          'max-h-0 overflow-hidden': !buttonCodeToggle,
        }"
      >
        <div class="text-sm p-1">html</div>
        <highlightjs autodetect :code="buttonCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const buttonCodeToggle = ref(false)
const buttonCode = `<button class="btn btn-base bg-slate-150 dark:bg-slate-500 dark:text-slate-50 dark:hover:bg-slate-500 dark:focus:bg-slate-500 dark:active:bg-slate-500/90 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80">
  Button
</button>
`
</script>
