<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>User</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'user', path: '/master/user' }, { name: 'invite' }]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <h4 class="font-bold">Invite User</h4>
        <label class="block space-y-1">
          <span class="font-semibold">Name</span>
          <input v-model="form.name" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.name" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Email</span>
          <input v-model="form.email" class="form-input" type="email" />
          <p v-for="(error, index) in errors?.email" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
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
        <div>
          <button type="submit" class="btn btn-base rounded bg-blue-500 text-slate-100 hover:bg-blue-600">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'
import Breadcrumb from '@/components/breadcrumb.vue'
import { useBaseNotification } from '@/composable/notification'

const router = useRouter()
const { notification } = useBaseNotification()

const form = ref({
  name: '',
  email: '',
  role: 'user',
})

const errors = ref()

const isSubmitted = ref(false)

const onSubmit = async () => {
  try {
    isSubmitted.value = true
    const response = await axios.post('/users', form.value)

    if (response.status === 201) {
      form.value.name = ''
      form.value.email = ''
      form.value.role = ''
      router.push('/master/user')
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      errors.value = error.response?.data.errors
      notification(error.response?.statusText, error.response?.data.message, 'warning')
    } else if (error instanceof AxiosError) {
      notification(error.code as string, error.message, 'warning')
    } else {
      notification('Unknown Error', '', 'warning')
    }
  } finally {
    isSubmitted.value = false
  }
}
</script>
