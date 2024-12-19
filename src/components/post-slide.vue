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
  <iframe
    v-if="file?.mimeType?.includes('video')"
    :src="`https://drive.google.com/file/d/${file.id}/preview`"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  >
  </iframe>
  <img
    v-else
    :src="`https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`"
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
      class="block size-20 animate-spin rounded-full border border-white border-b-transparent bg-transparent transition"
    ></div>
  </div>
</template>
