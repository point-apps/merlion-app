<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Input Mask</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'form' }, { name: 'input mask' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Input Mask</h3>
        <component :is="Switch" v-model="inputMaskCodeToggle" label="code" />
      </div>
      <p>
        An input mask is a string of characters that indicates the format of valid input values. We are using
        <a class="link" href="https://nosir.github.io/cleave.js/" target="_blank">cleave.js</a> for this
      </p>
      <div class="block space-y-1">
        <label>Credit Card</label>
        <input
          v-model="maskCreditCard"
          v-cleave="{ creditCard: true }"
          class="form-input"
          placeholder="**** **** **** ****"
        />
      </div>
      <div class="block space-y-1">
        <label>Date</label>
        <input
          v-model="maskDate"
          v-cleave="{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }"
          class="form-input"
          placeholder="DD-MM-YYYY"
        />
      </div>
      <div class="block space-y-1">
        <label>Numeral</label>
        <input
          v-model="maskNumeral"
          v-cleave="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }"
          class="form-input"
          placeholder="1,234,567"
        />
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': inputMaskCodeToggle,
          'max-h-0 overflow-hidden': !inputMaskCodeToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="inputMaskCode" />
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': inputMaskCodeToggle,
          'max-h-0 overflow-hidden': !inputMaskCodeToggle,
        }"
      >
        <div class="p-1 text-sm">script</div>
        <highlightjs autodetect :code="inputMaskScriptCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const inputMaskCodeToggle = ref(false)
const inputMaskCode = `<div class="block space-y-1">
  <label>Credit Card</label>
  <input
    v-model="maskCreditCard"
    v-cleave="{ creditCard: true }"
    class="form-input"
    placeholder="**** **** **** ****"
  />
</div>
<div class="block space-y-1">
  <label>Date</label>
  <input
    v-model="maskDate"
    v-cleave="{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }"
    class="form-input"
    placeholder="DD-MM-YYYY"
  />
</div>
<div class="block space-y-1">
  <label>Numeral</label>
  <input
    v-model="maskNumeral"
    v-cleave="{ numeral: true, numeralThousandsGroupStyle: 'thousand' }"
    class="form-input"
    placeholder="1,234,567"
  />
</div>`
const inputMaskScriptCode = `import { ref } from 'vue'

const maskCreditCard = ref()
const maskDate = ref()
const maskNumeral = ref()`
const maskCreditCard = ref()
const maskDate = ref()
const maskNumeral = ref()
</script>
