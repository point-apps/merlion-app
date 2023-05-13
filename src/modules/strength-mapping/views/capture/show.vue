<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Capture</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'capture', path: '/strength-mapping/capture' },
          { name: capture.activity },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <div class="flex justify-end">
        <div class="space-x-3">
          <router-link
            class="btn btn-base btn-default text-xs"
            :to="`/strength-mapping/capture/${$route.params.id}/edit`"
          >
            Edit
          </router-link>
          <button class="btn btn-base btn-default text-xs" @click="onDelete()">Delete</button>
        </div>
      </div>
      <div class="flex flex-col space-y-4">
        <label class="block space-y-1">
          <span class="font-semibold">Activity photos or videos</span>
          <div v-if="!capture.files" class="font-light italic">Not captured any photo or video</div>
          <div v-else class="flex flex-col space-x-3 lg:flex-row lg:flex-wrap">
            <div
              v-for="(file, index) in capture.files"
              :key="index"
              class="relative my-2 flex max-h-[200px] min-h-[100px] justify-center shadow dark:bg-slate-700 lg:max-w-[200px]"
            >
              <video v-if="file.mimeType.includes('video')" controls class="w-full">
                <source :src="file.url" />
                Your browser does not support HTML5 video.
              </video>
              <img v-else :src="file.url" alt="activity" class="relative max-h-[200px] lg:max-w-[200px]" />
            </div>
          </div>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity Date</span>
          <p>{{ convertToDateInputFormat(capture.date) }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity</span>
          <p>{{ capture.activity }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Describe the activity</span>
          <component
            :is="BaseTextarea"
            v-model="capture.description"
            class="-mx-2 border-none outline-none"
            readonly
          ></component>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Clusters</span>
        </label>
        <div class="block space-y-4">
          <div
            v-for="cluster in capture.clusters"
            :key="cluster._id"
            class="space-y-4 bg-green-500 p-4 shadow dark:bg-slate-800"
          >
            <div>
              <p class="space-x-1">
                <span class="text-lg font-semibold capitalize">{{ cluster.name }} </span>
                <span class="text-sm font-light capitalize">[{{ cluster.typology }}]</span>
              </p>
              <p>Ikigai that suits you</p>
            </div>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'easy'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'easy'),
                }"
                class="px-3 py-2 shadow"
              >
                Easy
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'enjoy'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'enjoy'),
                }"
                class="px-3 py-2 shadow"
              >
                Enjoy
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'excellent'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'excellent'),
                }"
                class="px-3 py-2 shadow"
              >
                Excellent
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-slate-700': isIkigaiChoosen(cluster, 'earn'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'earn'),
                }"
                class="px-3 py-2 shadow"
              >
                Earn
              </button>
            </div>
          </div>
        </div>
        <label class="block space-y-1">
          <span class="font-semibold">Observer</span>
          <p>{{ capture.observer }}</p>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import BaseTextarea from '@/components/base-textarea.vue'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { useBaseNotification } from '@/composable/notification'
import { useDateHelper } from '@/composable/date-helper'

const { notification } = useBaseNotification()
const { convertToDateInputFormat } = useDateHelper()
const route = useRoute()
const router = useRouter()

const capture = ref({
  date: new Date().toString(),
  files: [],
  // file: {
  //   id: '',
  //   name: '',
  //   mimeType: '',
  //   url: '',
  // },
  activity: '',
  description: '',
  clusters: [],
  observer: '',
  isDraft: false,
})

onMounted(async () => {
  const result = await axios.get('/captures/' + route.params.id)
  capture.value.date = result.data.date
  if (result.data.files) {
    capture.value.files = result.data.files
  }
  capture.value.activity = result.data.activity
  capture.value.description = result.data.description
  capture.value.clusters = result.data.clusters
  capture.value.observer = result.data.observer
})

const isIkigaiChoosen = (cluster, ikigai) => {
  if (cluster.ikigai.includes(ikigai)) {
    return true
  }
  return false
}

const onDelete = async () => {
  if (confirm('Are you sure want to delete this data ?')) {
    const result = await axios.delete('/captures/' + route.params.id)

    if (result.status === 204) {
      router.push('/strength-mapping/capture')
      notification('Delete', 'Delete success', 'success')
    }
  }
}
</script>
