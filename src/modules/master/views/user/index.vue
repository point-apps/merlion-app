<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>User</h2>
      <component :is="Breadcrumb" :breadcrumbs="[{ name: 'master', path: '/master' }, { name: 'user' }]" />
    </div>
    <div class="card space-y-5 p-4">
      <div>
        <div class="space-y-1">
          <label class="input-group relative">
            <router-link to="/master/user/invite" class="prepend-input">
              <fa-icon icon="fa-solid fa-plus"></fa-icon>
            </router-link>
            <input v-model="searchText" class="form-input rounded-r-lg" placeholder="Search" type="text" />
            <div
              v-if="isLoadingSearch"
              class="pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 dark:text-slate-300"
            >
              <div
                class="border-slate-150 h-5 w-5 animate-spin rounded-full border-2 border-r-slate-400 dark:border-slate-500 dark:border-r-slate-300"
              ></div>
            </div>
          </label>
        </div>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head">Name</th>
              <th class="basic-table-head">Email</th>
              <th class="basic-table-head">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user._id" class="basic-table-row">
              <td class="basic-table-body">
                <!-- <router-link :to="`/master/user/${user._id}`" class="text-blue-500 hover:text-blue-600"> -->
                {{ user.name }}
                <!-- </router-link> -->
              </td>
              <td class="basic-table-body">{{ user.email }}</td>
              <td class="basic-table-body">{{ user.role }}</td>
              <td class="basic-table-body">
                <button
                  class="btn btn-sm rounded bg-red-500 text-xs text-white"
                  @click="onDelete(user._id, user.email)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="pagination.pageCount > 1" class="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="i in pagination.pageCount"
            :key="i"
            class="btn btn-base border border-slate-800/20 dark:text-slate-100"
            :class="{ 'bg-blue-500 text-slate-100': i === currentPage }"
            @click="onClickPage(i)"
          >
            {{ i }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import axios from '@/axios'
import { watchDebounced } from '@vueuse/core'
import { useBaseNotification } from '@/composable/notification'

interface UserInterface {
  _id: string
  name: string
  email: string
  role: string
}

const users = ref<UserInterface[]>([])
const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 0,
  totalDocument: 0,
})
const isLoadingSearch = ref(false)
const searchText = ref('')
const currentPage = ref(1)
const pageLimit = 10
const { notification } = useBaseNotification()

const onDelete = async (id: string, email: string) => {
  try {
    if (confirm(`are you sure want to delete this user "${email}" ?`)) {
      await axios.delete(`/users/${id}`)
      await getUsers()
      notification('Notification', `Delete user "${email}" success`, 'warning')
    }
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async (page = 1) => {
  const result = await axios.get('/users', {
    params: {
      limit: pageLimit,
      page: page,
      sort: 'name',
      filter: {
        $or: [
          {
            email: { $regex: searchText.value, $options: 'i' },
          },
          {
            name: { $regex: searchText.value, $options: 'i' },
          },
          {
            role: { $regex: searchText.value, $options: 'i' },
          },
        ],
      },
    },
  })
  users.value = result.data.data
  pagination.value = {
    page: result.data.pagination.page,
    pageCount: result.data.pagination.pageCount,
    pageSize: result.data.pagination.pageSize,
    totalDocument: result.data.pagination.totalDocument,
  }
}

const onClickPage = async (page: number) => {
  currentPage.value = page
  await getUsers(page)
}

watch(searchText, () => {
  isLoadingSearch.value = true
})

watchDebounced(
  searchText,
  async () => {
    currentPage.value = 1
    await getUsers()
    isLoadingSearch.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

onMounted(async () => {
  await getUsers()
})
</script>
