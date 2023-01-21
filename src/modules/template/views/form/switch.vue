<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Form Switch</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'Template' }, { name: 'Form' }, { name: 'Switch' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Basic Switch</h3>
        <component :is="Switch" v-model="isShowBasicSwitchSourceCode" label="code" />
      </div>
      <p class="flex">
        Code The Switch component is used as an alternative for the checkbox. The option that the switch controls, as
        well as the state it's in, should be made clear from the corresponding inline label.
      </p>
      <div class="flex flex-wrap gap-5">
        <component :is="Switch" v-model="checked" label="Check" />
      </div>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': isShowBasicSwitchSourceCode,
          'max-h-0 overflow-hidden': !isShowBasicSwitchSourceCode,
        }"
      >
        <div class="text-sm p-1">html</div>
        <highlightjs autodetect :code="basicSwitchHtmlCode" />
      </div>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': isShowBasicSwitchSourceCode,
          'max-h-0 overflow-hidden': !isShowBasicSwitchSourceCode,
        }"
      >
        <div class="text-sm p-1">script</div>
        <highlightjs autodetect :code="basicSwitchScriptCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const checked = ref(false)

const isShowBasicSwitchSourceCode = ref(false)
const basicSwitchHtmlCode = `<component :is="Switch" v-model="checked" label="Check" />`
const basicSwitchScriptCode = `import { ref } from 'vue'
import Switch from '@/components/switch.vue'

const checked = ref(false)
`
</script>
