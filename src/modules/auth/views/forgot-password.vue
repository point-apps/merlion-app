<template>
  <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
    <a href="#" class="mb-6 flex items-center text-2xl font-bold text-gray-900 dark:text-white">
      <img class="h-8" src="https://assets.pointhub.net/assets/images/logo/primary/logo.png" alt="logo" />
    </a>
    <form @submit.prevent="onSubmit()">
      <div
        class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
      >
        <div class="w-96 space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Forgot Password
          </h1>
          <div class="space-y-4 md:space-y-6">
            <p>Please contact administrator to request reset your password</p>
            <div class="flex items-center justify-between">
              <router-link to="/signin" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Remember my password?
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="flex space-x-3 p-4 text-gray-600">
      <a href="//pointhub.app/terms">Terms</a>
      <span>|</span>
      <a href="//pointhub.app/privacy">Privacy</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBaseNotification } from '@/composable/notification'
import { useAuthStore } from '@/stores/auth'
import { baseURL } from '@/config/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { notification } = useBaseNotification()

const form = ref({
  email: '',
})

const errors = ref()

onMounted(() => {
  if (route.query.error) {
    notification('Authentication Error', route.query.error as string, 'warning')
    router.replace({ query: {} })
  }
})

const isSubmitted = ref(false)
const onSubmit = async () => {
  try {
    isSubmitted.value = true
    const response = await authStore.requestPassword(form.value.email)

    if (response.status === 200) {
      alert('request password success, please check your email')
      router.push('/')
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      errors.value = error.response?.data.errors
      notification(error.response?.statusText, error.response?.data.message, 'warning')
    } else if (error instanceof AxiosError) {
      notification(error.code as string, error.message, 'warning')
    } else {
      notification('Unknown Error', '', 'warning')
    }
  } finally {
    isSubmitted.value = false
  }
}
</script>
