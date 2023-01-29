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
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Activity</span>
          <input v-model="form.activity" class="form-input" type="text" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Describe the activity</span>
          <textarea v-model="form.activity" rows="5" class="form-input" type="text" />
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Clusters</span>
          <input
            v-model="form.activity"
            class="form-input"
            type="text"
            placeholder="Choose cluster type based on activity"
          />
          <popper placement="bottom-start">
            <label class="input-group">
              <input type="text" class="form-input w-full" placeholder="Type username..." />
            </label>
            <template #content="contentProps">
              <div
                class="border-slate-100 dark:border-slate-800 dark:bg-slate-700 mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg bg-white sm:m-0 sm:w-80 overflow-auto"
              >
                <ul class="my-2">
                  <div v-for="cluster in clusters" :key="cluster.name">
                    <li v-for="cluster in clusters" :key="cluster.name">
                      <button
                        class="dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex items-center space-x-3.5 px-4 py-2 pr-8 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 w-full text-left"
                        @click="contentProps.close()"
                      >
                        <div>
                          <p class="dark:text-slate-100 text-slate-700 line-clamp-1">{{ cluster.name }}</p>
                          <p class="dark:text-slate-300 text-xs text-slate-500">Web Developer</p>
                        </div>
                      </button>
                    </li>
                  </div>

                  <li>
                    <button
                      class="dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex items-center space-x-3.5 px-4 py-2 pr-8 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 w-full text-left"
                      @click="contentProps.close()"
                    >
                      <div>
                        <p class="dark:text-slate-100 text-slate-700 line-clamp-1">Simon Tods</p>
                        <p class="dark:text-slate-300 text-xs text-slate-500">Web Developer</p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dark:hover:bg-slate-600 dark:focus:bg-slate-600 flex items-center space-x-3.5 px-4 py-2 pr-8 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 w-full text-left"
                      @click="contentProps.close()"
                    >
                      <div>
                        <p class="dark:text-slate-100 text-slate-700 line-clamp-1">Simon Tods</p>
                        <p class="dark:text-slate-300 text-xs text-slate-500">Web Developer</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </template>
          </popper>
        </label>
        <label class="block space-y-1">
          <span class="font-semibold">Observer</span>
          <input
            v-model="form.activity"
            class="form-input"
            type="text"
            placeholder="who assists in observing this activity (Father / Mother / Aunty)"
          />
        </label>
        <div class="flex flex-row space-x-2">
          <button type="submit" class="btn btn-base rounded flex-1 text-slate-100 bg-blue-500 hover:bg-blue-600">
            Save
          </button>
          <button type="submit" class="btn btn-base rounded flex-1 text-slate-100 bg-slate-500 hover:bg-slate-600">
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
// import { useApi as useRoleApi, type RoleInterface } from '@/modules/role/composable/api'
// import SelectRole from '@/modules/user/components/select-role.vue'

// const roleApi = useRoleApi()

const router = useRouter()
const isShowSelect = ref(false)
const form = ref({
  date: '21 Jan 2023',
  email: '',
  password: '',
  fullName: '',
  role: '',
})

const roles = ref<RoleInterface[]>([])
const isLoadingRoles = ref(false)

onMounted(async () => {
  isLoadingRoles.value = true
  getClusters()
  // roles.value = result.roles
  isLoadingRoles.value = false
})

const onSubmit = async () => {
  await axios.post('/user', form.value)
  router.push('/master/user')
}

const latestSelectedRole = ref()

const clusters = ref({})
const getClusters = async () => {
  const result = await axios.get('/clusters', {
    params: {
      limit: 10,
      page: 1,
    },
  })
  clusters.value = result.data.data
}

// const onBlurSelectRole = () => {
//   if (!roles.value.some((el) => el.name === form.value.role)) {
//     form.value.role = latestSelectedRole.value
//   }
//   isShowSelect.value = false
// }

const choose = (text: string) => {
  if (roles.value.some((el) => el.name === text)) {
    latestSelectedRole.value = text
    form.value.role = text
  } else {
    form.value.role = ''
  }
  isShowSelect.value = false
}

const readAllRole = async () => {
  // return await roleApi.readAll(1, 10, form.value.role)
}

// watchDebounced(
//   form.value,
//   async () => {
//     const result = await readAllRole()
//     roles.value = result.roles
//   },
//   { debounce: 500, maxWait: 1000 }
// )
</script>
