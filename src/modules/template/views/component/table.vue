<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Table</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'Template' }, { name: 'Component' }, { name: 'Table' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Basic Table</h3>
        <component :is="Switch" v-model="basicTableCodeToggle" label="code" />
      </div>
      <p>Tables display information in a way that's easy to scan, so that users can look for patterns and insights.</p>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head">#</th>
              <th class="basic-table-head">Name</th>
              <th class="basic-table-head">Job</th>
              <th class="basic-table-head">Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr class="basic-table-row">
              <td class="basic-table-body">1</td>
              <td class="basic-table-body">Cy Ganderton</td>
              <td class="basic-table-body">Quality Control Specialist</td>
              <td class="basic-table-body">Blue</td>
            </tr>
            <tr class="basic-table-row">
              <td class="basic-table-body">2</td>
              <td class="basic-table-body">Hart Hagerty</td>
              <td class="basic-table-body">Desktop Support Technician</td>
              <td class="basic-table-body">Purple</td>
            </tr>
            <tr class="basic-table-row">
              <td class="basic-table-body">3</td>
              <td class="basic-table-body">Brice Swyre</td>
              <td class="basic-table-body">Tax Accountant</td>
              <td class="basic-table-body">Red</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': basicTableCodeToggle,
          'max-h-0 overflow-hidden': !basicTableCodeToggle,
        }"
      >
        <div class="text-sm p-1">html</div>
        <highlightjs autodetect :code="basicTableCode" />
      </div>
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Bordered Table</h3>
        <component :is="Switch" v-model="borderedTableCodeToggle" label="code" />
      </div>
      <p>Tables display information in a way that's easy to scan, so that users can look for patterns and insights.</p>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="bordered-table-head">#</th>
              <th class="bordered-table-head">Name</th>
              <th class="bordered-table-head">Job</th>
              <th class="bordered-table-head">Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bordered-table-body">1</td>
              <td class="bordered-table-body">Cy Ganderton</td>
              <td class="bordered-table-body">Quality Control Specialist</td>
              <td class="bordered-table-body">Blue</td>
            </tr>
            <tr>
              <td class="bordered-table-body">2</td>
              <td class="bordered-table-body">Hart Hagerty</td>
              <td class="bordered-table-body">Desktop Support Technician</td>
              <td class="bordered-table-body">Purple</td>
            </tr>
            <tr>
              <td class="bordered-table-body">3</td>
              <td class="bordered-table-body">Brice Swyre</td>
              <td class="bordered-table-body">Tax Accountant</td>
              <td class="bordered-table-body">Red</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="card bg-slate-800 dark:bg-slate-700 px-2 text-white transition-all transform-gpu"
        :class="{
          'max-h-[1000px] overflow-auto py-2': borderedTableCodeToggle,
          'max-h-0 overflow-hidden': !borderedTableCodeToggle,
        }"
      >
        <div class="text-sm p-1">html</div>
        <highlightjs autodetect :code="borderedTableCode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Switch from '@/components/switch.vue'

const basicTableCodeToggle = ref(false)
const basicTableCode = `<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th class="basic-table-head">#</th>
        <th class="basic-table-head">Name</th>
        <th class="basic-table-head">Job</th>
        <th class="basic-table-head">Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="basic-table-body">1</td>
        <td class="basic-table-body">Cy Ganderton</td>
        <td class="basic-table-body">Quality Control Specialist</td>
        <td class="basic-table-body">Blue</td>
      </tr>
      <tr>
        <td class="basic-table-body">2</td>
        <td class="basic-table-body">Hart Hagerty</td>
        <td class="basic-table-body">Desktop Support Technician</td>
        <td class="basic-table-body">Purple</td>
      </tr>
      <tr>
        <td class="basic-table-body">3</td>
        <td class="basic-table-body">Brice Swyre</td>
        <td class="basic-table-body">Tax Accountant</td>
        <td class="basic-table-body">Red</td>
      </tr>
    </tbody>
  </table>
</div>`

const borderedTableCodeToggle = ref(false)
const borderedTableCode = `<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th class="bordered-table-head">#</th>
        <th class="bordered-table-head">Name</th>
        <th class="bordered-table-head">Job</th>
        <th class="bordered-table-head">Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="bordered-table-body">1</td>
        <td class="bordered-table-body">Cy Ganderton</td>
        <td class="bordered-table-body">Quality Control Specialist</td>
        <td class="bordered-table-body">Blue</td>
      </tr>
      <tr>
        <td class="bordered-table-body">2</td>
        <td class="bordered-table-body">Hart Hagerty</td>
        <td class="bordered-table-body">Desktop Support Technician</td>
        <td class="bordered-table-body">Purple</td>
      </tr>
      <tr>
        <td class="bordered-table-body">3</td>
        <td class="bordered-table-body">Brice Swyre</td>
        <td class="bordered-table-body">Tax Accountant</td>
        <td class="bordered-table-body">Red</td>
      </tr>
    </tbody>
  </table>
</div>`
</script>
