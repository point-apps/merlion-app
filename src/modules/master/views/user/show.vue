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
            <button class="btn btn-base btn-default text-xs">Delete</button>
          </div>
        </div>
        <label class="block space-y-1">
          <span>Name</span>
          <input v-model="user.name" class="form-input" type="text" readonly />
        </label>

        <label class="block space-y-1">
          <span>Email:</span>
          <input v-model="user.email" class="form-input" type="text" readonly />
        </label>
        <label class="block space-y-1">
          <span>Role</span>
          <input v-model="user.role" class="form-input" type="text" readonly />
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

const route = useRoute()

const user = ref({
  name: '',
  email: '',
  role: '',
})

onMounted(async () => {
  const result = await axios.get('/users/' + route.params.id)
  console.log(result)
  user.value.name = result.data.name
  user.value.email = result.data.email
  user.value.role = result.data.role
})
</script>
