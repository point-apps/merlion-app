<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
      <img class="w-8 h-8" src="@/assets/logo-icon.png" alt="logo" />
      <span>Point</span>
      <span class="font-light">hub</span>
    </a>
    <form @submit.prevent="onSubmit()">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username or email
              </label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                name="username"
                class="focus:ring-blue-600 focus:border-blue-600 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                autocomplete="username"
              />
              <p v-for="(error, index) in errors?.username" :key="index" class="text-red-500 mt-1 text-xs">
                {{ error }}
              </p>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                placeholder="••••••••"
                autocomplete="current-password"
                class="focus:ring-blue-600 focus:border-blue-600 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p v-for="(error, index) in errors?.password" :key="index" class="text-red-500 mt-1 text-xs">
                {{ error }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    class="focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <router-link to="#" class="text-blue-600 dark:text-blue-500 text-sm font-medium hover:underline">
                Forgot password?
              </router-link>
            </div>
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <span
                class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800"
              >
                or continue with
              </span>
            </div>
            <div class="gap-4 grid grid-cols-1 font-semibold text-gray-600">
              <button class="flex justify-center items-center border rounded py-2 px-3 space-x-2 border-gray-500">
                <fa-icon icon="fa-brands fa-google w-4 h-4"></fa-icon>
                <span>Signin with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBaseNotification } from '@/composable/notification'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { notification } = useBaseNotification()

const form = ref({
  username: '',
  password: '',
})

const errors = ref()

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
