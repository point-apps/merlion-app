<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Capture</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'strength mapping', path: '/strength-mapping' }, { name: 'capture' }]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <div>
        <div class="space-y-1">
          <label class="input-group relative">
            <router-link to="/strength-mapping/capture/create" class="prepend-input">
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
              <th class="basic-table-head w-1">Date</th>
              <th class="basic-table-head">Activity</th>
              <th class="basic-table-head">Cluster</th>
              <th class="basic-table-head w-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(capture, index) in captures" :key="capture._id" class="basic-table-row">
              <td class="basic-table-body whitespace-nowrap">
                {{ format(new Date(capture.date), 'dd-MM-yyyy') }}
              </td>
              <td class="basic-table-body">
                <router-link :to="`/strength-mapping/capture/${capture._id}`" class="text-blue-500 hover:text-blue-600">
                  {{ capture.activity }}
                </router-link>
              </td>
              <td class="basic-table-body">
                <span v-for="(cluster, clusterIndex) in capture.clusters" :key="cluster.name" class="capitalize">
                  {{ cluster.name }}<span v-if="clusterIndex + 1 < capture.clusters.length">, </span>
                </span>
              </td>
              <td class="basic-table-body">
                <div
                  v-if="!capture.isDraft"
                  class="rounded bg-green-500 py-1 px-3 text-center font-bold text-green-100"
                >
                  Captured
                </div>
                <div v-else class="rounded bg-slate-500 py-1 px-3 text-center font-bold text-slate-100">Draft</div>
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

const captures = ref([])
const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 0,
  totalDocument: 0,
})
const isLoadingSearch = ref(false)
const searchText = ref('')
const currentPage = ref(1)
const pageSize = 10

const getCaptures = async (page = 1) => {
  const result = await axios.get('/captures', {
    params: {
      pageSize: pageSize,
      page: page,
      sort: {
        date: 'asc',
      },
      search: {
        activity: searchText.value,
        cluster: searchText.value,
      },
    },
  })
  captures.value = result.data.data
  pagination.value = {
    page: result.data.pagination.page,
    pageCount: result.data.pagination.pageCount,
    pageSize: result.data.pagination.pageSize,
    totalDocument: result.data.pagination.totalDocument,
  }
}

const onClickPage = async (page: number) => {
  currentPage.value = page
  await getCaptures(page)
}

watch(searchText, () => {
  isLoadingSearch.value = true
})

watchDebounced(
  searchText,
  async () => {
    currentPage.value = 1
    await getCaptures()
    isLoadingSearch.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  await getCaptures()
})
</script>
