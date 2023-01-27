<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Institution</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'institution', path: '/master/institution' },
          { name: 'create' },
        ]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-semibold">Name</span>
          <input v-model="form.name" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.name" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <div class="flex flex-row space-x-2">
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
import { useBaseNotification } from '@/composable/notification'
import { AxiosError } from 'axios'

const { notification } = useBaseNotification()

const form = ref({
  name: '',
})
const errors = ref()

const isSubmitted = ref(false)

const onSubmit = async () => {
  try {
    isSubmitted.value = true
    errors.value = null
    const response = await axios.post('/institutions', form.value)

    if (response.status === 201) {
      form.value.name = ''
      notification('Create', 'Create data success', 'success')
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
