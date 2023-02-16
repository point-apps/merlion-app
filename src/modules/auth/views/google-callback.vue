<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()

const { exchangeOAuthToken } = useAuthStore()

const serialize = (obj: any) => {
  var str = []
  for (var p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

if (route.query.error) {
  router.push(`/signin?${serialize(route.query)}`)
} else {
  await exchangeOAuthToken('google', route.query.code as string)
  router.push('/')
}
</script>
