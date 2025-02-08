<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>User</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'user', path: '/master/user' },
          { name: user.name },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex flex-col space-y-3">
        <div class="flex justify-end">
          <div class="space-x-3">
            <router-link class="btn btn-base btn-default text-xs" :to="`/master/user/${$route.params.id}/edit`">
              Edit
            </router-link>
          </div>
        </div>
        <label class="block space-y-1">
          <span class="font-bold">Username</span>
          <div>{{ user.username }}</div>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Name</span>
          <div>{{ user.name }}</div>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">email</span>
          <div>{{ user.email }}</div>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Role</span>
          <div>{{ user.role }}</div>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Status Account</span>
          <div>{{ user.status ?? 'active' }}</div>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Account join</span>
          <div>{{ user.createdAt ? format(new Date(user.createdAt), 'dd MMM yyyy') : '-' }}</div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'

const route = useRoute()

const user = ref({
  username: '',
  name: '',
  email: '',
  role: '',
  status: '',
  createdAt: '',
})

onMounted(async () => {
  const result = await axios.get('/users/' + route.params.id)
  console.log(result)
  user.value.username = result.data.username
  user.value.name = result.data.name
  user.value.email = result.data.email
  user.value.role = result.data.role
  user.value.status = result.data.status
  user.value.createdAt = result.data.createdAt
})
</script>
