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
  <!-- Video Preview -->
  <video v-if="file.mimeType.includes('video')" controls class="w-full rounded object-contain" @loadeddata="onLoad">
    <source :src="file.url" />
    Your browser does not support HTML5 video.
  </video>

  <!-- Image Preview -->
  <img
    v-else-if="file.mimeType.includes('image')"
    :src="file.url"
    alt="Uploaded file"
    class="w-full rounded object-contain"
    @load="onLoad"
  />
  <!-- <div
    v-if="isLoading"
    class="flex h-40 w-full items-center justify-center bg-gray-800 dark:bg-gray-300 md:h-[400px]"
    @load="onLoad"
  >
    <div
      class="block size-20 animate-spin rounded-full border border-white border-b-transparent bg-transparent transition"
    ></div>
  </div> -->
</template>
