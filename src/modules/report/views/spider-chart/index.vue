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
      <div class="grid grid-cols-2">
        <router-link class="btn btn-base btn-blue" to="/strength-mapping/report/spider-chart">Spider Chart</router-link>
        <router-link
          to="/strength-mapping/report/ikigai"
          class="btn btn-base border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white"
          >Ikigai</router-link
        >
      </div>
      <figure class="highcharts-figure">
        <div id="container"></div>
      </figure>
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="font-semibold">Summary Result</h2>
        <hr class="my-3 py-1" />
        <ul class="mb-20 space-y-1 font-semibold">
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/servicing" class="text-blue-600"
                >Servicing</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('servicing') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/thinking" class="text-blue-600"
                >Thinking</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('thinking') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/reasoning" class="text-blue-600"
                >Reasoning</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('reasoning') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/elementary" class="text-blue-600"
                >Elementary</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('elementary') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/networking" class="text-blue-600"
                >Networking</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('networking') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/generating-idea" class="text-blue-600"
                >Generating Idea</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('generating idea') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/technical" class="text-blue-600"
                >Technical</router-link
              >
            </span>
            <span class="flex-1">: {{ getNumber('technical') }}</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/headman" class="text-blue-600"
                >Headman</router-link
              >
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
import { useRouter } from 'vue-router'
import Highcharts from 'highcharts'
import 'highcharts/highcharts-more'
import highchartsMore from 'highcharts/highcharts-more'
import { onMounted, ref, watch } from 'vue'
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
  const result = await axios.get('/report/spider-chart', {
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
  const chartNumber = [
    await getNumber('servicing'),
    getNumber('thinking'),
    getNumber('reasoning'),
    getNumber('elementary'),
    getNumber('networking'),
    getNumber('generating idea'),
    getNumber('technical'),
    getNumber('headman'),
  ]
  const series = [
    {
      name: 'Strength Mapping',
      data: chartNumber,
      pointPlacement: 'on',
    },
  ]
  console.log(chartNumber)
  highchartsMore(Highcharts)
  Highcharts.chart('container', {
    chart: {
      polar: true,
      type: 'line',
    },

    accessibility: {
      description:
        'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.',
    },

    title: {
      text: '',
      x: -80,
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
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
    },

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
    },

    series: [
      {
        name: 'Strength Mapping',
        data: chartNumber,
        pointPlacement: 'on',
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
  })
})
const getNumber = (cluster: string) => {
  const filtered: any = captures.value.filter((el) => {
    return el._id === cluster
  })
  return filtered[0]?.count ?? 0
}
const router = useRouter()
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}
</script>
