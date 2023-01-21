<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Select</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'form' }, { name: 'select' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Select</h3>
        <component :is="Switch" v-model="checked" label="code" />
      </div>
      <p>...</p>
      <label class="block">
        <span>What type of event is it?</span>
        <select
          class="form-select focus:border-primary dark:focus:border-accent dark:border-slate-500 dark:bg-slate-700 dark:hover:border-slate-400 mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 hover:border-slate-400"
        >
          <option>Corporate event</option>
          <option>Wedding</option>
          <option>Birthday</option>
          <option>Other</option>
        </select>
      </label>

      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checked,
          'max-h-0 overflow-hidden': !checked,
        }"
      >
        <div class="text-sm p-1">html</div>
        <highlightjs autodetect :code="''" />
      </div>
    </div>

    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Select with Search</h3>
        <component :is="Switch" v-model="checked" label="code" />
      </div>
      <p>...</p>
      <div class="flex flex-col">
        <popper placement="bottom-start">
          <label class="input-group">
            <input type="text" class="form-input w-full" placeholder="Type username..." />
          </label>
          <template #content="contentProps">
            <div
              class="border-slate-100 dark:border-slate-800 dark:bg-slate-700 mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg bg-white sm:m-0 sm:w-80"
            >
              <ul class="my-2">
                <li>
                  <button
                    class="dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex items-center space-x-3.5 px-4 py-2 pr-8 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 w-full text-left"
                    @click="contentProps.close()"
                  >
                    <div>
                      <p class="dark:text-slate-100 text-slate-700 line-clamp-1">Simon Tods</p>
                      <p class="dark:text-slate-300 text-xs text-slate-500">Web Developer</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    class="dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex items-center space-x-3.5 px-4 py-2 pr-8 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 w-full text-left"
                    @click="contentProps.close()"
                  >
                    <div>
                      <p class="dark:text-slate-100 text-slate-700 line-clamp-1">Simon Tods</p>
                      <p class="dark:text-slate-300 text-xs text-slate-500">Web Developer</p>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </popper>
      </div>

      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checked,
          'max-h-0 overflow-hidden': !checked,
        }"
      >
        <div class="text-sm p-1">html</div>
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
