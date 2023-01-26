<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'report', path: '/strength-mapping/report/spider-chart' },
          { name: 'servicing', path: '/strength-mapping/report/spider-chart/1' },
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
        <p><b>Serving</b> Suka menolong sesama, sopan santun memberikan salam pada guru atau orang tua</p>
        <p>
          <b>Caretaking</b> Peduli dengan orang lain ditambah dengan memberikan nasihat, taat beragama, menjadi
          sukarelawan jika dibutuhkan bantuan
        </p>
      </div>
      <router-link class="text-blue-500 px-4 underline" to="/strength-mapping/report/spider-chart/activity-suggestion">
        Click here for more information and recommendations
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'

const router = useRouter()
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}
</script>
