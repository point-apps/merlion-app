<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'report', path: '/strength-mapping/report/spider-chart' },
          { name: $route.params.id },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <div>
        <div class="flex">
          <div class="grid flex-1 grid-cols-2">
            <router-link class="btn btn-base btn-blue" to="/strength-mapping/report/spider-chart">
              Spider Chart
            </router-link>
            <router-link
              to="/strength-mapping/report/ikigai"
              class="btn btn-base border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white"
            >
              Ikigai
            </router-link>
          </div>
          <button class="border-y border-r border-gray-500 py-1 px-2" @click="isFilterOpen = !isFilterOpen">
            <fa-icon icon="fa-light fa-calendar-day w-4 h-4"></fa-icon>
          </button>
        </div>
        <div v-if="isFilterOpen" class="grid grid-cols-2 gap-4 border-x border-black p-2">
          <div>
            <span class="text-xs">Year</span>
            <select
              v-model="filterHelper.filterYear.value"
              class="form-input mr-2 bg-white pr-2"
              @change="filterHelper.update()"
            >
              <option v-for="counter in 5" :key="counter" :value="dateHelper.getCurrentYear() - counter + 1">
                {{ dateHelper.getCurrentYear() - counter + 1 }}
              </option>
            </select>
          </div>
          <div>
            <span class="text-xs">Semester</span>
            <select
              v-model="filterHelper.filterSemester.value"
              class="form-input bg-white"
              @change="filterHelper.update()"
            >
              <option value="odd">Odd</option>
              <option value="even">Even</option>
            </select>
          </div>
        </div>
        <div v-if="isFilterOpen" class="grid grid-cols-2 gap-4 border-x border-black p-2 dark:text-black">
          <div>
            <span class="text-xs">Date From</span>
            <component :is="Datepicker" v-model="filterHelper.dateFrom.value" class="rounded bg-white" />
          </div>
          <div>
            <span class="text-xs">Date To</span>
            <component :is="Datepicker" v-model="filterHelper.dateTo.value" class="rounded bg-white" />
          </div>
        </div>
        <div v-if="isFilterOpen" class="border-x border-b border-black p-2 dark:text-black">
          <button
            type="button"
            class="btn w-full space-x-2 bg-blue-600 p-2 text-white"
            :class="{ 'bg-gray-300 text-gray-600': isLoading }"
            :disabled="isLoading"
            @click="getCaptures()"
          >
            <span>Generate Report</span>
            <div
              v-if="isLoading"
              class="border-slate-150 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400 dark:border-slate-500 dark:border-r-slate-300"
            ></div>
          </button>
        </div>
      </div>
      <figure class="highcharts-figure">
        <div id="container"></div>
      </figure>
      <router-link
        class="px-4 text-blue-500 underline"
        :to="`/strength-mapping/report/spider-chart/${route.params.id}/activity-suggestion`"
        >Click here for activity suggestion</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Highcharts, { Chart } from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import axios from '@/axios'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import { useDateHelper } from '@/composable/date-helper'
import { useFilterHelper } from '../../composable/filter'

const route = useRoute()
const dateHelper = useDateHelper()
const filterHelper = useFilterHelper()
const isFilterOpen = ref(false)
const isLoading = ref(false)
const captures = ref([])
const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 0,
  totalDocument: 0,
})
let barChart: Chart | undefined = undefined
const charts = ref<{ name: string; count: number }[]>([])
const clusters = ref([])

const getClusters = async (search = '') => {
  const result = await axios.get('/clusters', {
    params: {
      pageSize: 10,
      page: 1,
      search: {
        name: search.replace('-', ' '),
      },
    },
  })
  clusters.value = result.data.data
}

const getCaptures = async () => {
  isLoading.value = true
  const result = await axios.get('/report/spider-chart/' + route.params.id, {
    params: {
      pageSize: 10,
      page: 1,
      search: route.params.id.toString().replace('-', ' '),
      dateFrom: dateHelper.convertToDateFormat(filterHelper.dateFrom.value),
      dateTo: dateHelper.convertToDateFormat(filterHelper.dateTo.value),
    },
  })
  captures.value = result.data.data

  pagination.value = {
    page: result.data.pagination.page,
    pageCount: result.data.pagination.pageCount,
    pageSize: result.data.pagination.pageSize,
    totalDocument: result.data.pagination.totalDocument,
  }
  barChart?.xAxis[0]?.setCategories(getSeriesTitle())
  barChart?.series[0]?.setData(getSeriesValue())
  isLoading.value = false
}

const getNumber = (typology: string) => {
  const filtered: any = captures.value.filter((el: any) => {
    return el._id === typology
  })
  return filtered[0]?.count ?? 0
}

const getSeriesValue = () => {
  const seriesValue = charts.value.map((el) => el.count)
  const categories = clusters.value[0].typologies
  if (seriesValue.length <= 8) {
    for (let i = seriesValue.length; i <= 8; i++) {
      categories.push('')
      seriesValue.push(0)
    }
  }

  return seriesValue
}

const getSeriesTitle = () => {
  const categories = clusters.value[0].typologies
  charts.value = []
  categories.forEach((el: any) => {
    charts.value.push({
      name: el,
      count: getNumber(el),
    })
  })

  return categories
}

onMounted(async () => {
  filterHelper.update()
  await getClusters(route.params.id as string)
  await getCaptures()
  highchartsMore(Highcharts)
  barChart = Highcharts.chart(
    'container',
    {
      title: {
        text: route.params.id as string,
      },
      accessibility: {
        enabled: false,
      },
      xAxis: {
        categories: getSeriesTitle(),
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of activities',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Number of activities',
          type: 'column',
          data: getSeriesValue(),
        },
      ],
    },
    () => {}
  )
})
</script>
