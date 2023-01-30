<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'report', path: '/strength-mapping/report/ikigai' },
          { name: $route.params.id },
        ]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <div class="grid grid-cols-2">
        <router-link
          to="/strength-mapping/report/spider-chart"
          class="btn btn-base border-y border-l border-gray-500 hover:bg-blue-500 hover:text-white"
          >Spider Chart</router-link
        >
        <router-link to="/strength-mapping/report/ikigai" class="btn btn-base btn-blue">Ikigai</router-link>
      </div>
      <p class="">
        Typologies found to be <span class="capitalize font-semibold">{{ $route.params.id }}</span> are:
      </p>
      <div class="bg-gray-100 dark:bg-slate-800 p-4 rounded">
        <ul v-if="captures.length" class="mb-20">
          <li v-for="capture in captures" class="capitalize">- {{ capture._id }}</li>
        </ul>
        <div v-else class="mb-20 font-light">Not found</div>
        <hr class="py-1 my-3" />
        <p class="italic font-light">BE FAITHFUL IN SMALL THINGS BECAUSE IT IS IN THEM THAT YOUR STRENGTH LIES.</p>
        <p class="font-semibold">- Mother Theresa -</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const captures = ref([])
const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 0,
  totalDocument: 0,
})
const isLoadingSearch = ref(false)
const searchText = ref('')
const pageSize = 10

const getCaptures = async (page = 1) => {
  const result = await axios.get('/report/ikigai', {
    params: {
      pageSize: pageSize,
      page: page,
      search: route.params.id,
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

watch(searchText, () => {
  isLoadingSearch.value = true
})

onMounted(async () => {
  await getCaptures()
})
</script>
