<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Notification</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'master' }, { name: 'notification', path: '/master/notification' }, { name: 'create' }]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-semibold">Schedule notification date</span>
          <input class="form-input" type="text" value="23-01-2023 16:00" />
          <!-- <component :is="Datepicker" v-model="form.date" /> -->
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Institution</span>
          <select class="form-input">
            <option value="">Select Institution</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Subject</span>
          <input v-model="form.activity" class="form-input" type="text" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Message</span>
          <textarea v-model="form.activity" rows="5" class="form-input" type="text" />
        </label>
        <div class="flex flex-row space-x-2">
          <button type="submit" class="btn btn-base rounded flex-1 text-slate-100 bg-blue-500 hover:bg-blue-600">
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'
// import { useApi as useRoleApi, type RoleInterface } from '@/modules/role/composable/api'
// import SelectRole from '@/modules/user/components/select-role.vue'

// const roleApi = useRoleApi()

const router = useRouter()
const isShowSelect = ref(false)
const form = ref({
  date: '21 Jan 2023',
  email: '',
  password: '',
  fullName: '',
  role: '',
})

const roles = ref<RoleInterface[]>([])
const isLoadingRoles = ref(false)

onMounted(async () => {
  isLoadingRoles.value = true
  const result = await readAllRole()
  // roles.value = result.roles
  isLoadingRoles.value = false
})

const onSubmit = async () => {
  await axios.post('/user', form.value)
  router.push('/master/user')
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
