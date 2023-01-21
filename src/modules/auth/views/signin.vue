<template>
  <div class="w-full max-w-[26rem] p-4 sm:px-5">
    <div class="w-full flex items-center justify-center">
      <img class="h-16 w-16" src="@/assets/logo-icon.png" alt="logo" />
      <div>
        <h2 class="dark:text-slate-100 font-semibold text-slate-600">Welcome To {{ name }}</h2>
        <p class="dark:text-slate-300 text-slate-400">Please sign in to continue</p>
      </div>
    </div>
    <div class="card mt-5 rounded-lg p-5 lg:p-7">
      <form class="space-y-4" @submit.prevent="onSubmit()">
        <label class="relative flex">
          <input v-model="form.username" class="form-input peer pl-9 pr-2" placeholder="Username" type="text" />
          <span class="absolute flex h-full w-10 items-center justify-center text-slate-400">
            <fa-icon icon="fa-regular fa-user"></fa-icon>
          </span>
        </label>
        <label class="relative flex">
          <input
            v-model="form.password"
            class="form-input peer pl-9 pr-2"
            placeholder="Password"
            type="password"
            autocomplete="on"
          />
          <span class="absolute flex h-full w-10 items-center justify-center text-slate-400">
            <fa-icon icon="fa-regular fa-lock"></fa-icon>
          </span>
        </label>
        <div>
          <button
            type="submit"
            :disabled="isSubmitted"
            class="btn btn-base btn-blue w-full"
            :class="{ '!bg-slate-500': isSubmitted }"
          >
            Signin
            <span v-if="isSubmitted">
              <fa-icon class="fa-regular fa-spinner ml-1 animate-spin"></fa-icon>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import cookie from '@point-hub/vue-cookie'
import axios from '@/axios'
import { name } from '@/config/app'
import { useBaseNotification } from '@/composable/notification'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { notification } = useBaseNotification()

const form = ref({
  username: '',
  password: '',
})
const isSubmitted = ref(false)
const onSubmit = async () => {
  try {
    isSubmitted.value = true
    const response = await axios.post('/auth/signin', {
      username: form.value.username,
      password: form.value.password,
    })

    if (response.status === 200) {
      cookie.set('token', response.data.token)
      authStore.login()
      router.push('/')
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      notification(
        error.response?.data.code + ' ' + error.response?.statusText,
        error.response?.data.message,
        'warning'
      )
    } else if (error instanceof AxiosError) {
      notification(error.code as string, error.message, 'warning')
    } else {
      notification('Unknown Error', 'error as string', 'warning')
    }
  } finally {
    isSubmitted.value = false
  }
}
</script>
