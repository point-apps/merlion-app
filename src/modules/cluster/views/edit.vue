<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Cluster</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'master' }, { name: 'cluster', path: '/master/cluster' }, { name: form.name }]"
      />
    </div>
    <div class="card p-4 space-y-5">
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
          <textarea v-model="form.suggestion" rows="5" class="form-input" type="text" />
        </label>
        <div>
          <button type="submit" class="btn btn-base rounded text-slate-100 bg-blue-500 hover:bg-blue-600">
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
import axios from '@/axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  name: '',
  alias: '',
  description: '',
  typologies: [],
  suggestion: '',
})

onMounted(async () => {
  const result = await axios.get('/clusters/' + route.params.id)
  form.value.name = result.data.name
  form.value.alias = result.data.alias
  form.value.description = result.data.description
  form.value.typologies = result.data.typologies
  form.value.suggestion = result.data.suggestion
})

const onSubmit = async () => {
  await axios.patch('/user/' + route.params.id, {
    username: form.value.username,
    email: form.value.email,
    fullName: form.value.fullName,
  })
}

const onSubmitPassword = () => {}
</script>
