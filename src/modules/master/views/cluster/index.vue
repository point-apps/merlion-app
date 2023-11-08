<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Cluster</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'cluster' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div class="space-y-1">
        <label class="input-group relative">
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
      <div class="flex flex-row">
        <div
          v-for="(cluster, index) in clusters"
          :key="index"
          class="cursor-pointer px-3 py-2 capitalize transition"
          :class="currentTab === index ? 'bg-sky-500 text-white' : 'bg-white hover:bg-slate-100'"
          @click="() => (currentTab = index)"
        >
          {{ cluster.name }}
        </div>
      </div>
      <div v-for="(cluster, index) in clusters" :key="index" class="" :class="currentTab !== index ? 'hidden' : ''">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr class="basic-table-row">
                <th class="basic-table-head w-1">Cluster</th>
                <th class="basic-table-head">Description</th>
                <th class="basic-table-head">Group</th>
                <th class="basic-table-head">Typology</th>
                <th class="basic-table-head">Color</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(group, index) in cluster.groups" :key="index">
                <tr v-for="(typology, i) in group.typologies" :key="i" class="basic-table-row">
                  <td
                    v-if="index === 0 && i === 0"
                    :rowSpan="cluster.groups.reduce((p, c) => p + c.typologies.length, 0)"
                    class="basic-table-body capitalize"
                  >
                    {{ cluster.name }}
                  </td>
                  <td
                    v-if="index === 0 && i === 0"
                    :rowSpan="cluster.groups.reduce((p, c) => p + c.typologies.length, 0)"
                    class="basic-table-body first-letter:capitalize"
                  >
                    <p class="flex flex-col gap-1">
                      <span>
                        {{ cluster.descriptionId }}
                      </span>
                      <i>
                        {{ cluster.description }}
                      </i>
                    </p>
                  </td>
                  <td v-if="i === 0" :rowSpan="group.typologies.length" class="basic-table-body capitalize">
                    {{ group.name }}
                  </td>
                  <td class="basic-table-body capitalize">
                    {{ typology.name }}
                  </td>
                  <td class="basic-table-body flex flex-col items-center gap-2 capitalize">
                    <div
                      :style="'background-color: ' + clusterColors[(cluster.name as string).replace(' ', '-')]"
                      class="block h-10 w-24 rounded-lg"
                    ></div>
                    {{ clusterColors[(cluster.name as string).replace(' ', '-')] ?? '' }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
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

const clusterColors = {
  servicing: '#5b55e0',
  thinking: '#489f7b',
  reasoning: '#ffdb94',
  elementary: '#bac94a',
  networking: '#b9e3fc',
  'generating-idea': '#f2a593',
  technical: '#f36b79',
  headman: '#749df5',
}

interface Typology {
  name: string
  description: string
  descriptionId: string
  abbr: string
}
interface ClusterGroup {
  name: string
  typologies: Array<Typology>
}
interface ClusterInterface {
  _id: string
  name: string
  alias: string
  description: string
  descriptionId: string
  suggestion: string
  typologies: Array<string>
  groups: Array<ClusterGroup>
}

const clusters = ref<ClusterInterface[]>([])
const isLoadingSearch = ref(false)
const searchText = ref('')

const currentTab = ref(0)

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
