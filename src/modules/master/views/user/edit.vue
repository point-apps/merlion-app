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
          <input v-model="form.name" class="form-input" type="text" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Role</span>
          <select class="form-input">
            <option :selected="user.role === 'user'" value="student">User</option>
            <option :selected="user.role === 'admin'" value="admin">Admin</option>
          </select>
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
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  name: '',
  role: '',
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

  form.value.name = result.data.name
  form.value.role = result.data.role
})

const onSubmit = async () => {
  await axios.patch('/users/' + route.params.id, {
    name: form.value.name,
    role: form.value.role,
  })
}

const onSubmitPassword = () => {}
</script>
