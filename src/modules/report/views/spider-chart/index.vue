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
      <!-- <component :is="Chart" :options="chartOptions" /> -->
      <figure class="highcharts-figure">
        <div id="container"></div>
      </figure>
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="font-semibold">Summary Result</h2>
        <hr class="my-3 py-1" />
        <ul class="mb-20 space-y-1 font-semibold">
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Servicing</router-link>
            </span>
            <span class="flex-1">: 5</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Thinking</router-link>
            </span>
            <span class="flex-1">: 2</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Reasoning</router-link>
            </span>
            <span class="flex-1">: 1</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Elementary</router-link>
            </span>
            <span class="flex-1">: 7</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Networking</router-link>
            </span>
            <span class="flex-1">: 6</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600"
                >Generating Idea</router-link
              >
            </span>
            <span class="flex-1">: 8</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Technical</router-link>
            </span>
            <span class="flex-1">: 1</span>
          </li>
          <li class="flex">
            <span class="flex-1">
              <router-link to="/strength-mapping/report/spider-chart/1" class="text-blue-600">Headman</router-link>
            </span>
            <span class="flex-1">: 3</span>
          </li>
        </ul>
      </div>
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
        data: [5, 2, 1, 7, 6, 8, 1, 3],
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
