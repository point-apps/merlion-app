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
      <router-link
        class="text-blue-500 px-4 underline"
        :to="`/strength-mapping/report/spider-chart/${route.params.id}/activity-suggestion`"
        >Click here for activity suggestion</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
import { useRoute, useRouter } from 'vue-router'
import Highcharts from 'highcharts'
import { onMounted, ref } from 'vue'
import highchartsMore from 'highcharts/highcharts-more'
import axios from '@/axios'

const route = useRoute()
const clusters = ref([])
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
const getCaptures = async (page = 1) => {
  const result = await axios.get('/report/spider-chart/' + route.params.id, {
    params: {
      pageSize: pageSize,
      page: page,
      search: route.params.id.replace('-', ' '),
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

const getNumber = (typology: string) => {
  const filtered: any = captures.value.filter((el) => {
    return el._id === typology
  })
  return filtered[0]?.count ?? 0
}
const charts = ref([])
onMounted(async () => {
  highchartsMore(Highcharts)

  await getClusters(route.params.id as string)
  await getCaptures()
  const categories = clusters.value[0].typologies

  categories.forEach((el) => {
    charts.value.push({
      name: el,
      count: getNumber(el),
    })
  })

  const newArray = charts.value.map((el) => el.count)

  if (newArray.length <= 8) {
    for (let i = newArray.length; i <= 8; i++) {
      categories.push('')
      newArray.push(0)
    }
  }

  console.log(newArray)

  Highcharts.chart(
    'container',
    {
      title: {
        text: route.params.id as string,
      },
      accessibility: {
        enabled: false,
      },
      xAxis: {
        categories: categories,
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
          data: newArray,
        },
      ],
    },
    () => {}
  )
})
const router = useRouter()
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}
</script>
