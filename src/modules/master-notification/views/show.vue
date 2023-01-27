<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Notification</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'notification', path: '/master/notification' },
          { name: notification.subject },
        ]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex flex-col space-y-3">
        <div class="flex justify-end">
          <div class="space-x-3">
            <router-link class="btn btn-base btn-default text-xs" :to="`/master/notification/${$route.params.id}/edit`">
              Edit
            </router-link>
            <button class="btn btn-base btn-default text-xs" @click="onDelete()">Delete</button>
          </div>
        </div>
        <label class="block space-y-1">
          <span class="font-bold">Date</span>
          <p>{{ notification.date }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Subject</span>
          <p>{{ notification.subject }}</p>
        </label>
        <label class="space-y-1 flex flex-col">
          <span class="font-bold">Message</span>
          <textarea rows="10" class="outline-none bg-transparent" :value="notification.message" readonly></textarea>
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
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()

const notification = ref({
  date: '',
  subject: '',
  message: '',
})

onMounted(async () => {
  const result = await axios.get('/notifications/' + route.params.id)
  notification.value.subject = result.data.subject
  notification.value.message = result.data.message
  notification.value.date = format(new Date(result.data.date), 'dd MMM yyyy HH:mm')
})

const onDelete = async () => {
  const result = await axios.delete('/notifications/' + route.params.id)
  if (result.status === 204) {
    router.push('/master/notification')
  }
}
</script>
