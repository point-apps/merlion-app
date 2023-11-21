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
              class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
        <p v-if="errors?.files?.[0]" class="mt-1 text-xs text-red-500">
          {{ 'Please provide a photo to save this form' }}
        </p>
        <p v-if="formErrors.mimeType" class="my-2 text-center text-sm text-red-500">
          {{ formErrors.mimeType }}
        </p>
        <div class="flex flex-col space-x-3 lg:flex-row lg:flex-wrap">
          <div
            v-for="(file, index) in capture.files"
            :key="'old-' + index"
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
              @click="onRemoveSubmittedFile(index)"
            >
              <fa-icon icon="fa-solid fa-xmark" class="text-slate-800 shadow"></fa-icon>
            </button>
          </div>
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
        <div class="rounded-lg border border-gray-300 bg-white p-4">
          <div class="flex flex-row gap-2">
            <div>
              <p class="font-semibold">Tentukan Cluster dan typology yang anda butuhkan?</p>
              <p><i>Anda hanya dapat memilih maksimal 3 cluster </i></p>
            </div>
            <a
              href="https://docs.google.com/spreadsheets/d/1mK8TA4WBoEq7Zdp2H5n3NXAec45uQltYvy0FoHj-noE/edit?usp=sharing"
              target="_blank"
              class="ml-auto flex flex-col gap-1 text-right text-xl"
            >
              <fa-icon icon="fa-solid fa-book" :class="''"></fa-icon>
              <i class="text-xs text-sky-600">Cluster Library</i>
            </a>
          </div>
          <div class="mt-2 block space-y-4">
            <div
              v-for="(cluster, index) in form.clusters"
              :key="index"
              class="space-y-4 bg-green-50 p-4 shadow dark:bg-slate-800"
            >
              <div>
                <p class="mb-2 font-semibold">Pilih Cluster</p>
                <div class="flex flex-row flex-wrap gap-1">
                  <p
                    v-for="cl in clusters"
                    :key="cl._id"
                    class="cursor-pointer space-x-1 rounded-sm border px-3 py-2"
                    :class="[
                      cl._id === cluster.cluster_id ? 'bg-' + cl.name.replace(' ', '-') : 'bg-gray-50',
                      'border-' + cl.name.replace(' ', '-'),
                    ]"
                    @click="chooseCluster(index, cl)"
                  >
                    <span class="flex items-center gap-2 rounded-sm text-sm capitalize">
                      {{ cl.name }}
                      <div
                        class="-my-2 -mr-2 flex h-6 w-6 items-center justify-center"
                        :class="
                          cluster.selectedCluster?._id === cl._id && toggles['cluster_' + index]
                            ? 'rotate-180'
                            : 'rotate-0'
                        "
                        @click="
                          () =>
                            (toggles['cluster_' + index] =
                              cluster.selectedCluster?._id !== cl._id ? true : !toggles['cluster_' + index]) || true
                        "
                      >
                        <fa-icon icon="fa-solid fa-caret-down" :class="''"></fa-icon>
                      </div>
                    </span>
                  </p>
                </div>
                <template v-if="cluster.selectedCluster">
                  <p
                    v-if="toggles['cluster_' + index]"
                    class="mt-2 flex w-full flex-col gap-1 rounded-sm p-2"
                    :class="'bg-' + cluster.selectedCluster.name.replace(' ', '-')"
                  >
                    <span>{{ cluster.selectedCluster?.descriptionId }}</span>
                    <i>{{ cluster.selectedCluster?.description }}</i>
                  </p>
                  <p class="my-2 font-semibold">Pilih Typology</p>
                  <div class="flex flex-row flex-wrap gap-2">
                    <template v-for="(group, a) in cluster.selectedCluster.groups" :key="a">
                      <div
                        v-for="(typology, i) in group.typologies"
                        :key="i"
                        :class="[
                          cluster.typology === typology.name
                            ? 'bg-' + cluster.selectedCluster.name.replace(' ', '-')
                            : 'bg-gray-50',
                          'border-' + cluster.selectedCluster.name.replace(' ', '-'),
                        ]"
                        class="flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 capitalize"
                        @click="chooseTypology(index, typology.name)"
                      >
                        {{ typology.name }}
                        <div
                          class="-my-2 -mr-2 flex h-6 w-6 items-center justify-center"
                          :class="
                            cluster.typology === typology.name && toggles['cluster_' + index + '_typology']
                              ? 'rotate-180'
                              : 'rotate-0'
                          "
                          @click="
                            () =>
                              (toggles['cluster_' + index + '_typology'] =
                                cluster.typology === typology.name
                                  ? !toggles['cluster_' + index + '_typology']
                                  : true) || true
                          "
                        >
                          <fa-icon icon="fa-solid fa-caret-down" :class="''"></fa-icon>
                        </div>
                      </div>
                    </template>
                  </div>
                  <p
                    v-if="cluster.typology && toggles['cluster_' + index + '_typology']"
                    class="mt-2 flex w-full flex-col gap-1 rounded-sm p-2"
                    :class="'bg-' + cluster.selectedCluster.name.replace(' ', '-')"
                  >
                    <span>{{ getSelectedTypology(cluster)?.descriptionId }}</span>
                    <i>{{ getSelectedTypology(cluster)?.description }}</i>
                  </p>
                </template>
              </div>
              <div v-if="cluster.typology" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <p class="col-span-2 mb-2 font-semibold sm:col-span-4">Pilih Penilaian</p>
                <button
                  type="button"
                  :class="{
                    'bg-sky-400 text-white dark:bg-sky-700': isIkigaiChoosen(cluster, 'easy'),
                    'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'easy'),
                  }"
                  class="border border-sky-400 px-3 py-2 shadow"
                  @click="onChooseIkigai(cluster, 'easy')"
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
                  @click="onChooseIkigai(cluster, 'enjoy')"
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
                  @click="onChooseIkigai(cluster, 'excellent')"
                >
                  Excellent
                </button>
                <button
                  type="button"
                  :class="{
                    'bg-sky-400 text-white dark:bg-sky-700': isIkigaiChoosen(cluster, 'earn'),
                    'bg-slate-50 dark:bg-slate-700': !isIkigaiChoosen(cluster, 'earn'),
                  }"
                  class="border border-sky-400 px-3 py-2 shadow"
                  @click="onChooseIkigai(cluster, 'earn')"
                >
                  Earn
                </button>
              </div>
            </div>
            <button
              v-if="form.clusters.length < 3"
              class="rounded bg-sky-500 px-4 py-2 font-medium text-white transition-all hover:bg-sky-600"
              @click="addCluster()"
            >
              Add Cluster
            </button>
          </div>
        </div>
        <div class="flex flex-row space-x-2">
          <button
            :disabled="isSaving"
            :class="[{ 'bg-gray-500': isSaving }]"
            type="submit"
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
              class="pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
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
import { useRoute, useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useBaseNotification } from '@/composable/notification'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

const { notification } = useBaseNotification()
const route = useRoute()
const router = useRouter()
const errors = ref()
const formErrors = ref<any>({ mimeType: '' })
const toggles = ref<any>({})

interface CaptureClusterInterface {
  cluster_id: string | null
  selectedCluster?: any
  selectedTypologyIndex?: any
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
const isSaving = ref(false)
const isSavingDraftMode = ref(false)

const authStore = useAuthStore()
const isGrantedUploadGoogleDrive = () => {
  const googleScopes = authStore.$state.user.googleScopes
  return googleScopes?.includes('https://www.googleapis.com/auth/drive.file')
}

const getSelectedTypology = function (cluster: any) {
  return cluster.selectedCluster?.groups
    ?.find((g: any) => g.typologies.some((t: any) => t.name === cluster.typology))
    ?.typologies?.find((t: any) => t.name === cluster.typology)
}

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

const onRemoveSubmittedFile = (index: number) => {
  axios.post('/captures/' + route.params.id + '/delete-upload', {
    id: capture.value.files[index].id,
  })
  capture.value.files.splice(index, 1)
}

const chooseCluster = function (index: number, cluster: any) {
  form.value.clusters[index] = {
    cluster_id: cluster._id,
    name: cluster.name,
    typology: '',
    ikigai: [],
    selectedCluster: cluster,
  }
}

const chooseTypology = function (index: number, typology: string) {
  form.value.clusters[index].typology = typology
}

const addCluster = function () {
  form.value.clusters.push({
    cluster_id: '',
    name: '',
    typology: '',
    ikigai: [],
  })
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

onMounted(async () => {
  isLoadingRoles.value = true
  await getClusters()
  await getCapture()
  isLoadingRoles.value = false
})

const onSubmit = async () => {
  try {
    isSaving.value = true
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

    let values = {
      ...form.value,
      clusters: form.value.clusters.map((c) => ({
        ...c,
        selectedCluster: null,
      })),
    }

    const response = await axios.patch('/captures/' + route.params.id, { ...values, date: date })

    if (form.value.files.length) {
      const formData = new FormData()
      formData.append('capture_id', route.params.id.toString())
      for (let i = 0; i < form.value.files.length; i++) {
        formData.append('files[]', form.value.files[i].file)
      }
      await axios.post('/captures/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }

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
  } finally {
    isSaving.value = false
  }
}

const isGoogleSigninPressed = ref(false)
const searchCluster = ref()
const clusters = ref<any>([])
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
  form.value.clusters = result.data.clusters.map((c: any) => {
    return {
      ...c,
      selectedCluster: clusters.value.find((a: any) => a._id === c.cluster_id),
    }
  })
  form.value.observer = result.data.observer
  if (result.data.files) {
    form.value.files = result.data.files
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
  isSavingDraftMode.value = true
  await onSubmit()
  isSavingDraftMode.value = false
}
</script>
