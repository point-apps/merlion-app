<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Capture</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'capture', path: '/strength-mapping/capture' },
          { name: capture._id },
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
          <div v-if="capture.files && capture.files?.[0]?.url" class="flex space-x-3">
            <div
              v-for="(file, index) in capture.files"
              :key="index"
              class="relative w-full rounded-lg p-2 shadow-md dark:bg-slate-700 sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <!-- Video Preview -->
              <video v-if="file.mimeType.includes('video')" controls class="h-48 w-full rounded object-contain">
                <source :src="file.url" />
                Your browser does not support HTML5 video.
              </video>

              <!-- Image Preview -->
              <a v-else-if="file.mimeType.includes('image')" :href="file.url" target="_blank">
                <img :src="file.url" alt="Uploaded file" class="h-48 w-full rounded object-contain" />
              </a>
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
          <span class="font-semibold">Observer</span>
          <p>{{ capture.observer }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Teachers</span>
          <p>{{ capture.teachers }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity Note</span>
          <component
            :is="BaseTextarea"
            v-model="capture.activity_note"
            class="-mx-2 border-none outline-none"
            readonly
          ></component>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Clusters</span>
        </label>
        <div class="block space-y-4">
          <template v-for="cluster in capture.clusters" :key="cluster._id">
            <div v-if="cluster.cluster_id" class="space-y-4 bg-green-500 p-4 shadow dark:bg-slate-800">
              <div>
                <p class="space-x-1">
                  <span class="text-lg font-semibold capitalize">{{ cluster.name }} </span>
                  <span class="text-sm font-light capitalize">[{{ cluster.typology }}]</span>
                </p>
                <p>Strength Experience</p>
              </div>
              <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <button
                  type="button"
                  :class="{
                    'bg-sky-400 text-white dark:bg-sky-700': isIkigaiChoosen(cluster, 'easy'),
                    'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'easy'),
                  }"
                  class="border border-sky-400 px-3 py-2 shadow"
                >
                  Easy
                </button>
                <button
                  type="button"
                  :class="{
                    'bg-sky-400 text-white dark:bg-sky-700': isIkigaiChoosen(cluster, 'enjoy'),
                    'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'enjoy'),
                  }"
                  class="border border-sky-400 px-3 py-2 shadow"
                >
                  Enjoy
                </button>
                <button
                  type="button"
                  :class="{
                    'bg-sky-400 text-white dark:bg-sky-700': isIkigaiChoosen(cluster, 'excellent'),
                    'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'excellent'),
                  }"
                  class="border border-sky-400 px-3 py-2 shadow"
                >
                  Excellent
                </button>
                <button
                  type="button"
                  :class="{
                    'bg-green-400 dark:bg-slate-700': isIkigaiChoosen(cluster, 'earn'),
                    'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'earn'),
                  }"
                  class="border border-sky-400 px-3 py-2 shadow"
                >
                  Earn
                </button>
              </div>
            </div>
          </template>
        </div>
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
  _id: '',
  date: new Date().toString(),
  files: [],
  activity: '',
  description: '',
  clusters: [],
  observer: '',
  teachers: '',
  activity_note: '',
  isDraft: false,
})

onMounted(async () => {
  const result = await axios.get('/captures/' + route.params.id)
  capture.value.date = result.data.date
  if (result.data.files) {
    capture.value.files = result.data.files
  }
  capture.value._id = result.data._id
  capture.value.activity = result.data.activity
  capture.value.description = result.data.description
  capture.value.clusters = result.data.clusters
  capture.value.observer = result.data.observer
  capture.value.teachers = result.data.teachers
  capture.value.activity_note = result.data.activity_note
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
