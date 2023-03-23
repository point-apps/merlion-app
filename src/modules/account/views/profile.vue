<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Account</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'account', path: '/account' }, { name: 'profile' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex flex-col space-y-3">
        <label class="block space-y-1">
          <span>Name</span>
          <input v-model="form.name" class="form-input" placeholder="Username" type="text" readonly />
        </label>
        <label class="block space-y-1">
          <span>Email</span>
          <input v-model="form.email" class="form-input" placeholder="Email" type="text" readonly />
        </label>
        <label class="block space-y-1">
          <span>Role</span>
          <input v-model="form.role" class="form-input" placeholder="Email" type="text" readonly />
        </label>
      </div>
    </div>

    <button class="btn btn-base bg-red-600 py-2 text-white" @click="onSignout()">Sign Out</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  name: authStore.$state.user.name,
  email: authStore.$state.user.email,
  role: authStore.$state.user.role,
})

const onSignout = () => {
  authStore.logout()
  router.push('/signin')
}
</script>
