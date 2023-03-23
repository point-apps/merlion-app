<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Cluster</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[
          { name: 'master', path: '/master' },
          { name: 'cluster', path: '/master/cluster' },
          { name: form.name },
        ]"
      />
    </div>
    <div class="card space-y-5 p-4">
      <form class="flex flex-col space-y-5" @submit.prevent="onSubmit()">
        <label class="block space-y-1">
          <span class="font-bold">Name :</span>
          <p class="capitalize">{{ form.name }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Description :</span>
          <p class="first-letter:capitalize">{{ form.description }}</p>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Typologies :</span>
          <ul>
            <li v-for="(typology, index) in form.typologies" :key="index" class="capitalize">- {{ typology }}</li>
          </ul>
        </label>
        <label class="block space-y-1">
          <span class="font-bold">Suggestion :</span>
          <component :is="BaseTextarea" v-model="form.suggestion"></component>
        </label>
        <div>
          <button type="submit" class="btn btn-base rounded bg-blue-500 text-slate-100 hover:bg-blue-600">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import BaseTextarea from '@/components/base-textarea.vue'
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { useBaseNotification } from '@/composable/notification'

const route = useRoute()
const router = useRouter()

const { notification } = useBaseNotification()

const form = ref({
  name: '',
  alias: '',
  description: '',
  typologies: [],
  suggestion: '',
})

onMounted(async () => {
  const response = await axios.get('/clusters/' + route.params.id)
  form.value.name = response.data.name
  form.value.alias = response.data.alias
  form.value.description = response.data.description
  form.value.typologies = response.data.typologies
  form.value.suggestion = response.data.suggestion
})

const isSubmitted = ref(false)
const onSubmit = async () => {
  const response = await axios.patch('/clusters/' + route.params.id, {
    suggestion: form.value.suggestion,
  })

  if (response.status === 204) {
    notification('Update', 'Update data success', 'success')
    router.push('/master/cluster')
  }
}
</script>
