<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Cluster</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master' }, { name: 'cluster' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head w-1">Cluster</th>
              <th class="basic-table-head w-48">Typologies</th>
              <th class="basic-table-head">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cluster in clusters" :key="cluster._id" class="basic-table-row">
              <td class="basic-table-body">
                <router-link
                  :to="`/master/cluster/${cluster._id}/edit`"
                  class="capitalize text-blue-500 hover:text-blue-600"
                >
                  {{ cluster.name }}
                </router-link>
              </td>
              <td class="basic-table-body">
                <ul>
                  <li v-for="(typology, index) in cluster.typologies" :key="index" class="capitalize">
                    - {{ typology }}
                  </li>
                </ul>
              </td>
              <td class="basic-table-body first-letter:capitalize">{{ cluster.description }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="pagination.totalPage > 1" class="flex flex-wrap gap-2 items-center justify-center mt-10">
          <button
            v-for="i in pagination.totalPage"
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
import { useHttpCluster } from '../api/http'

const httpUser = useHttpCluster()

const result = httpUser.readAll()

interface ClusterInterface {
  _id: string
  name: string
  alias: string
  description: string
  suggestion: string
  typologies: Array<string>
}

const clusters = ref<ClusterInterface[]>([])
const pagination = ref({
  page: 1,
  totalDocument: 0,
  totalPage: 0,
  totalPerPage: 0,
})
const isLoadingSearch = ref(false)
const searchText = ref('')
const currentPage = ref(1)
const pageLimit = 10

const getUsers = async (page = 1) => {
  const result = await axios.get('/clusters', {
    params: {
      limit: pageLimit,
      page: page,
    },
  })
  clusters.value = result.data.data
  pagination.value = {
    page: result.data.page,
    totalDocument: result.data.totalDocument,
    totalPage: result.data.totalPage,
    totalPerPage: result.data.totalPerPage,
  }
}

const onClickPage = async (page: number) => {
  currentPage.value = page
  await getUsers(page)
}

watch(searchText, () => {
  isLoadingSearch.value = true
})

watchDebounced(
  searchText,
  async () => {
    currentPage.value = 1
    await getUsers()
    isLoadingSearch.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  await getUsers()
})
</script>
