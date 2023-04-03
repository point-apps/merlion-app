<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Account</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'account', path: '/account' }, { name: 'security' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <h4 class="font-bold">Update Password</h4>
        <label class="block space-y-1">
          <span class="font-semibold">Current Password</span>
          <input v-model="form.currentPassword" class="form-input" type="password" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">New Password</span>
          <input v-model="form.newPassword" class="form-input" type="password" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Confirm Password</span>
          <input v-model="form.confirmPassword" class="form-input" type="password" />
        </label>
        <div>
          <button type="submit" class="btn btn-base rounded bg-blue-500 text-slate-100 hover:bg-blue-600">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'
// import { useApi as useRoleApi, type RoleInterface } from '@/modules/role/composable/api'
// import SelectRole from '@/modules/user/components/select-role.vue'

// const roleApi = useRoleApi()

const router = useRouter()
const isShowSelect = ref(false)
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const isLoadingRoles = ref(false)

onMounted(async () => {
  isLoadingRoles.value = true
  isLoadingRoles.value = false
})

const onSubmit = async () => {
  try {
    if (!isNewPasswordConfirmed(form.value.newPassword, form.value.confirmPassword)) {
      alert("password doesn't match")
      return
    }

    if (form.value.newPassword.length < 8) {
      alert('Password should have 8 digit or more')
      return
    }

    const response = await axios.post('/users/update-password', form.value)

    if (response.status === 204) {
      form.value.newPassword = ''
      form.value.confirmPassword = ''
      form.value.currentPassword = ''
      alert('Update password success')
    }
  } catch (error) {
    alert(error?.response?.data?.errors?.password)
  }
}

const isNewPasswordConfirmed = (newPassword: string, confirmPassword: string) => {
  return newPassword === confirmPassword
}

const latestSelectedRole = ref()

// const onBlurSelectRole = () => {
//   if (!roles.value.some((el) => el.name === form.value.role)) {
//     form.value.role = latestSelectedRole.value
//   }
//   isShowSelect.value = false
// }

const choose = (text: string) => {
  if (roles.value.some((el) => el.name === text)) {
    latestSelectedRole.value = text
    form.value.role = text
  } else {
    form.value.role = ''
  }
  isShowSelect.value = false
}

const readAllRole = async () => {
  // return await roleApi.readAll(1, 10, form.value.role)
}

// watchDebounced(
//   form.value,
//   async () => {
//     const result = await readAllRole()
//     roles.value = result.roles
//   },
//   { debounce: 500, maxWait: 1000 }
// )
</script>
