<template>
  <ul class="scrollbar-hidden flex items-center gap-2 overflow-x-auto">
    <li v-for="(breadcrumb, index) in props.breadcrumbs" :key="index" class="flex items-center justify-center gap-2">
      <router-link
        class="text-primary hover:text-primary-focus dark:text-accent-light dark:hover:text-accent whitespace-nowrap lowercase transition-colors"
        :class="{ 'text-blue-500': breadcrumb.path }"
        :to="breadcrumb.path ?? '#'"
      >
        {{ breadcrumb.name }}
      </router-link>
      <fa-icon
        v-if="index + 1 < breadcrumbs.length"
        icon="fa-solid fa-angle-right w-3 h-3"
        :class="{ '!text-blue-500': breadcrumb.path }"
      ></fa-icon>
    </li>
  </ul>
</template>

<script lang="ts">
interface Breadcrumb {
  name: string
  path?: string
}
</script>

<script setup lang="ts">
const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()
</script>
