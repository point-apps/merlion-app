<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Account</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'account', path: '/account' }, { name: 'profile' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-end">
        <div class="space-x-3">
          <router-link class="btn btn-base btn-default text-xs" :to="`/account/profile/${form._id}/edit`">
            Edit
          </router-link>
        </div>
      </div>
      <div class="flex flex-col space-y-3">
        <label class="block space-y-1">
          <span>Username</span>
          <input
            v-model="form.username"
            class="form-input bg-slate-100 dark:bg-slate-700"
            placeholder="Username"
            type="text"
            readonly
          />
        </label>
        <label class="block space-y-1">
          <span>Full Name</span>
          <input
            v-model="form.name"
            class="form-input bg-slate-100 dark:bg-slate-700"
            placeholder="Username"
            type="text"
            readonly
          />
        </label>
        <label class="block space-y-1">
          <span>Email</span>
          <input
            v-model="form.email"
            class="form-input bg-slate-100 dark:bg-slate-700"
            placeholder="Email"
            type="text"
            readonly
          />
        </label>
        <label class="block space-y-1">
          <span>Role</span>
          <input
            v-model="form.role"
            class="form-input bg-slate-100 dark:bg-slate-700"
            placeholder="Email"
            type="text"
            readonly
          />
        </label>
        <label class="block space-y-1">
          <span>Status</span>
          <input
            v-model="form.status"
            class="form-input bg-slate-100 dark:bg-slate-700"
            placeholder="Email"
            type="text"
            readonly
          />
        </label>
        <label class="block space-y-1">
          <span>Account join</span>
          <input
            v-model="form.createdAt"
            class="form-input bg-slate-100 dark:bg-slate-700"
            placeholder="-"
            type="text"
            readonly
          />
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
import { format } from 'date-fns'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  _id: authStore.$state.user._id,
  username: authStore.$state.user.username,
  name: authStore.$state.user.name,
  email: authStore.$state.user.email,
  role: authStore.$state.user.role,
  status: authStore.$state.user.status,
  createdAt: authStore.$state.user.createdAt ? format(new Date(authStore.$state.user.createdAt), 'dd MMM yyyy') : '',
})

const onSignout = () => {
  authStore.logout()
  router.push('/signin')
}
</script>
