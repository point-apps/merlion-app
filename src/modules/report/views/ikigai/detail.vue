<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
    </div>
    <div class="card p-4 space-y-5">
      <div class="grid grid-cols-2">
        <router-link
          to="/strength-mapping/report/spider-chart"
          class="btn btn-base border-y border-l border-gray-500 hover:bg-blue-500 hover:text-white"
          >Spider Chart</router-link
        >
        <router-link to="/strength-mapping/report/ikigai" class="btn btn-base btn-blue">Ikigai</router-link>
      </div>
      <p class="font-semibold">Typologies found to be "Easy" are:</p>
      <div class="bg-gray-100 p-4 rounded">
        <ul class="mb-20">
          <li>- Serving</li>
          <li>- Reasoning</li>
        </ul>
        <hr class="py-1 my-3" />
        <p class="font-semibold italic">BE FAITHFUL IN SMALL THINGS BECAUSE IT IS IN THEM THAT YOUR STRENGTH LIES.</p>
        <p class="font-extrabold">- Mother Theresa -</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
