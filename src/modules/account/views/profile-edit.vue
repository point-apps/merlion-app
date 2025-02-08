<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Account</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'account', path: '/account' }, { name: 'profile' }]" />
    </div>
    <div class="card space-y-5 p-4">
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
          <input v-model="form.name" class="form-input" placeholder="Username" type="text" />
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
      </div>
    </div>

    <button class="btn btn-base bg-blue-600 py-2 text-white" @click="onUpdate()">Update</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useBaseNotification } from '@/composable/notification'
import axios from '@/axios'

const { notification } = useBaseNotification()
const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  _id: authStore.$state.user._id,
  username: authStore.$state.user.username,
  name: authStore.$state.user.name,
  email: authStore.$state.user.email,
  role: authStore.$state.user.role,
  status: authStore.$state.user.status,
})

const onUpdate = async () => {
  try {
    await axios.patch('/users/' + form.value._id, {
      name: form.value.name,
      role: form.value.role,
    })
    authStore.$state.user.name = form.value.name
    notification('Update Success', 'success')
    router.push('/account/profile')
  } catch (error) {
    notification('Update Failed', 'error')
  }
}
</script>
