<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Input Group</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'template' }, { name: 'form' }, { name: 'input-group' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h5 class="font-semibold">Input Addon</h5>
        <component :is="Switch" v-model="inputGroupCodeToggle" label="code" />
      </div>
      <p>
        Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom
        selects, and custom file inputs.
      </p>
      <div class="space-y-1">
        <span>Prepend Addon:</span>
        <label class="input-group">
          <div class="prepend-input">
            <span>@</span>
          </div>
          <input class="form-input rounded-r-lg" placeholder="Username" type="text" />
        </label>
      </div>
      <div class="space-y-1">
        <span>Append Addon:</span>
        <label class="input-group">
          <input class="form-input rounded-l-lg" placeholder="Username" type="text" />
          <div class="append-input">
            <span>@site.com</span>
          </div>
        </label>
      </div>
      <div class="space-y-1">
        <span>Between input:</span>
        <label class="input-group">
          <div class="prepend-input">
            <span>$</span>
          </div>
          <input class="form-input" placeholder="Enter Price" type="text" />
          <div class="append-input">
            <span>.00</span>
          </div>
        </label>
      </div>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[10000px] overflow-auto py-2': inputGroupCodeToggle,
          'max-h-0 overflow-hidden': !inputGroupCodeToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="inputGroupCode" />
      </div>
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-between">
        <h5 class="font-semibold">Input Addon</h5>
        <component :is="Switch" v-model="inputGroupCodeToggle" label="code" />
      </div>
      <p>
        Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom
        selects, and custom file inputs.
      </p>
      <div class="space-y-4">
        <label class="relative flex">
          <input
            class="form-input focus:border-primary dark:focus:border-accent peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 dark:border-slate-500 dark:hover:border-slate-400"
            placeholder="Search here..."
            type="text"
          />
          <div
            class="peer-focus:text-primary dark:peer-focus:text-accent pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
          >
            <fa-icon icon="fa-regular fa-search"></fa-icon>
          </div>
        </label>
        <label class="relative flex">
          <input
            class="form-input focus:border-primary dark:focus:border-accent peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pr-9 placeholder:text-slate-400/70 hover:border-slate-400 dark:border-slate-500 dark:hover:border-slate-400"
            placeholder="Password"
            type="text"
          />
          <div
            class="peer-focus:text-primary dark:peer-focus:text-accent pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
          >
            <fa-icon icon="fa-regular fa-eye"></fa-icon>
          </div>
        </label>
        <label class="relative flex">
          <input
            class="form-input focus:border-primary dark:focus:border-accent peer w-full rounded-lg border border-slate-300 bg-transparent px-9 py-2 placeholder:text-slate-400/70 hover:border-slate-400 dark:border-slate-500 dark:hover:border-slate-400"
            placeholder="Search here..."
            type="text"
          />
          <div
            class="peer-focus:text-primary dark:peer-focus:text-accent pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
          >
            <fa-icon icon="fa-regular fa-search"></fa-icon>
          </div>
          <div
            class="peer-focus:text-primary dark:peer-focus:text-accent pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
          >
            <div
              class="border-slate-150 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400 dark:border-slate-500 dark:border-r-slate-300"
            ></div>
          </div>
        </label>
      </div>

      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[100000px] overflow-auto py-2': inputGroupCodeToggle,
          'max-h-0 overflow-hidden': !inputGroupCodeToggle,
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="inputGroupCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const inputGroupCodeToggle = ref(false)
const inputGroupCode = `<div class="space-y-1">
  <span>Prepend Addon:</span>
  <label class="input-group">
    <div class="prepend-input">
      <span>@</span>
    </div>
    <input class="form-input rounded-r-lg" placeholder="Username" type="text" />
  </label>
</div>
<div class="space-y-1">
  <span>Append Addon:</span>
  <label class="input-group">
    <input class="form-input rounded-l-lg" placeholder="Username" type="text" />
    <div class="append-input">
      <span>@site.com</span>
    </div>
  </label>
</div>
<div class="space-y-1">
  <span>Between input:</span>
  <label class="input-group">
    <div class="prepend-input">
      <span>$</span>
    </div>
    <input class="form-input" placeholder="Enter Price" type="text" />
    <div class="append-input">
      <span>.00</span>
    </div>
  </label>
</div>`
</script>
