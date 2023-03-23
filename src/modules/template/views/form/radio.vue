<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Radio</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'form' }, { name: 'radio' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Radio</h3>
        <component :is="Switch" v-model="checked" label="code" />
      </div>
      <p>...</p>
      <div>
        <label class="inline-flex items-center space-x-2">
          <input
            checked
            class="form-radio is-basic h-5 w-5 rounded-full border-slate-400/70 checked:border-slate-500 checked:bg-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-slate-400 dark:checked:bg-slate-400"
            name="basic"
            type="radio"
          />
          <p>Default</p>
        </label>
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checked,
          'max-h-0 overflow-hidden': !checked,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="''" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const checked = ref(false)
</script>
