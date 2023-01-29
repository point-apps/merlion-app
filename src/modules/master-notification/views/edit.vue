<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Notification</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: 'master' },
          { name: 'notification', path: '/master/notification' },
          { name: notificationData.subject, path: '/master/notification/' + route.params.id },
          { name: 'edit' },
        ]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-semibold">Schedule notification date</span>
          <div class="flex space-x-4">
            <div>
              <component :is="Datepicker" v-model.lazy="form.date" />
              <p v-for="(error, index) in errors?.date" :key="index" class="text-red-500 mt-1 text-xs">
                {{ error }}
              </p>
            </div>
            <div>
              <input
                v-model.lazy="form.time"
                v-cleave="{ time: true, timePattern: ['h', 'm'] }"
                type="text"
                class="form-input"
                placeholder="00:00"
              />
              <p v-for="(error, index) in errors?.time" :key="index" class="text-red-500 mt-1 text-xs">
                {{ error }}
              </p>
            </div>
          </div>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Institution</span>
          <select v-model="form.institution_id" class="form-input">
            <option value="">Select Institution</option>
            <option
              v-for="(institution, index) in institutions"
              :key="index"
              :selected="institution._id === form.institution_id"
              :value="institution._id"
            >
              {{ institution.name }}
            </option>
          </select>
          <p v-for="(error, index) in errors?.institution_id" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Subject</span>
          <input v-model="form.subject" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.subject" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Message</span>
          <component :is="BaseTextarea" v-model="form.message"></component>
          <p v-for="(error, index) in errors?.message" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
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
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import BaseTextarea from '@/components/base-textarea.vue'
import axios from '@/axios'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import { AxiosError } from 'axios'
import { useBaseNotification } from '@/composable/notification'
import router from '@/router'

const { notification } = useBaseNotification()

const route = useRoute()

const form = ref({
  subject: '',
  message: '',
  date: '',
  time: '',
  institution_id: '',
})
const errors = ref()
const notificationData = ref({
  subject: '',
  message: '',
  date: '',
})

onMounted(async () => {
  const result = await axios.get('/notifications/' + route.params.id)
  form.value.subject = result.data.subject
  form.value.message = result.data.message
  form.value.institution_id = result.data.institution_id
  form.value.date = format(new Date(result.data.date), 'dd-MM-yyyy')
  form.value.time = format(new Date(result.data.date), 'HH:mm')

  notificationData.value.subject = result.data.subject
  notificationData.value.message = result.data.message
  notificationData.value.date = result.data.date

  await getInstitutions()
})

const onSubmit = async () => {
  try {
    const inputDate = form.value.date.split('-')
    const inputTime = form.value.time.split(':')
    const date = new Date()
    date.setFullYear(Number(inputDate[2]))
    date.setMonth(Number(inputDate[1]) - 1) // month start from 0 (january)
    date.setDate(Number(inputDate[0]))
    date.setHours(Number(inputTime[0].substring(0, 2)))
    date.setMinutes(Number(inputTime[1].substring(0, 2)))
    date.setSeconds(0)
    date.setMilliseconds(0)
    const response = await axios.patch('/notifications/' + route.params.id, {
      ...form.value,
      date: date,
    })

    if (response.status === 204) {
      router.push('/master/notification/' + route.params.id)
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
  }
}

// Institution List
const institutions = ref([])
const getInstitutions = async () => {
  const result = await axios.get('/institutions', {
    params: {
      limit: 100,
      page: 1,
      sort: 'name',
    },
  })
  institutions.value = result.data.data
}
</script>
