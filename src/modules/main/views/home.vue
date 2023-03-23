<template>
  <div class="flex w-full flex-col justify-center py-5 lg:py-6">
    <div class="flex w-full flex-col items-center space-y-10 lg:flex-row">
      <img src="@/assets/logo.png" alt="Logo" />
      <div class="flex w-full flex-col space-y-3 px-8">
        <p class="text-2xl font-semibold">Hi {{ name }},</p>
        <div class="text-blue-600">
          <fa-icon icon="fa-light fa-lightbulb w-4 h-4" />
          <a href="https://www.youtube.com/c/MerlionSchool" target="_blank">Click here for the guidance</a>
        </div>
        <div class="flex w-full flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3">
          <a href="#" class="btn btn-base btn-red w-full text-lg" @click="comingSoon()"> Subject Monitoring</a>
          <router-link to="/strength-mapping/capture" class="btn btn-base btn-blue w-full text-lg">
            Capture
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const name = authStore.$state.user.name

const comingSoon = () => {
  alert('coming soon')
}
</script>
