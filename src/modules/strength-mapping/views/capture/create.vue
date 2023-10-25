<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Capture</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'strength mapping', path: '/strength-mapping' },
          { name: 'capture', path: '/strength-mapping/capture' },
          { name: 'create' },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-4" @submit.prevent="onSubmit()">
        <div v-if="!isGrantedUploadGoogleDrive()" class="grid grid-cols-1 gap-4 font-semibold text-gray-600">
          <span class="font-semibold">Activity photos or videos</span>
          <p class="-mt-3 font-light">Please Sign in with Google below to grant access your Google Drive account</p>
          <button type="button" class="flex rounded" @click="onGoogleSignin()">
            <img
              v-if="isGoogleSigninPressed"
              src="@/assets/images/google/btn_google_signin_light_pressed_web@2x.png"
              alt=""
              class="h-12 dark:hidden"
            />
            <img
              v-else
              src="@/assets/images/google/btn_google_signin_light_normal_web@2x.png"
              alt=""
              class="h-12 dark:hidden"
            />
            <img
              v-if="isGoogleSigninPressed"
              src="@/assets/images/google/btn_google_signin_dark_pressed_web@2x.png"
              alt=""
              class="hidden h-12 dark:block"
            />
            <img
              v-else
              src="@/assets/images/google/btn_google_signin_dark_normal_web@2x.png"
              alt=""
              class="hidden h-12 dark:block"
            />
          </button>
        </div>
        <label v-if="isGrantedUploadGoogleDrive()" class="block space-y-1">
          <span class="font-semibold">Activity photos or videos</span>
          <div class="flex w-full items-center justify-center">
            <label
              for="dropzone-file"
              class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              :class="{
                'border-gray-300 dark:border-gray-600': !formErrors.mimeType,
                'border-red-500': formErrors.mimeType,
              }"
            >
              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  class="mb-3 h-10 w-10 text-gray-400"
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
                <p class="text-xs text-gray-500 dark:text-gray-400">Only Support file format: PNG, JPG, MP4</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" any @change="onFileChange($event)" />
            </label>
          </div>
        </label>
        <p v-if="errors?.file" class="mt-1 text-xs text-red-500">
          {{ errors?.file }}
        </p>
        <p v-if="formErrors.mimeType" class="my-2 text-center text-sm font-semibold text-red-500">
          {{ formErrors.mimeType }}
        </p>
        <div class="flex flex-col space-x-3 lg:flex-row lg:flex-wrap">
          <div
            v-for="(file, index) in form.files"
            :key="index"
            class="relative my-2 flex max-h-[200px] min-h-[100px] justify-center shadow dark:bg-slate-700 lg:max-w-[200px]"
          >
            <video v-if="file.mimeType.includes('video')" controls class="w-full">
              <source :src="file.url" />
              Your browser does not support HTML5 video.
            </video>
            <img v-else :src="file.url" alt="activity" class="relative max-h-[200px] lg:max-w-[200px]" />
            <button
              type="button"
              class="btn absolute right-2 top-2 rounded-full border-white bg-white px-2.5 py-1 opacity-50 shadow"
              @click="onRemoveFile(index)"
            >
              <fa-icon icon="fa-solid fa-xmark" class="text-slate-800 shadow"></fa-icon>
            </button>
          </div>
        </div>
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
        <label class="block space-y-1">
          <popper placement="bottom-start">
            <label class="input-group block">
              <label class="font-semibold">Clusters</label>
              <input v-model="searchCluster" type="text" class="form-input" placeholder="Choose Cluster (max 3)" />
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
                            <p class="line-clamp-1 space-x-1 capitalize text-slate-900 dark:text-slate-100">
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
          <div v-for="cluster in form.clusters" class="space-y-4 bg-green-50 p-4 shadow dark:bg-slate-800">
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
                  'bg-green-400 dark:bg-green-700': isIkigaiChoosen(cluster, 'easy'),
                  'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'easy'),
                }"
                class="px-3 py-2 shadow"
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
                class="px-3 py-2 shadow"
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
                class="px-3 py-2 shadow"
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
                class="px-3 py-2 shadow"
                @click="onChooseIkigai(cluster, 'earn')"
              >
                Earn
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-row space-x-2">
          <button
            :disabled="isSaving"
            type="submit"
            :class="[{ 'bg-gray-500': isSaving }]"
            class="btn btn-base relative flex-1 rounded bg-blue-500 text-slate-100 hover:bg-blue-600 dark:bg-blue-700"
          >
            Save
            <div
              v-if="isSaving && !isSavingDraftMode"
              class="pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
            >
              <div
                class="border-slate-150 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400 dark:border-slate-500 dark:border-r-slate-300"
              ></div>
            </div>
          </button>

          <button
            :disabled="isSaving"
            :class="[{ 'bg-gray-500': isSaving }]"
            type="button"
            class="btn btn-base flex-1 rounded bg-red-500 text-slate-100 hover:bg-red-600"
            @click="onSavingDraft()"
          >
            Save as a Draft
            <div
              v-if="isSaving && isSavingDraftMode"
              class="pointer-events-none absolute right-5 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
            >
              <div
                class="border-slate-150 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400 dark:border-slate-500 dark:border-r-slate-300"
              ></div>
            </div>
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
import { useDateHelper } from '@/composable/date-helper'
import { baseURL } from '@/config/api'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const isGrantedUploadGoogleDrive = () => {
  const googleScopes = authStore.$state.user.googleScopes
  return googleScopes?.includes('https://www.googleapis.com/auth/drive.file')
}

const { notification } = useBaseNotification()
const { convertToDateFormat } = useDateHelper()

const router = useRouter()
const errors = ref()
const formErrors = ref<any>({ mimeType: '' })

interface CaptureClusterInterface {
  cluster_id: string
  name: string
  typology: string
  ikigai: string[]
}
interface IFile {
  file: any
  url: string
  size: number
  mimeType: string
}

interface CaptureInterface {
  date: string
  files: IFile[]
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

const onFileChange = (e: any) => {
  const file = e.target.files[0]
  formErrors.value.mimeType = ''
  if (!['image/png', 'image/jpg', 'image/jpeg', 'video/mp4'].some((s) => s === file.type)) {
    formErrors.value.mimeType = 'Upload Failed, Please Try Again'
    return
  }
  form.value.files.push({
    file: file,
    url: URL.createObjectURL(file),
    size: file.size,
    mimeType: file.type,
  })
}

const onRemoveFile = (index: number) => {
  form.value.files.splice(index, 1)
}

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
const isSaving = ref(false)
const isSavingDraftMode = ref(false)

onMounted(async () => {
  isLoadingRoles.value = true
  await getClusters()
  isLoadingRoles.value = false
})

const onSubmit = async () => {
  try {
    isSaving.value = true
    const isIkigaiEmpty = form.value.clusters.some((el) => {
      return el.ikigai.length === 0
    })

    if (isIkigaiEmpty) {
      notification('Ikigai error', 'Please fill ikigai type at least 1', 'warning')
      return
    }

    const time = format(new Date(), 'HH:mm')
    const date = convertToDateFormat(form.value.date, time)
    if (!date) {
      notification('Date error', 'Format date error', 'warning')
      return
    }

    if (format(date, 'yyyy-MM-dd') > format(new Date(), 'yyyy-MM-dd')) {
      notification('Date error', 'Activity date is for past or current activity only', 'warning')
      return
    }

    const response = await axios.post('/captures', {
      ...form.value,
      date: date.toISOString(),
    })

    if (form.value.files.length) {
      const formData = new FormData()
      formData.append('capture_id', response.data._id)
      for (let i = 0; i < form.value.files.length; i++) {
        console.log(form.value.files[i])
        formData.append('files[]', form.value.files[i].file)
      }
      await axios.post('/captures/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }

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
  } finally {
    isSaving.value = false
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
  isSavingDraftMode.value = true
  await onSubmit()
  isSavingDraftMode.value = false
}

const isGoogleSigninPressed = ref(false)
const onGoogleSignin = async () => {
  try {
    isGoogleSigninPressed.value = true
    const response = await axios.get(
      `${baseURL}/auth/google-drive/get-auth-url?callback=//${window.location.hostname}${
        window.location.port ? ':' : ''
      }${window.location.port}/auth/google-callback`
    )
    if (response.status === 200) {
      window.open(response.data, '_self')
    }
  } catch (error) {
    console.log(error)
  } finally {
    isGoogleSigninPressed.value = false
  }
}
</script>
