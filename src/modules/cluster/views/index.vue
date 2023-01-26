<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Cluster</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'cluster' }]" />
    </div>
    <div class="card p-4 space-y-5">
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

const getClusters = async () => {
  const result = await axios.get('/clusters', {
    params: {
      limit: 10,
      page: 1,
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
