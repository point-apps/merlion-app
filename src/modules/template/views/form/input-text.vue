<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Input Text</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'form' }, { name: 'input text' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Basic Input Text</h3>
        <component :is="Switch" v-model="showBasicInputTextCode" label="code" />
      </div>
      <p>
        The input element with a type attribute whose value is "text" represents a one-line plain text edit control for
        the input element’s value.
      </p>
      <label class="block">
        <input class="form-input" placeholder="Username" type="text" />
      </label>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': showBasicInputTextCode,
          'max-h-0 overflow-hidden': !showBasicInputTextCode,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="basicInputTextCode" />
      </div>
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Basic Input Text</h3>
        <component :is="Switch" v-model="showLabeledInputTextCode" label="code" />
      </div>
      <p>
        The input element with a type attribute whose value is "text" represents a one-line plain text edit control for
        the input element’s value.
      </p>
      <label class="block space-y-1">
        <span>Username:</span>
        <input class="form-input" placeholder="Username" type="text" />
      </label>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': showLabeledInputTextCode,
          'max-h-0 overflow-hidden': !showLabeledInputTextCode,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="labeledInputTextCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const showBasicInputTextCode = ref(false)
const basicInputTextCode = `<input class="form-input" placeholder="Username" type="text" />`

const showLabeledInputTextCode = ref(false)
const labeledInputTextCode = `<label class="block space-y-1">
  <span>Username:</span>
  <input class="form-input" placeholder="Username" type="text" />
</label>`
</script>
