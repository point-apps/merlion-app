<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Datepicker</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'template' }, { name: 'component' }, { name: 'datepicker' }]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Datepicker</h3>
        <component :is="Switch" v-model="datepickerToggle" label="code" />
      </div>
      <p>The Datepicker is used to allow the user to select a date, and to display that date in specified format.</p>
      <div>
        <component :is="Datepicker" v-model="date" />
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': datepickerToggle,
          'max-h-0 overflow-hidden': !datepickerToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="datepickerHtmlCode" />
      </div>

      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': datepickerToggle,
          'max-h-0 overflow-hidden': !datepickerToggle,
        }"
      >
        <div class="p-1 text-sm">script</div>
        <highlightjs autodetect :code="datepickerScriptCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import Switch from '@/components/switch.vue'

const date = ref()

const datepickerToggle = ref(false)
const datepickerHtmlCode = ref('<component :is="Datepicker" v-model="date" />')
const datepickerScriptCode = ref(`import Datepicker from '@/components/datepicker.vue'`)
</script>
