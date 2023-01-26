<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Master</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master' }]" />
    </div>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
      <router-link to="/master/user" class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow">
        <fa-icon icon="fa-thin fa-users w-12 h-12" />
        <span>User</span>
      </router-link>
      <router-link to="/master/cluster" class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow">
        <fa-icon icon="fa-thin fa-circle-nodes w-12 h-12" />
        <span>Cluster</span>
      </router-link>
      <router-link
        to="/master/institution"
        class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow"
      >
        <fa-icon icon="fa-thin fa-building-columns w-12 h-12" />
        <span>Institution</span>
      </router-link>
      <router-link
        to="/master/notification"
        class="flex flex-col space-y-1 text-center py-4 px-2 bg-white rounded shadow"
      >
        <fa-icon icon="fa-thin fa-envelope w-12 h-12" />
        <span>Notification</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
</script>
