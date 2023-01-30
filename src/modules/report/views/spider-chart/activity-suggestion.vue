<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'report', path: '/strength-mapping/report/spider-chart' },
          { name: $route.params.id, path: '/strength-mapping/report/spider-chart/1' },
          { name: 'suggestion' },
        ]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <div class="grid grid-cols-2">
        <router-link class="btn btn-base btn-blue" to="/strength-mapping/report/spider-chart">Spider Chart</router-link>
        <router-link
          to="/strength-mapping/report/ikigai"
          class="btn btn-base border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white"
          >Ikigai</router-link
        >
      </div>
      <h2>Servicing</h2>
      <div class="bg-gray-100 p-4 rounded space-y-4">
        <component :is="BaseTextarea" v-model="suggestion" readonly class="outline-none border-none"></component>
      </div>
      <a
        href="https://www.youtube.com/c/MerlionSchool"
        target="_blank"
        class="text-blue-500 px-4 underline"
        to="/strength-mapping/report/spider-chart/activity-suggestion"
      >
        Click here for more information and recommendations
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import BaseTextarea from '@/components/base-textarea.vue'
import axios from '@/axios'

const route = useRoute()
const router = useRouter()

const clusters = ref([])
const suggestion = ref()
const getClusters = async (search = '') => {
  const result = await axios.get('/clusters', {
    params: {
      limit: 10,
      page: 1,
      search: {
        name: search.replace('-', ' '),
      },
    },
  })
  clusters.value = result.data.data
  suggestion.value = clusters.value[0]?.suggestion
}
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}

onMounted(async () => {
  await getClusters(route.params.id as string)
})
</script>
