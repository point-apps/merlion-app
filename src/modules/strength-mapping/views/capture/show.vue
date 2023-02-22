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
    <div class="card p-4 space-y-5">
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
          <div v-if="!capture.file.url" class="font-light italic">Not captured any photo or video</div>
          <div
            v-else
            class="my-2 relative min-h-[100px] max-h-[200px] lg:max-w-[200px] shadow dark:bg-slate-700 flex justify-center"
          >
            <video v-if="capture.file.mimeType.includes('video')" controls class="w-full">
              <source :src="capture.file.url" />
              Your browser does not support HTML5 video.
            </video>
            <img v-else :src="capture.file.url" alt="activity" class="max-h-[200px] lg:max-w-[200px] relative" />
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
            class="-mx-2 outline-none border-none"
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
            class="shadow p-4 bg-green-500 dark:bg-slate-800 space-y-4"
          >
            <div>
              <p class="space-x-1">
                <span class="text-lg capitalize font-semibold">{{ cluster.name }} </span>
                <span class="text-sm capitalize font-light">[{{ cluster.typology }}]</span>
              </p>
              <p>Ikigai that suits you</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'easy'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'easy'),
                }"
                class="shadow py-2 px-3"
              >
                Easy
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'enjoy'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'enjoy'),
                }"
                class="shadow py-2 px-3"
              >
                Enjoy
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'excellent'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'excellent'),
                }"
                class="shadow py-2 px-3"
              >
                Excellent
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-slate-700': isIkigaiChoosen(cluster, 'earn'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'earn'),
                }"
                class="shadow py-2 px-3"
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
  file: {
    id: '',
    name: '',
    mimeType: '',
    url: '',
  },
  activity: '',
  description: '',
  clusters: [],
  observer: '',
  isDraft: false,
})

onMounted(async () => {
  const result = await axios.get('/captures/' + route.params.id)
  capture.value.date = result.data.date
  capture.value.file = result.data.file
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
