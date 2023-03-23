<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Institution</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'institution', path: '/master/institution' },
          { name: institution.name, path: '/master/institution/' + route.params.id },
          { name: 'edit' },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-3" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span>Name</span>
          <input v-model="form.name" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.name" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
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
import { AxiosError } from 'axios'

const { notification } = useBaseNotification()

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '',
})

const institution = ref({
  name: '',
})

const errors = ref()

onMounted(async () => {
  const response = await axios.get('/institutions/' + route.params.id)
  institution.value.name = response.data.name

  form.value.name = response.data.name
})

const isSubmitted = ref(false)
const onSubmit = async () => {
  try {
    const response = await axios.patch('/institutions/' + route.params.id, {
      name: form.value.name,
    })

    if (response.status === 204) {
      notification('Update', 'Update data success', 'success')
      router.push('/master/institution/' + route.params.id)
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
