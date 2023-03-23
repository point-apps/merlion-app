<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Notification</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'notification', path: '/master/notification' },
          { name: 'create' },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-semibold">Schedule notification date</span>
          <div class="flex space-x-4">
            <div v-if="isLoading === false">
              <component :is="Datepicker" v-model.lazy="form.date" />
              <p v-for="(error, index) in errors?.date" :key="index" class="mt-1 text-xs text-red-500">
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
              <p v-for="(error, index) in errors?.time" :key="index" class="mt-1 text-xs text-red-500">
                {{ error }}
              </p>
            </div>
          </div>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Institution</span>
          <select v-model="form.institution_id" class="form-input">
            <option value="">Select Institution</option>
            <option v-for="(institution, index) in institutions" :key="index" :value="institution._id">
              {{ institution.name }}
            </option>
          </select>
          <p v-for="(error, index) in errors?.institution_id" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Subject</span>
          <input v-model="form.subject" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.subject" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Message</span>
          <component :is="BaseTextarea" v-model="form.message"></component>
          <p v-for="(error, index) in errors?.message" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <div class="flex flex-row space-x-2">
          <button type="submit" class="btn btn-base flex-1 rounded bg-blue-500 text-slate-100 hover:bg-blue-600">
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import BaseTextarea from '@/components/base-textarea.vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useBaseNotification } from '@/composable/notification'
import { AxiosError } from 'axios'

const textarea = ref()

const resize = () => {
  textarea.value.style.height = `${textarea.value.scrollHeight}px`
}

const { notification } = useBaseNotification()

const router = useRouter()
const form = ref({
  date: format(new Date(), 'dd-MM-yyyy'),
  time: '08:00',
  institution_id: '',
  subject: '',
  message: '',
})
const errors = ref()

const isLoading = ref(true)
onMounted(async () => {
  isLoading.value = true
  await getInstitutions()
  isLoading.value = false
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
    const response = await axios.post('/notifications', {
      ...form.value,
      date: date,
    })

    if (response.status === 201) {
      router.push('/master/notification')
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      errors.value = error.response?.data.errors
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
