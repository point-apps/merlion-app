<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
    </div>
    <div class="card p-4 space-y-5">
      <div class="grid grid-cols-2">
        <router-link class="btn btn-base btn-blue" to="/strength-mapping/report/spider-chart">Spider Chart</router-link>
        <router-link
          to="/strength-mapping/report/ikigai"
          class="btn btn-base border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white"
          >Ikigai</router-link
        >
      </div>

      <h1 class="text-center">Uncaptured</h1>
      <svg viewBox="0 0 185.5 185.5">
        <g class="lvl-1">
          <path
            fill="#A80066"
            fill-opacity="0.7"
            stroke="white"
            d="M92.75,47.34A57.49,57.49,0,0,1,147,38.48a57.51,57.51,0,0,0-108.54,0,57.49,57.49,0,0,1,54.27,8.86Z"
          />
          <text x="43%" y="11%" style="font-size: 4px">What you love</text>
          <text x="45%" y="15%" style="font-size: 6px; font-weight: bold">Enjoy</text>
          <path
            fill="#1E009F"
            fill-opacity="0.7"
            stroke="white"
            d="M185.5,92.75A57.53,57.53,0,0,0,147,38.48a57.49,57.49,0,0,1-8.86,54.27A57.49,57.49,0,0,1,147,147,57.53,57.53,0,0,0,185.5,92.75Z"
          />
          <text x="79%" y="48.5%" style="font-size: 4px">What the world</text>
          <text x="89%" y="50.5%" style="font-size: 4px">Needs</text>
          <text x="88%" y="54.5%" style="font-size: 6px; font-weight: bold">Easy</text>
          <path
            fill="#006D00"
            fill-opacity="0.7"
            stroke="white"
            d="M92.75,138.16A57.49,57.49,0,0,1,38.48,147,57.51,57.51,0,0,0,147,147a57.49,57.49,0,0,1-54.27-8.86Z"
          />
          <text x="39%" y="87%" style="font-size: 4px">What you're good at</text>
          <text x="43%" y="91%" style="font-size: 6px; font-weight: bold">Excellent</text>
          <path
            fill="#D76200"
            fill-opacity="0.7"
            stroke="white"
            d="M47.34,92.75a57.49,57.49,0,0,1-8.86-54.27,57.51,57.51,0,0,0,0,108.54,57.49,57.49,0,0,1,8.86-54.27Z"
          />
          <text x="4%" y="48.5%" style="font-size: 4px">What you can</text>
          <text x="4%" y="50.5%" style="font-size: 4px">be paid for</text>
          <text x="4%" y="54.5%" style="font-size: 6px; font-weight: bold">Earn</text>
        </g>

        <g class="lvl-2">
          <path
            fill="#6F169E"
            fill-opacity="0.7"
            stroke="white"
            d="M92.75,47.34a57.61,57.61,0,0,1,19,26.39,57.61,57.61,0,0,1,26.39,19A57.49,57.49,0,0,0,147,38.48a57.49,57.49,0,0,0-54.27,8.86Z"
          />
          <text x="65%" y="33%" style="font-size: 5px; font-weight: bold">Craft</text>
          <path
            fill="#055BD3"
            fill-opacity="0.7"
            stroke="white"
            d="M138.16,92.75a57.61,57.61,0,0,1-26.39,19,57.61,57.61,0,0,1-19,26.39A57.49,57.49,0,0,0,147,147a57.49,57.49,0,0,0-8.86-54.27Z"
          />
          <text x="61%" y="69%" style="font-size: 5px; font-weight: bold">Creativity</text>
          <path
            fill="#04A126"
            fill-opacity="0.7"
            stroke="white"
            d="M92.75,138.16a57.61,57.61,0,0,1-19-26.39,57.61,57.61,0,0,1-26.39-19A57.49,57.49,0,0,0,38.48,147a57.49,57.49,0,0,0,54.27-8.86Z"
          />
          <text x="22%" y="69%" style="font-size: 5px; font-weight: bold">Competency</text>
          <path
            fill="#DC0600"
            fill-opacity="0.7"
            stroke="white"
            d="M47.34,92.75a57.61,57.61,0,0,1,26.39-19,57.61,57.61,0,0,1,19-26.39,57.49,57.49,0,0,0-54.27-8.86,57.49,57.49,0,0,0,8.86,54.27Z"
          />
          <text x="22%" y="33%" style="font-size: 5px; font-weight: bold">Contribution</text>
        </g>

        <g class="lvl-3">
          <path
            fill="#FF8CCC"
            fill-opacity="0.7"
            stroke="white"
            d="M111.77,73.73a57.61,57.61,0,0,0-19-26.39,57.61,57.61,0,0,0-19,26.39,57.62,57.62,0,0,1,38,0Z"
          ></path>
          <text x="45%" y="35%" style="font-size: 4px; font-weight: bold">Vocation</text>
          <path
            fill="#01A2E9"
            fill-opacity="0.7"
            stroke="white"
            d="M111.77,73.73a57.62,57.62,0,0,1,0,38,57.61,57.61,0,0,0,26.39-19A57.61,57.61,0,0,0,111.77,73.73Z"
          ></path>
          <text x="63%" y="51%" style="font-size: 4px; font-weight: bold">Passion</text>
          <path
            fill="#8AD197"
            fill-opacity="0.7"
            stroke="white"
            d="M73.73,111.77a57.61,57.61,0,0,0,19,26.39,57.61,57.61,0,0,0,19-26.39,57.62,57.62,0,0,1-38,0Z"
          ></path>
          <text x="43.5%" y="67%" style="font-size: 4px; font-weight: bold">Profession</text>
          <path
            fill="#FFCE4D"
            fill-opacity="0.7"
            stroke="white"
            d="M73.73,73.73a57.61,57.61,0,0,0-26.39,19,57.61,57.61,0,0,0,26.39,19,57.62,57.62,0,0,1,0-38Z"
          ></path>
          <text x="28%" y="51%" style="font-size: 4px; font-weight: bold">Mission</text>
        </g>

        <g class="lvl-4" @click="redirectTo('ikigai')">
          <path
            fill="white"
            fill-opacity="0.7"
            d="M111.77,73.73a57.62,57.62,0,0,0-38,0,57.62,57.62,0,0,0,0,38,57.62,57.62,0,0,0,38,0,57.62,57.62,0,0,0,0-38Z"
          />
          <text x="44%" y="51%" style="font-size: 8px; font-weight: bold">Ikigai</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}
</script>
