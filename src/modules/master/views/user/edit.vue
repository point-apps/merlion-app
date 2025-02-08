<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>User</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'user', path: '/master/user' },
          { name: user.name, path: '/master/user/' + user._id },
          { name: 'edit' },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-3" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span>Username</span>
          <input v-model="user.username" class="form-input bg-slate-100 dark:bg-slate-700" type="text" readonly />
        </label>
        <label class="block space-y-1">
          <span>Full Name</span>
          <input v-model="form.name" class="form-input" type="text" />
        </label>

        <label class="block space-y-1">
          <span>Email:</span>
          <input v-model="user.email" class="form-input bg-slate-100 dark:bg-slate-700" type="text" readonly />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Role</span>
          <select v-model="form.role" class="form-input">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <p v-for="(error, index) in errors?.role" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span>Status Account</span>
          <input v-model="user.status" class="form-input bg-slate-100 dark:bg-slate-700" type="text" readonly />
        </label>

        <div>
          <button type="submit" class="btn btn-base bg-blue-500 text-slate-100 hover:bg-blue-600">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { useBaseNotification } from '@/composable/notification'
const { notification } = useBaseNotification()
const route = useRoute()
const router = useRouter()

const form = ref({
  _id: '',
  name: '',
  role: '',
})

const user = ref({
  _id: '',
  name: '',
  role: '',
})

onMounted(async () => {
  const result = await axios.get('/users/' + route.params.id)
  user.value = result.data
  form.value = result.data
})

const onSubmit = async () => {
  try {
    await axios.patch('/users/' + route.params.id, {
      name: form.value.name,
      role: form.value.role,
    })
    notification('Update Success', 'success')
    router.push('/master/user/' + route.params.id)
  } catch (error) {
    notification('Update Failed', 'Please use minimum 8 digit password', 'warning')
  }
}
</script>
