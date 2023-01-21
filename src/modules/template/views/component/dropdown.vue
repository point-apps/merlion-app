<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Dropdown</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'component' }, { name: 'dropdown' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <h3>Dropdown</h3>
      <p>
        Breadcrumb consist of a list of links that help a user visualize a page's location within the hierarchical
        structure of a website.
      </p>
      <div>
        <popper placement="bottom-start">
          <button class="btn px-5 py-2 bg-blue-500">Trigger element</button>
          <template #content="contentProps">
            <div class="popper-root">
              <div
                class="popper-box shadow-soft dark:shadow-soft-dark border-slate-100 dark:border-slate-800 dark:bg-slate-700 mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg bg-white sm:m-0 sm:w-80"
              >
                <h4 class="dark:text-slate-100 px-4 py-3 font-medium tracking-wide text-slate-700">
                  Only Selected People
                </h4>
                <label class="relative flex">
                  <input
                    type="text"
                    class="form-input peer !focus:border-x-0 text-sm !border-x-0 border-slate-100 dark:border-slate-600 w-full bg-transparent px-4 py-2 pl-9 placeholder:text-slate-400/70"
                    placeholder="Type username..."
                  />
                  <div
                    class="peer-focus:text-primary dark:peer-focus:text-accent dark:text-slate-300 pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400"
                  >
                    <fa-icon icon="fa-regular fa-search"></fa-icon>
                  </div>
                </label>
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
            </div>
          </template>
        </popper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'

const activeTab = ref('all')
</script>
