<script setup lang="ts">
import { ref } from 'vue'

interface IProps {
  file: any
}

const isLoading = ref(true)
const props = withDefaults(defineProps<IProps>(), {})

const onLoad = function () {
  isLoading.value = false
}
</script>
<template>
  <video v-if="file?.mimeType?.includes('video')" controls class="w-full" :class="isLoading ? 'hidden' : ''">
    <source :src="file.url" @load="onLoad" />
    Your browser does not support HTML5 video.
  </video>
  <img
    v-else
    :src="file.url"
    alt="activity"
    class="max-h-[800px] w-full object-cover md:max-h-[400px]"
    :class="isLoading ? 'hidden' : ''"
    @load="onLoad"
  />
  <div
    v-if="isLoading"
    class="flex h-40 w-full items-center justify-center bg-gray-800 dark:bg-gray-300 md:h-[400px]"
    @load="onLoad"
  >
    <div
      class="block h-20 w-20 animate-spin rounded-full border border-white border-b-transparent bg-transparent transition"
    ></div>
  </div>
</template>
