<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Capture</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'capture', path: '/strength-mapping/capture' },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-semibold">Activity photos or videos</span>
          <div v-if="!capture.files" class="font-light italic">Not captured any photo or video</div>
          <div v-else class="flex space-x-3">
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
          <component :is="Datepicker" v-model="form.date" />
          <p v-for="(error, index) in errors?.date" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity</span>
          <input v-model="form.activity" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.activity" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Describe the activity</span>
          <textarea v-model="form.description" rows="5" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.description" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <popper placement="bottom-start">
            <label class="input-group block">
              <label class="font-semibold">Clusters</label>
              <input v-model="searchCluster" type="text" class="form-input" placeholder="Choose Cluster" />
              <p v-for="(error, index) in errors?.clusters" :key="index" class="mt-1 text-xs text-red-500">
                {{ error }}
              </p>
            </label>
            <template #content="contentProps">
              <div
                class="mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col overflow-auto rounded-lg border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-700 sm:m-0 sm:w-80"
              >
                <ul class="my-2">
                  <div v-for="cluster in clusters" :key="cluster.name">
                    <li v-for="typology in cluster.typologies" :key="typology">
                      <button
                        type="button"
                        class="flex w-full items-center p-4 pr-8 text-left tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-600 dark:focus:bg-slate-600"
                        @click="onChooseCluster(cluster, typology) || contentProps.close()"
                      >
                        <div>
                          <div class="flex">
                            <p class="space-x-1 capitalize text-slate-900 line-clamp-1 dark:text-slate-100">
                              <span class="font-semibold">{{ cluster.name }} </span>
                              <span class="text-sm font-light">[{{ typology }}]</span>
                            </p>
                          </div>
                          <p class="text-sm font-light capitalize text-slate-700 dark:text-slate-300">
                            {{ cluster.description }}
                          </p>
                        </div>
                      </button>
                    </li>
                  </div>
                </ul>
              </div>
            </template>
          </popper>
        </label>
        <div class="block space-y-4">
          <div v-for="cluster in form.clusters" class="space-y-4 bg-green-50 p-4 shadow">
            <div>
              <p class="space-x-1">
                <span class="text-lg font-semibold capitalize">{{ cluster.name }} </span>
                <span class="text-sm font-light capitalize">[{{ cluster.typology }}]</span>
              </p>
              <p>Choose the Ikigai that suits you</p>
              <p class="text-sm font-light">You can choose more than 1 options</p>
            </div>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <button
                type="button"
                :class="{
                  'bg-green-400': isIkigaiChoosen(cluster, 'easy'),
                  'bg-slate-50': !isIkigaiChoosen(cluster, 'easy'),
                }"
                class="py-2 px-3 shadow"
                @click="onChooseIkigai(cluster, 'easy')"
              >
                Easy
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400': isIkigaiChoosen(cluster, 'enjoy'),
                  'bg-slate-50': !isIkigaiChoosen(cluster, 'enjoy'),
                }"
                class="py-2 px-3 shadow"
                @click="onChooseIkigai(cluster, 'enjoy')"
              >
                Enjoy
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400': isIkigaiChoosen(cluster, 'excellent'),
                  'bg-slate-50': !isIkigaiChoosen(cluster, 'excellent'),
                }"
                class="py-2 px-3 shadow"
                @click="onChooseIkigai(cluster, 'excellent')"
              >
                Excellent
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400': isIkigaiChoosen(cluster, 'earn'),
                  'bg-slate-50': !isIkigaiChoosen(cluster, 'earn'),
                }"
                class="py-2 px-3 shadow"
                @click="onChooseIkigai(cluster, 'earn')"
              >
                Earn
              </button>
            </div>
          </div>
        </div>
        <label class="block space-y-1">
          <span class="font-semibold">Observer</span>
          <input
            v-model="form.observer"
            class="form-input"
            type="text"
            placeholder="who assists in observing this activity"
          />
          <p v-for="(error, index) in errors?.observer" :key="index" class="mt-1 text-xs text-red-500">
            {{ error }}
          </p>
        </label>
        <div class="flex flex-row space-x-2">
          <button type="submit" class="btn btn-base flex-1 rounded bg-blue-500 text-slate-100 hover:bg-blue-600">
            Save
          </button>
          <button
            type="button"
            class="btn btn-base flex-1 rounded bg-slate-500 text-slate-100 hover:bg-slate-600"
            @click="onSavingDraft()"
          >
            Save as a Draft
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import Breadcrumb from '@/components/breadcrumb.vue'
import Datepicker from '@/components/datepicker.vue'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useBaseNotification } from '@/composable/notification'
import { AxiosError } from 'axios'

const { notification } = useBaseNotification()
const route = useRoute()
const router = useRouter()
const errors = ref()

interface CaptureClusterInterface {
  cluster_id: string
  name: string
  typology: string
  ikigai: string[]
}
interface CaptureInterface {
  date: string
  files: []
  activity: string
  description: string
  observer: string
  clusters: CaptureClusterInterface[]
  isDraft: boolean
}
const form = ref<CaptureInterface>({
  date: format(new Date(), 'dd-MM-yyyy'),
  files: [],
  activity: '',
  description: '',
  observer: '',
  clusters: [],
  isDraft: false,
})
const isLoadingSearch = ref(false)

const onChooseCluster = (cluster: any, typology: string) => {
  if (form.value.clusters.length >= 3) {
    notification('Cluster error', 'Max 3 cluster allowed on each activity', 'warning')
    return
  }

  if (form.value.clusters.some((e) => e.typology === typology)) {
    notification('Cluster error', `Cluster ${cluster.name} [${typology}] already choosen`, 'warning')
    return
  }

  form.value.clusters.push({
    cluster_id: cluster._id,
    name: cluster.name,
    typology: typology,
    ikigai: [],
  })
}

const isLoadingRoles = ref(false)

onMounted(async () => {
  isLoadingRoles.value = true
  await getClusters()
  await getCapture()
  isLoadingRoles.value = false
})

const onSubmit = async () => {
  try {
    const inputDate = form.value.date.split('-')

    if (inputDate.length !== 3) {
      notification('Date error', 'Format date error', 'warning')
      return
    }

    const isIkigaiEmpty = form.value.clusters.some((el) => {
      return el.ikigai.length === 0
    })

    if (isIkigaiEmpty) {
      notification('Ikigai error', 'Please fill ikigai type at least 1', 'warning')
      return
    }

    const date = new Date()
    date.setFullYear(Number(inputDate[2]))
    date.setMonth(Number(inputDate[1]) - 1) // month start from 0 (january)
    date.setDate(Number(inputDate[0]))
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    if (format(date, 'yyyy-MM-dd') > format(new Date(), 'yyyy-MM-dd')) {
      notification('Date error', 'Activity date is for past or current activity only', 'warning')
      return
    }

    const response = await axios.patch('/captures/' + route.params.id, { ...form.value, date: date })
    if (response.status === 204) {
      notification('Update', 'Update success', 'success')
      router.push('/strength-mapping/capture/' + route.params.id)
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      errors.value = error.response?.data.errors
    } else if (error instanceof AxiosError) {
      notification(error.code as string, error.message, 'warning')
    } else {
      notification('Unknown Error', '', 'warning')
    }
  }
}

const searchCluster = ref()
const clusters = ref({})
const capture = ref({
  file: {
    id: '',
    name: '',
    url: '',
    mimeType: '',
  },
})

const getCapture = async () => {
  const result = await axios.get('/captures/' + route.params.id)
  form.value.date = format(new Date(result.data.date), 'dd-MM-yyyy')
  form.value.activity = result.data.activity
  form.value.description = result.data.description
  form.value.clusters = result.data.clusters
  form.value.observer = result.data.observer
  if (result.data.files) {
    capture.value.files = result.data.files
  }
}
const getClusters = async (search = '') => {
  const result = await axios.get('/clusters', {
    params: {
      limit: 10,
      page: 1,
      search: {
        name: search,
        typology: search,
      },
    },
  })
  clusters.value = result.data.data
}
watchDebounced(
  searchCluster,
  async (newValue) => {
    isLoadingSearch.value = true
    await getClusters(newValue)
    isLoadingSearch.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

const onChooseIkigai = (cluster, ikigai) => {
  if (!cluster.ikigai.includes(ikigai)) {
    cluster.ikigai.push(ikigai)
  } else {
    cluster.ikigai = cluster.ikigai.filter((e) => e !== ikigai)
  }
}

const isIkigaiChoosen = (cluster, ikigai) => {
  if (cluster.ikigai.includes(ikigai)) {
    return true
  }
  return false
}

const onSavingDraft = async () => {
  form.value.isDraft = true
  await onSubmit()
}
</script>
