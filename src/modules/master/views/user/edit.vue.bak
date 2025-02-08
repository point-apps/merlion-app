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
          <span class="font-semibold">Email</span>
          <p>{{ user.email }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Name</span>
          <p>{{ user.name }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">New Password</span>
          <input v-model="form.password" class="form-input" type="password" />
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
  password: '',
})

const user = ref({
  _id: '',
  name: '',
  email: '',
  role: '',
})

onMounted(async () => {
  const result = await axios.get('/users/' + route.params.id)
  user.value = result.data
})

const onSubmit = async () => {
  try {
    await axios.patch('/users/' + route.params.id, {
      password: form.value.password,
    })
    notification('Update Success', 'success')
    router.push('/master/user')
  } catch (error) {
    notification('Update Failed', 'Please use minimum 8 digit password', 'warning')
  }
}
</script>
