<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Checkbox</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'form' }, { name: 'checkbox' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Checkbox</h3>
        <component :is="Switch" v-model="checkboxCodeToggle" label="code" />
      </div>
      <p>
        Checkboxes are for selecting one or several options in a list, while radios are for selecting one option from
        many.
      </p>
      <label class="inline-flex items-center space-x-2 cursor-pointer">
        <input v-model="checked" type="checkbox" />
        <p>Default</p>
      </label>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checkboxCodeToggle,
          'max-h-0 overflow-hidden': !checkboxCodeToggle,
        }"
      >
        <div class="text-sm p-1">html</div>
        <highlightjs autodetect :code="checkboxCode" />
      </div>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checkboxCodeToggle,
          'max-h-0 overflow-hidden': !checkboxCodeToggle,
        }"
      >
        <div class="text-sm p-1">script</div>
        <highlightjs autodetect :code="checkboxScriptCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const checked = ref(false)
const checkboxCodeToggle = ref(false)
const checkboxCode = `<label class="inline-flex items-center space-x-2 cursor-pointer">
  <input v-model="checked" type="checkbox" />
  <p>Default</p>
</label>`

const checkboxScriptCode = `import { ref } from 'vue'

const checked = ref(false)`
</script>
