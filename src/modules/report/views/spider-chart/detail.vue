<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'report', path: '/strength-mapping/report/spider-chart' },
          { name: 'servicing' },
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
      <!-- <component :is="Chart" :options="chartOptions" /> -->
      <figure class="highcharts-figure">
        <div id="container"></div>
      </figure>
      <router-link class="text-blue-500 px-4 underline" to="/strength-mapping/report/spider-chart/activity-suggestion"
        >Click here for activity suggestion</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
import { useRouter } from 'vue-router'
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import 'highcharts/highcharts-more'
import { onMounted } from 'vue'
import highchartsMore from 'highcharts/highcharts-more'

onMounted(() => {
  highchartsMore(Highcharts)

  Highcharts.chart('container', {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Servicing',
    },
    xAxis: {
      categories: ['Serving', 'Caretaking', '', '', '', '', '', '', ''],
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
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
        data: [6, 2, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })
})

const chartOptions = {
  chart: {
    polar: true,
    type: 'line',
  },

  accessibility: {
    description:
      'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.',
  },

  title: {
    text: 'Budget vs spending',
    x: -80,
  },

  pane: {
    size: '80%',
  },

  xAxis: {
    categories: ['Sales', 'Marketing', 'Development', 'Customer Support', 'Information Technology', 'Administration'],
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
      name: 'Allocated Budget',
      data: [43000, 19000, 60000, 35000, 17000, 10000, 17000, 10000],
      pointPlacement: 'on',
    },
    {
      name: 'Actual Spending',
      data: [50000, 39000, 42000, 31000, 26000, 14000, 17000, 10000],
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
}
const router = useRouter()
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}
</script>
