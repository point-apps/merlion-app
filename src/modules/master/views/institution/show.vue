<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Institution</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'institution', path: '/master/institution' },
          { name: institution.name },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex flex-col space-y-3">
        <div class="flex justify-end">
          <div class="space-x-3">
            <router-link class="btn btn-base btn-default text-xs" :to="`/master/institution/${$route.params.id}/edit`">
              Edit
            </router-link>
            <button class="btn btn-base btn-default text-xs" @click="onDelete()">Delete</button>
          </div>
        </div>
        <label class="block space-y-1">
          <span class="font-bold">Name</span>
          <p>{{ institution.name }}</p>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import { useBaseNotification } from '@/composable/notification'

const route = useRoute()
const router = useRouter()
const { notification } = useBaseNotification()

const institution = ref({
  name: '',
})

onMounted(async () => {
  const response = await axios.get('/institutions/' + route.params.id)
  institution.value.name = response.data.name
})

const isSubmitted = ref(false)
const onDelete = async () => {
  try {
    isSubmitted.value = true
    const response = await axios.delete('/institutions/' + route.params.id)

    if (response.status === 204) {
      notification('Delete', `delete ${institution.value.name} success`, 'warning')
      router.push('/master/institution')
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
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
