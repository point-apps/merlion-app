<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'strength mapping', path: '/strength-mapping' }, { name: 'report' }]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <div class="">
        <div class="flex">
          <div class="grid grid-cols-2 flex-1">
            <router-link class="btn btn-base btn-blue" to="/strength-mapping/report/spider-chart"
              >Spider Chart</router-link
            >
            <router-link
              to="/strength-mapping/report/ikigai"
              class="btn btn-base border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white"
              >Ikigai</router-link
            >
          </div>
          <button class="py-1 px-2 border-y border-r border-gray-500" @click="isFilterOpen = !isFilterOpen">
            <fa-icon icon="fa-light fa-calendar-day w-4 h-4"></fa-icon>
          </button>
        </div>
        <div v-if="!isFilterOpen" class="p-2 grid grid-cols-2 gap-4 border-x border-black">
          <div>
            <span class="text-xs">Year</span>
            <select v-model="year" class="form-input bg-white pr-2 mr-2">
              <option value="">Year</option>
              <option v-for="counter in 5" :key="counter" :value="Number(format(new Date(), 'yyyy')) - counter + 1">
                {{ Number(format(new Date(), 'yyyy')) - counter + 1 }}
              </option>
            </select>
          </div>
          <div>
            <span class="text-xs">Semester</span>
            <select v-model="semester" class="form-input bg-white">
              <option value="">Semester</option>
              <option value="odd">Odd</option>
              <option value="even">Even</option>
            </select>
          </div>
        </div>
        <div v-if="!isFilterOpen" class="grid grid-cols-2 gap-4 border-x p-2 dark:text-black border-black">
          <div>
            <span class="text-xs">Date From</span>
            <component :is="Datepicker" v-model="dateFrom" class="bg-white rounded" />
          </div>
          <div>
            <span class="text-xs">Date To</span>
            <component :is="Datepicker" v-model="dateTo" class="bg-white rounded" />
          </div>
        </div>
        <div v-if="!isFilterOpen" class="border-x p-2 dark:text-black border-black border-b">
          <button type="button" class="btn bg-blue-600 w-full p-2 text-white" @click="getCaptures()">
            Generate Report
          </button>
        </div>
      </div>
      <figure class="highcharts-figure">
        <div id="container" class="dark:bg-slate-700"></div>
      </figure>
      <div class="bg-gray-100 dark:bg-slate-700 p-4 rounded">
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
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import Highcharts, { Chart } from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import { onMounted, ref, watch } from 'vue'
import axios from '@/axios'
import { format } from 'date-fns'
import { useDateHelper } from '@/composable/date-helper'

const dateHelper = useDateHelper()

const isFilterOpen = ref(false)
const currentDate = new Date()
const dateFrom = ref(format(currentDate, '01-07-yyyy'))
const dateTo = ref(format(currentDate, '31-12-yyyy'))
const year = ref(format(currentDate, 'yyyy'))
const semester = ref('even')

// set default semester to odd
if (Number(format(currentDate, 'M')) <= 6) {
  semester.value = 'even'
  dateFrom.value = format(currentDate, '01-01-yyyy')
  dateTo.value = format(currentDate, '30-06-yyyy')
}

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

const chart = ref<Chart>()
let spiderChart: any = undefined
const getCaptures = async (page = 1) => {
  const result = await axios.get('/report/spider-chart', {
    params: {
      pageSize: pageSize,
      page: page,
      dateFrom: dateHelper.convertToDateFormat(dateFrom.value),
      dateTo: dateHelper.convertToDateFormat(dateTo.value),
    },
  })
  console.log(captures.value)
  captures.value = result.data.data
  pagination.value = {
    page: result.data.pagination.page,
    pageCount: result.data.pagination.pageCount,
    pageSize: result.data.pagination.pageSize,
    totalDocument: result.data.pagination.totalDocument,
  }
  const chartNumber: number[] = [
    getNumber('servicing'),
    getNumber('thinking'),
    getNumber('reasoning'),
    getNumber('elementary'),
    getNumber('networking'),
    getNumber('generating idea'),
    getNumber('technical'),
    getNumber('headman'),
  ]
  spiderChart?.series[0]?.setData(chartNumber)
}

watch(searchText, () => {
  isLoadingSearch.value = true
})

onMounted(async () => {
  await getCaptures()
  const chartNumber: number[] = [
    getNumber('servicing'),
    getNumber('thinking'),
    getNumber('reasoning'),
    getNumber('elementary'),
    getNumber('networking'),
    getNumber('generating idea'),
    getNumber('technical'),
    getNumber('headman'),
  ]
  highchartsMore(Highcharts)
  spiderChart = Highcharts.chart(
    'container',
    {
      chart: {
        polar: true,
        type: 'line',
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
          data: chartNumber,
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
</script>
