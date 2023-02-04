<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Cluster</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'cluster' }]" />
    </div>
    <div class="card p-4 space-y-5">
      <div class="space-y-1">
        <label class="input-group relative">
          <input v-model="searchText" class="form-input rounded-r-lg" placeholder="Search" type="text" />
          <div
            v-if="isLoadingSearch"
            class="dark:text-slate-300 pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400"
          >
            <div
              class="border-slate-150 dark:border-slate-500 dark:border-r-slate-300 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400"
            ></div>
          </div>
        </label>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head w-1">Cluster</th>
              <th class="basic-table-head">Description</th>
              <th class="basic-table-head">Typologies</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="cluster in clusters">
              <tr v-for="(typology, index) in cluster.typologies" :key="typology" class="basic-table-row">
                <td class="basic-table-body">
                  <router-link
                    v-if="index === 0"
                    :to="`/master/cluster/${cluster._id}/edit`"
                    class="capitalize text-blue-500 hover:text-blue-600"
                  >
                    {{ cluster.name }}
                  </router-link>
                </td>
                <td class="basic-table-body first-letter:capitalize">
                  <span v-if="index === 0">{{ cluster.description }}</span>
                </td>
                <td class="basic-table-body capitalize">
                  {{ typology }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { watchDebounced } from '@vueuse/core'

interface ClusterInterface {
  _id: string
  name: string
  alias: string
  description: string
  suggestion: string
  typologies: Array<string>
}

const clusters = ref<ClusterInterface[]>([])
const isLoadingSearch = ref(false)
const searchText = ref('')

watchDebounced(
  searchText,
  async () => {
    isLoadingSearch.value = true
    await getClusters()
    isLoadingSearch.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

const getClusters = async () => {
  const result = await axios.get('/clusters', {
    params: {
      limit: 10,
      page: 1,
      search: {
        name: searchText.value,
        typology: searchText.value,
      },
    },
  })
  clusters.value = result.data.data
}

watch(searchText, () => {
  isLoadingSearch.value = true
})

onMounted(async () => {
  await getClusters()
})
</script>
