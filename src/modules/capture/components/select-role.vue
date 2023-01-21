<template>
  <component
    :is="BaseSelect"
    v-model="searchText"
    placeholder="Select Role"
    :options="roles"
    @blur="onBlur()"
  ></component>
</template>

<script setup lang="ts">
import BaseSelect, { type OptionInterface } from '@/components/base-select.vue'
import { onMounted, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const isShow = ref(false)
const selected = ref()
const roles = ref([
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'user',
    label: 'user',
  },
])
const options = ref<OptionInterface[]>([])
const searchText = ref('')
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  // const result = await readAllRole('')
  // roles.value = result
  isLoading.value = false
})

const latestSelectedRole = ref()

const onBlur = () => {
  // if (!roles.value.some((el) => el.name === searchText.value)) {
  //   searchText.value = latestSelectedRole.value
  // }
  // isShow.value = false
}

const readAllRole = async (searchText: string) => {
  return [
    {
      value: 'admin',
      label: 'admin',
    },
    {
      value: 'user',
      label: 'user',
    },
  ]
}

// watchDebounced(
//   searchText,
//   async () => {
//     const result = await readAllRole(searchText.value)
//     roles.value = result
//   },
//   { debounce: 500, maxWait: 1000 }
// )
</script>
