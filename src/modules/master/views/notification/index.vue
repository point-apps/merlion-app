<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Notification</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'notification' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div>
        <div class="space-y-1">
          <label class="input-group relative">
            <router-link to="/master/notification/create" class="prepend-input">
              <fa-icon icon="fa-solid fa-plus"></fa-icon>
            </router-link>
            <input v-model="searchText" class="form-input rounded-r-lg" placeholder="Search" type="text" />
            <div
              v-if="isLoadingSearch"
              class="pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
            >
              <div
                class="border-slate-150 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400 dark:border-slate-500 dark:border-r-slate-300"
              ></div>
            </div>
          </label>
        </div>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head w-1">Send&nbsp;Date</th>
              <th class="basic-table-head w-1">Institution</th>
              <th class="basic-table-head">Subject</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(notification, index) in notifications" :key="notification._id" class="basic-table-row">
              <td class="basic-table-body whitespace-nowrap">
                {{ format(new Date(notification.date), 'dd MMM yyyy HH:mm') }}
              </td>
              <td class="basic-table-body whitespace-nowrap">{{ notification.institution?.name }}</td>
              <td class="basic-table-body">
                <router-link :to="`/master/notification/${notification._id}`" class="text-blue-500 hover:text-blue-600">
                  {{ notification.subject }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="pagination.pageCount > 1" class="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="i in pagination.pageCount"
            :key="i"
            class="btn btn-base border border-slate-800/20 dark:text-slate-100"
            :class="{ 'bg-blue-500 text-slate-100': i === currentPage }"
            @click="onClickPage(i)"
          >
            {{ i }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { watchDebounced } from '@vueuse/core'
import { format } from 'date-fns'

interface NotificationInterface {
  _id: string
  date: Date
  subject: string
  message: string
}

const notifications = ref<NotificationInterface[]>([])
const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 0,
  totalDocument: 0,
})
const isLoadingSearch = ref(false)
const searchText = ref('')
const currentPage = ref(1)
const pageLimit = 10

const getNotifications = async (page = 1) => {
  const result = await axios.get('/notifications', {
    params: {
      pageSize: pageLimit,
      page: page,
      sort: 'date-',
      search: {
        institution: searchText.value,
        subject: searchText.value,
      },
    },
  })
  notifications.value = result.data.data
  pagination.value = {
    page: result.data.pagination.page,
    totalDocument: result.data.pagination.totalDocument,
    pageCount: result.data.pagination.pageCount,
    pageSize: result.data.pagination.pageSize,
  }
}

const onClickPage = async (page: number) => {
  currentPage.value = page
  await getNotifications(page)
}

watch(searchText, () => {
  isLoadingSearch.value = true
})

watchDebounced(
  searchText,
  async () => {
    currentPage.value = 1
    await getNotifications()
    isLoadingSearch.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  await getNotifications()
})
</script>
