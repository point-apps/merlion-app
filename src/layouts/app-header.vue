<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="header-container relative flex w-full">
      <div class="flex w-full items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <component :is="ComponentToggleSidebar" class="pr-2" />
          <p class="font-semibold uppercase"></p>
        </div>

        <!-- Right: Header Buttons -->
        <div v-if="path === '/strength-mapping/capture'">
          <div class="flex items-center">
            <input
              v-model="searchText"
              class="form-input mr-2 rounded-r-lg"
              placeholder="Search"
              type="text"
              :class="{
                'opacity-100 transition-all duration-500 ease-in': showSearch,
                'invisible opacity-0 transition-all duration-700 ease-out': !showSearch,
              }"
            />
            <div class="hover:cursor-pointer" @click="onClickSearch()">
              <fa-icon icon="fa-regular fa-magnifying-glass fa-2xl" style="color: #aaaaaa"></fa-icon>
            </div>
          </div>
        </div>
        <div v-else>
          <router-link to="/account/profile" class="flex items-center justify-center space-x-2">
            <fa-icon icon="fa-solid fa-user-circle w-5 h-5"></fa-icon>
            <p>{{ name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
const route = useRoute()

const path = computed(() => route.path)

const authStore = useAuthStore()
const name = authStore.$state.user.name

const searchStore = useSearchStore()
const { searchText } = storeToRefs(searchStore)

const showSearch = ref(false)

const onClickSearch = () => {
  showSearch.value = !showSearch.value
}
</script>
