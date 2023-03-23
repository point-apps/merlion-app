<template>
  <div class="flex w-full flex-col justify-center space-y-4 py-5 lg:py-6">
    <div
      v-for="(notification, index) in notifications"
      :key="notification._id"
      class="space-y-4 rounded bg-white p-4 shadow dark:bg-slate-800"
    >
      <h4 class="">{{ notification.subject }}</h4>
      <component
        :is="BaseTextarea"
        v-model="notification.message"
        class="-mx-2 border-none text-slate-500 outline-none"
        readonly
      ></component>
      <p class="font-extralight">
        {{ formatDistance(new Date(notification.date), new Date(), { addSuffix: true }) }}
      </p>
    </div>
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
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import BaseTextarea from '@/components/base-textarea.vue'
import axios from '@/axios'
import { watchDebounced } from '@vueuse/core'
import { format, formatDistance } from 'date-fns'

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
const pageLimit = 1

const getNotifications = async (page = 1) => {
  const result = await axios.get('/notifications', {
    params: {
      limit: pageLimit,
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
