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
    <div class="card p-4 space-y-5">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-semibold">Activity photos or videos</span>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="dark:hover:bg-bray-800 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or MP4</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity Date</span>
          <component :is="Datepicker" v-model="form.date" />
          <p v-for="(error, index) in errors?.date" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity</span>
          <input v-model="form.activity" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.activity" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Describe the activity</span>
          <textarea v-model="form.description" rows="5" class="form-input" type="text" />
          <p v-for="(error, index) in errors?.description" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <label class="block space-y-1">
          <popper placement="bottom-start">
            <label class="input-group block">
              <label class="font-semibold">Clusters</label>
              <input v-model="searchCluster" type="text" class="form-input" placeholder="Choose Cluster" />
              <p v-for="(error, index) in errors?.clusters" :key="index" class="text-red-500 mt-1 text-xs">
                {{ error }}
              </p>
            </label>
            <template #content="contentProps">
              <div
                class="border-slate-100 dark:border-slate-800 mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg bg-white dark:bg-slate-700 sm:m-0 sm:w-80 overflow-auto"
              >
                <ul class="my-2">
                  <div v-for="cluster in clusters" :key="cluster.name">
                    <li v-for="typology in cluster.typologies" :key="typology">
                      <button
                        type="button"
                        class="dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex items-center p-4 pr-8 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 w-full text-left"
                        @click="onChooseCluster(cluster, typology) || contentProps.close()"
                      >
                        <div>
                          <div class="flex">
                            <p class="dark:text-slate-100 capitalize text-slate-900 line-clamp-1 space-x-1">
                              <span class="font-semibold">{{ cluster.name }} </span>
                              <span class="text-sm font-light">[{{ typology }}]</span>
                            </p>
                          </div>
                          <p class="dark:text-slate-300 text-sm capitalize font-light text-slate-700">
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
          <div v-for="cluster in form.clusters" class="shadow p-4 bg-green-50 dark:bg-slate-800 space-y-4">
            <div>
              <p class="space-x-1">
                <span class="text-lg capitalize font-semibold">{{ cluster.name }} </span>
                <span class="text-sm capitalize font-light">[{{ cluster.typology }}]</span>
              </p>
              <p>Choose the Ikigai that suits you</p>
              <p class="text-sm font-light">You can choose more than 1 options</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'easy'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'easy'),
                }"
                class="shadow py-2 px-3"
                @click="onChooseIkigai(cluster, 'easy')"
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
                @click="onChooseIkigai(cluster, 'enjoy')"
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
                @click="onChooseIkigai(cluster, 'excellent')"
              >
                Excellent
              </button>
              <button
                type="button"
                :class="{
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'earn'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'earn'),
                }"
                class="shadow py-2 px-3"
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
          <p v-for="(error, index) in errors?.observer" :key="index" class="text-red-500 mt-1 text-xs">
            {{ error }}
          </p>
        </label>
        <div class="flex flex-row space-x-2">
          <button
            type="submit"
            class="btn btn-base rounded flex-1 text-slate-100 bg-blue-500 dark:bg-blue-700 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-base rounded flex-1 text-slate-100 bg-slate-500 hover:bg-slate-600"
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
import { useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useBaseNotification } from '@/composable/notification'
import { AxiosError } from 'axios'

const { notification } = useBaseNotification()
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
  activity: string
  description: string
  observer: string
  clusters: CaptureClusterInterface[]
  isDraft: boolean
}
const form = ref<CaptureInterface>({
  date: format(new Date(), 'dd-MM-yyyy'),
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

    const response = await axios.post('/captures', { ...form.value, date: date })
    if (response.status === 201) {
      notification('Create', 'Create success', 'success')
      router.push('/strength-mapping/capture/' + response.data._id)
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
