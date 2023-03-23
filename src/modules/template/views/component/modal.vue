<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Accordion</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'component' }, { name: 'modal' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h3>Modal</h3>
        <component :is="Switch" v-model="checked" label="code" />
      </div>
      <p>
        Breadcrumb consist of a list of links that help a user visualize a page's location within the hierarchical
        structure of a website.
      </p>
      <div>
        <div>
          <button
            class="btn btn-base bg-slate-100 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-slate-500 dark:text-slate-50 dark:hover:bg-slate-500 dark:focus:bg-slate-500 dark:active:bg-slate-500/90"
            @click="showModal = true"
          >
            Basic Modal
          </button>
          <component :is="Modal" :is-open="showModal" @on-close="showModal = false">
            <template #content>
              <div class="mt-4">
                <h2 class="text-2xl text-slate-700 dark:text-slate-100">Success Message</h2>
                <p class="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dignissimos soluta totam?
                </p>
                <button
                  class="btn bg-success hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90 mt-6 font-medium text-white"
                  @click="showModal = false"
                >
                  Close
                </button>
              </div>
            </template>
          </component>
        </div>
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checked,
          'max-h-0 overflow-hidden': !checked,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="modalCode" />
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checked,
          'max-h-0 overflow-hidden': !checked,
        }"
      >
        <div class="p-1 text-sm">script</div>
        <highlightjs autodetect :code="modalScriptCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Modal from '@/components/modal.vue'
import Switch from '@/components/switch.vue'

const checked = ref(false)
const showModal = ref(false)
const modalCode = `<button
  class="btn btn-base dark:bg-slate-500 dark:text-slate-50 dark:hover:bg-slate-500 dark:focus:bg-slate-500 dark:active:bg-slate-500/90 bg-slate-100 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80"
  @click="showModal = true"
>
  Basic Modal
</button>
<component :is="Modal" :is-open="showModal" @on-close="showModal = false">
  <template #content>
    <div class="mt-4">
      <h2 class="dark:text-slate-100 text-2xl text-slate-700">Success Message</h2>
      <p class="mt-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dignissimos soluta totam?
      </p>
      <button
        class="btn bg-success hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90 mt-6 font-medium text-white"
        @click="showModal = false"
      >
        Close
      </button>
    </div>
  </template>
</component>`
const modalScriptCode = `import { ref } from 'vue'
import Modal from '@/components/modal.vue'

const showModal = ref(false)
`
</script>
