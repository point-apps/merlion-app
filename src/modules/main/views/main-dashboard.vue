<template>
  <div class="flex flex-col justify-center py-5 lg:py-6 w-full">
    <div class="flex flex-col lg:flex-row items-center space-y-10 w-full">
      <img src="@/assets/logo.png" alt="Logo" />
      <div class="flex flex-col space-y-3 w-full px-8">
        <p class="text-2xl font-semibold">Hi username,</p>
        <div class="text-blue-600">
          <fa-icon icon="fa-light fa-lightbulb w-4 h-4" />
          <a href="https://www.youtube.com/c/MerlionSchool">Click here fot the guidance</a>
        </div>
        <div class="flex flex-col lg:flex-row lg:space-y-0 lg:space-x-3 space-y-3 w-full">
          <router-link to="#" class="btn btn-base btn-red w-full text-lg">Subject Monitoring</router-link>
          <router-link to="/strength-mapping/capture" class="btn btn-base btn-blue w-full text-lg"
            >Strength Mapping</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
