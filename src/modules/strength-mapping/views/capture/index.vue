<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <div class="flex w-full justify-between">
        <div>
          <h2>Capture</h2>
          <component
            :is="Breadcrumb"
            :breadcrumbs="[
              { name: 'strength mapping', path: '/strength-mapping' },
              { name: 'capture' },
            ]"
          />
        </div>
        <div>
          <!-- <fa-icon icon="fa-regular fa-magnifying-glass fa-2xl" style="color: #aaaaaa"></fa-icon> -->
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-4">
      <div class="flex space-x-4">
        <button
          type="button"
          class="text-md inline-block uppercase leading-normal focus:outline-none focus:ring-0"
          :class="{ 'font-semibold': isDraft === false }"
          @click="onClickStatus(false)"
        >
          Captured
        </button>
        <button
          type="button"
          class="text-md inline-block uppercase leading-normal focus:outline-none focus:ring-0"
          :class="{ 'font-semibold': isDraft === true }"
          @click="onClickStatus(true)"
        >
          Draft
        </button>
      </div>
      <div class="absolute right-8 flex place-items-end space-x-2">
        <router-link to="/strength-mapping/capture/create">
          <fa-icon icon="fa-regular fa-camera fa-lg" />
        </router-link>
        <button
          type="button"
          class="text-md inline-block font-semibold uppercase leading-normal focus:outline-none focus:ring-0"
          :class="{ 'text-blue-500': view === 'feed' }"
          @click="onClickView('list')"
        >
          List
        </button>
        <div class="font-bold">|</div>
        <button
          type="button"
          class="text-md inline-block font-semibold uppercase leading-normal focus:outline-none focus:ring-0"
          :class="{ 'text-blue-500': view === 'list' }"
          @click="onClickView('feed')"
        >
          Feed
        </button>
        <div class="font-bold">|</div>
      </div>
    </div>

    <div v-if="view === 'feed'" class="space-y-5 md:space-y-8">
      <div v-for="(capture, index) in captures" :key="capture._id">
        <div class="card space-y-5 p-4 md:space-y-8 md:p-16">
          <router-link :to="`/strength-mapping/capture/${capture._id}`">
            <div class="space-y-5">
              <div class="flex space-x-4">
                <img
                  class="h-12 w-12 rounded-full md:h-14 md:w-14"
                  src="/blank-profile-picture.svg"
                  alt="avatar"
                />
                <div
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  <div
                    class="text-xs font-semibold text-gray-900 dark:text-white md:text-lg"
                  >
                    {{ capture.createdBy.name }}
                  </div>
                  <div
                    class="md:text-md text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    {{
                      differenceInDays(new Date(), new Date(capture.date)) > 1
                        ? format(new Date(capture.date), "dd MMMM yyyy")
                        : formatDistance(new Date(capture.date), new Date(), {
                            addSuffix: true,
                          })
                    }}
                  </div>
                </div>
              </div>
              <div class="w-full text-justify">
                {{ capture.description }}
              </div>
            </div>
          </router-link>

          <div class="w-full items-center">
            <div v-if="!capture.files" class="font-light italic">
              Not captured any photo or video
            </div>
            <div v-else>
              <swiper
                :slides-per-view="1"
                navigation
                :pagination="{ clickable: true }"
              >
                <swiper-slide
                  v-for="(file, index) in capture.files"
                  :key="index"
                >
                  <video
                    v-if="file.mimeType.includes('video')"
                    controls
                    class="w-full"
                  >
                    <source :src="file.url" />
                    Your browser does not support HTML5 video.
                  </video>
                  <img
                    v-else
                    :src="file.url"
                    alt="activity"
                    class="max-h-[200px] w-full object-cover md:max-h-[400px]"
                  />
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <!-- <router-link :to="`/strength-mapping/capture/${capture._id}`" class="text-blue-500 hover:text-blue-600">
          
        </router-link> -->
      </div>
    </div>

    <div v-if="view === 'list'" class="card space-y-5 p-4">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head w-1">Date</th>
              <th class="basic-table-head">Activity</th>
              <th class="basic-table-head">Cluster</th>
              <th class="basic-table-head w-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(capture, index) in captures"
              :key="capture._id"
              class="basic-table-row"
            >
              <td class="basic-table-body whitespace-nowrap">
                {{ format(new Date(capture.date), "dd-MM-yyyy") }}
              </td>
              <td class="basic-table-body">
                <router-link
                  :to="`/strength-mapping/capture/${capture._id}`"
                  class="text-blue-500 hover:text-blue-600"
                >
                  {{ capture.activity }}
                </router-link>
              </td>
              <td class="basic-table-body">
                <span
                  v-for="(cluster, clusterIndex) in capture.clusters"
                  :key="cluster.name"
                  class="capitalize"
                >
                  {{ cluster.name
                  }}<span v-if="clusterIndex + 1 < capture.clusters.length"
                    >,
                  </span>
                </span>
              </td>
              <td class="basic-table-body">
                <div
                  v-if="!capture.isDraft"
                  class="rounded bg-green-500 px-3 py-1 text-center font-bold text-green-100"
                >
                  Captured
                </div>
                <div
                  v-else
                  class="rounded bg-slate-500 px-3 py-1 text-center font-bold text-slate-100"
                >
                  Draft
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="pagination.pageCount > 1"
          class="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            v-for="i in pagination.pageCount"
            :key="i"
            class="btn btn-base border border-slate-800/20 dark:text-slate-100"
            :class="{ 'bg-blue-500 text-slate-100': i === currentPage }"
            @click="onClickPage(i)"
          >
            {{ i }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Breadcrumb from "@/components/breadcrumb.vue";
import axios from "@/axios";
import { watchDebounced } from "@vueuse/core";
import { differenceInDays, format, formatDistance } from "date-fns";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.css";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, A11y]);

const searchStore = useSearchStore();

const fromDate = ref<string | null>("");
const toDate = ref<string | null>("");
const captures = ref([]);
const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 0,
  totalDocument: 0,
});
const view = ref("feed");
const isLoadingSearch = ref(false);
const isDraft = ref(false);
const { searchText } = storeToRefs(searchStore);
const currentPage = ref(1);
const pageSize = 10;

const getCaptures = async (page = 1) => {
  const result = await axios.get("/captures", {
    params: {
      pageSize: pageSize,
      page: page,
      sort: {
        date: "desc",
      },
      search: {
        activity: searchText.value,
        cluster: searchText.value,
        fromDate: fromDate.value,
        toDate: toDate.value,
      },
      filter: {
        isDraft: isDraft.value as boolean,
      },
    },
  });
  captures.value = result.data.data;
  pagination.value = {
    page: result.data.pagination.page,
    pageCount: result.data.pagination.pageCount,
    pageSize: result.data.pagination.pageSize,
    totalDocument: result.data.pagination.totalDocument,
  };
};

const onClickView = (value: string) => {
  view.value = value;
};

const onClickStatus = async (value: boolean) => {
  isDraft.value = value;
  await getCaptures(currentPage.value);
};

const onClickPage = async (page: number) => {
  currentPage.value = page;
  await getCaptures(page);
};

watch(searchText, () => {
  isLoadingSearch.value = true;
});

watchDebounced(
  searchText,
  async () => {
    currentPage.value = 1;
    await getCaptures();
    isLoadingSearch.value = false;
  },
  { debounce: 500, maxWait: 1000 }
);

const searchFeedState = computed(() => searchStore.searchText);
const searchDateState = computed(() => searchStore.searchDate);

watch(searchFeedState, async () => {
  currentPage.value = 1;
  await getCaptures();
  isLoadingSearch.value = false;
});

watch(searchDateState, async () => {
  if (searchDateState.value) {
    fromDate.value = format(searchDateState.value[0], "yyyy-MM-dd");
    toDate.value = format(searchDateState.value[1], "yyyy-MM-dd");
  } else {
    fromDate.value = null;
    toDate.value = null;
  }
  currentPage.value = 1;
  await getCaptures();
  isLoadingSearch.value = false;
});

onMounted(async () => {
  await getCaptures();
});
</script>
