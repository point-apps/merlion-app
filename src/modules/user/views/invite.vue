<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>User</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'user', path: '/master/user' }, { name: 'invite' }]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <h4 class="font-bold">Invite User</h4>
        <label class="block space-y-1">
          <span class="font-semibold">Name</span>
          <input v-model="form.name" class="form-input" type="text" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Email</span>
          <input v-model="form.email" class="form-input" type="email" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Role</span>
          <select class="form-input">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <div>
          <button type="submit" class="btn btn-base rounded text-slate-100 bg-blue-500 hover:bg-blue-600">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'

const form = ref({
  name: '',
  email: '',
  role: '',
})

const onSubmit = async () => {
  const response = await axios.post('/users/invite', form.value)

  if (response.status === 201) {
    form.value.name = ''
    form.value.email = ''
    form.value.role = ''
  }
}
</script>
