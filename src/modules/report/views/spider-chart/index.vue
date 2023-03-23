<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'strength mapping', path: '/strength-mapping' }, { name: 'report' }]"
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
        <div id="container" class="dark:bg-slate-700"></div>
      </figure>
      <div class="rounded bg-gray-100 p-4 dark:bg-slate-700">
        <h2 class="font-semibold">Summary Result</h2>
        <hr class="my-3 py-1" />
        <ul class="mb-20 space-y-1 font-semibold">
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/servicing" class="text-blue-600">
                Servicing
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('servicing') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/thinking" class="text-blue-600">
                Thinking
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('thinking') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/reasoning" class="text-blue-600">
                Reasoning
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('reasoning') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/elementary" class="text-blue-600">
                Elementary
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('elementary') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/networking" class="text-blue-600">
                Networking
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('networking') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/generating-idea" class="text-blue-600">
                Generating Idea
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('generating idea') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/technical" class="text-blue-600">
                Technical
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('technical') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/headman" class="text-blue-600">
                Headman
              </router-link>
            </span>
            <span class="flex-1">: {{ getNumber('headman') }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Highcharts, { Chart } from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import axios from '@/axios'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import { useDateHelper } from '@/composable/date-helper'
import { useFilterHelper } from '../../composable/filter'

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
let spiderChart: Chart | undefined = undefined
const getCaptures = async () => {
  isLoading.value = true
  const result = await axios.get('/report/spider-chart', {
    params: {
      pageSize: 10,
      page: 1,
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
  spiderChart?.series[0]?.setData(getChartNumber())
  isLoading.value = false
}

onMounted(async () => {
  filterHelper.update()
  await getCaptures()
  highchartsMore(Highcharts)
  spiderChart = Highcharts.chart(
    'container',
    {
      chart: {
        polar: true,
        type: 'line',
      },
      accessibility: {
        enabled: false,
      },
      title: {
        text: 'Spider Chart',
      },
      pane: {
        size: '80%',
      },
      xAxis: {
        categories: [
          'Servicing',
          'Thinking',
          'Reasoning',
          'Elementary',
          'Networking',
          'Generating Idea',
          'Technical',
          'Headman',
        ],
        tickmarkPlacement: 'on',
        lineWidth: 0,
      },

      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
      },

      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
      },

      series: [
        {
          name: 'Number of activities',
          data: getChartNumber(),
          pointPlacement: 'on',
          type: 'line',
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
              },
              pane: {
                size: '70%',
              },
            },
          },
        ],
      },
    },
    () => {}
  )
})

const getNumber = (cluster: string) => {
  const filtered: any = captures.value.filter((el: any) => {
    return el._id === cluster
  })
  return filtered[0]?.count ?? 0
}

const getChartNumber = (): number[] => {
  return [
    getNumber('servicing'),
    getNumber('thinking'),
    getNumber('reasoning'),
    getNumber('elementary'),
    getNumber('networking'),
    getNumber('generating idea'),
    getNumber('technical'),
    getNumber('headman'),
  ]
}
</script>
