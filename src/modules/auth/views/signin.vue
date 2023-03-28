<template>
  <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
    <a href="#" class="mb-6 flex items-center text-2xl font-bold text-gray-900 dark:text-white">
      <img class="h-8" src="https://assets.pointhub.net/assets/images/logo/primary/logo.png" alt="logo" />
    </a>
    <form @submit.prevent="onSubmit()">
      <div
        class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
      >
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Username or email
              </label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                name="username"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="name@company.com"
                autocomplete="username"
              />
              <p v-for="(error, index) in errors?.username" :key="index" class="mt-1 text-xs text-red-500">
                {{ error }}
              </p>
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                placeholder="••••••••"
                autocomplete="current-password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
              <p v-for="(error, index) in errors?.password" :key="index" class="mt-1 text-xs text-red-500">
                {{ error }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <!-- <router-link to="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Forgot password?
              </router-link> -->
            </div>
            <button
              type="submit"
              class="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <div class="inline-flex w-full items-center justify-center">
              <hr class="my-2 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700" />
              <span
                class="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
              >
                or continue with
              </span>
            </div>
            <div class="grid grid-cols-1 gap-4 font-semibold text-gray-600">
              <button type="button" class="flex items-center justify-center rounded" @click="onGoogleSignin()">
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
  username: '',
  password: '',
})

const errors = ref()

onMounted(() => {
  if (route.query.error) {
    notification('Authentication Error', route.query.error as string, 'warning')
    router.replace({ query: {} })
  }
})

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

const isSubmitted = ref(false)
const onSubmit = async () => {
  try {
    isSubmitted.value = true
    const response = await authStore.login(form.value.username, form.value.password)

    if (response.status === 200) {
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
