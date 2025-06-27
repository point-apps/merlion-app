<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="header-container relative flex w-full">
      <div class="flex w-full items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <component :is="ComponentToggleSidebar" class="pr-2" />
          <p class="font-semibold uppercase"></p>
        </div>

        <!-- Right: Header Buttons -->
        <div v-if="path === '/strength-mapping/capture'">
          <div class="flex items-center">
            <input
              v-model="searchText"
              class="form-input mr-2 rounded-r-lg"
              placeholder="Search"
              type="text"
              :class="{
                'opacity-100 transition-all duration-500 ease-in': showSearch,
                'hidden opacity-0 transition-all duration-700 ease-out': !showSearch,
              }"
            />

            <VueDatePicker
              v-model="searchDate"
              class="md:text-md mr-2 w-full text-xs"
              :class="{
                'opacity-100 transition-all duration-500 ease-in': showDate,
                'hidden opacity-0 transition-all duration-700 ease-out': !showDate,
              }"
              range
              format="yyyy/MM/dd"
              hide-input-icon
              :enable-time-picker="false"
            />
            <div v-if="selectedUser" class="mr-2 hover:cursor-pointer" @click="onDownload()">
              <fa-icon icon="fa-regular fa-arrow-down-to-line fa-2xl" style="color: #aaaaaa"></fa-icon>
            </div>
            <base-popover ref="popoverRef" placement="bottom-start">
              <div class="mr-2 hover:cursor-pointer" @click="popoverRef.toggle()">
                <fa-icon icon="fa-regular fa-filter fa-2xl" style="color: #aaaaaa"></fa-icon>
              </div>
              <template #content>
                <div class="popper-root">
                  <div class="rounded-t-lg bg-slate-100 text-slate-600 shadow dark:bg-slate-800 dark:text-slate-200">
                    <div class="mb-2 flex items-center justify-between px-4 pt-2">
                      <div class="flex items-center space-x-2">
                        <h3 class="font-medium text-slate-700 dark:text-slate-100">Select User</h3>
                      </div>

                      <button
                        variant="text"
                        class="btn -mr-1.5 size-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-slate-300/20 dark:focus:bg-slate-300/20 dark:active:bg-slate-300/25"
                      >
                        <!-- <icon icon="i-far-maximize" /> -->
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-col gap-4 overflow-auto p-4 shadow-lg">
                    <input v-model="search" class="form-input" type="text" placeholder="Search" />
                    <div v-for="user in users" :key="user" class="flex flex-col gap-2">
                      <label class="flex gap-2">
                        <input
                          type="checkbox"
                          :value="user.name"
                          :checked="selectedUser === user.name"
                          @change="() => selectUser(user.name)"
                        />
                        {{ user.name }}
                      </label>
                    </div>
                    <button
                      type="button"
                      class="btn btn-base relative flex-1 rounded bg-blue-500 text-slate-100 hover:bg-blue-600 dark:bg-blue-700"
                      @click="popoverRef.toggle()"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </template>
            </base-popover>
            <div class="mr-2 hover:cursor-pointer" @click="onClickDate()">
              <fa-icon icon="fa-regular fa-calendar fa-2xl" style="color: #aaaaaa"></fa-icon>
            </div>
            <div class="hover:cursor-pointer" @click="onClickSearch()">
              <fa-icon icon="fa-regular fa-magnifying-glass fa-2xl" style="color: #aaaaaa"></fa-icon>
            </div>
          </div>
        </div>
        <div v-else>
          <router-link to="/account/profile" class="flex items-center justify-center space-x-2">
            <fa-icon icon="fa-solid fa-user-circle w-5 h-5"></fa-icon>
            <p>{{ authStore.$state.user.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, watch, ref, onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'
import BasePopover from '@/components/base-popover.vue'
import { storeToRefs } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import axios from '@/axios'
import * as XLSX from 'xlsx'
import { format, parseISO } from 'date-fns'

const route = useRoute()
const popoverRef = ref()
const search = ref('')

const path = computed(() => route.path)

const authStore = useAuthStore()

const searchStore = useSearchStore()
const { searchText, searchDate } = storeToRefs(searchStore)

const showSearch = ref(false)
const showDate = ref(false)

const onClickSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    showDate.value = false
  }
}

const onClickDate = () => {
  showDate.value = !showDate.value
  if (showDate.value) {
    showSearch.value = false
  }
}

const captures = ref()
const getCaptures = async (page = 1) => {
  const result = await axios.get('/captures', {
    params: {
      pageSize: 999999999,
      page: page,
      sort: {
        date: 'desc',
      },
      search: {
        fromDate: searchDate.value[0],
        toDate: searchDate.value[1],
      },
      filter: {
        isDraft: false,
      },
    },
  })
  captures.value = result.data.data
}

const onDownload = async () => {
  await getCaptures()

  console.log(captures.value)
  const formatted = ref<any[]>([])
  for (const element of captures.value) {
    console.log(element.clusters)
    element.clusters.forEach((element2, index2) => {
      if (index2 === 0) {
        formatted.value.push({
          'Activity date': format(parseISO(element.date), 'dd MMM yyyy'),
          Activity: element.activity.trim(),
          'Describe the activity': element.description.trim(),
          Observer: element.observer.trim(),
          Teachers: element.teachers.trim(),
          'Activity Note': element.activity_note.trim(),
          'Strength cluster': element2.name,
          'Strength Cluster Activity': element2.typology,
          'Strength Experience': element2.ikigai ? element2.ikigai.join(', ') : '',
        })
      } else {
        formatted.value.push({
          'Activity date': '',
          Activity: '',
          'Describe the activity': '',
          Observer: '',
          Teachers: '',
          'Activity Note': '',
          'Strength cluster': element2.name,
          'Strength Cluster Activity': element2.typology,
          'Strength Experience': element2.ikigai ? element2.ikigai.join(', ') : '',
        })
      }
    })
  }

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(formatted.value)

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // Trigger download
  const startDate = format(parseISO(searchDate.value[0].toString()), 'ddMMMyyyy')
  const endDate = format(parseISO(searchDate.value[0].toString()), 'ddMMMyyyy')
  XLSX.writeFile(workbook, `Capture Activity_${selectedUser.value}_${startDate}-${endDate}.xlsx`)
}

const users = ref()

watch(search, async () => {
  await getUsers()
})

const getUsers = async (page = 1) => {
  const result = await axios.get('/users', {
    params: {
      limit: 10,
      page: page,
      sort: 'name',
      filter: {
        $or: [{ name: { $regex: search.value, $options: 'i' } }],
      },
    },
  })
  users.value = result.data.data
}

onMounted(async () => {
  await getUsers()
})

const selectedUser = ref<string | null>(null)

const selectUser = (userName: string) => {
  selectedUser.value = selectedUser.value === userName ? null : userName
}
</script>

<style scoped>
.popper-root {
  @apply border-slate-100 shadow mx-4 mt-1 max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex flex-col border rounded-lg bg-white sm:m-0 sm:w-80 dark:border-slate-800 dark:bg-slate-700;
}
</style>
