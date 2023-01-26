<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Account</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'account' }]" />
    </div>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
      <router-link to="/account/profile" class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow">
        <fa-icon icon="fa-thin fa-user w-12 h-12" />
        <span>Profile</span>
      </router-link>
      <router-link to="/account/security" class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow">
        <fa-icon icon="fa-thin fa-lock w-12 h-12" />
        <span>Security</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
</script>
