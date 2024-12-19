<template>
  <div class="flex size-full flex-col justify-between py-5 lg:py-6">
    <div class="flex w-full flex-col items-center space-y-10 lg:flex-row">
      <img src="@/assets/logo.png" alt="Logo" class="w-80" />
      <div class="flex w-full flex-col space-y-3 px-8">
        <div>
          <p class="text-3xl font-semibold">Hi, {{ name }}</p>
          <p>Lets Start Capturing!</p>
        </div>
        <div class="flex flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
          <router-link to="/strength-mapping/capture" class="btn btn-base btn-blue px-12 py-3 text-lg xl:px-24">
            Capture
          </router-link>
          <router-link
            to="/strength-mapping/report/spider-chart"
            class="btn btn-base bg-[#4C9F82] px-12 py-3 text-lg text-white xl:px-24"
          >
            Report
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex justify-end text-blue-600">
      <fa-icon icon="fa-light fa-lightbulb w-4 h-4" />
      <a href="https://www.youtube.com/c/MerlionSchool" target="_blank">Click here for the guidance</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const name = authStore.$state.user.name
</script>
