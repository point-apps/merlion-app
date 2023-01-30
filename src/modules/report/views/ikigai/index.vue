<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Report</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'strength mapping', path: '/strength-mapping' }, { name: 'report' }]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <div class="grid grid-cols-2">
        <router-link
          to="/strength-mapping/report/spider-chart"
          class="btn btn-base border-y border-l border-gray-500 hover:bg-blue-500 hover:text-white"
          >Spider Chart</router-link
        >
        <router-link to="/strength-mapping/report/ikigai" class="btn btn-base btn-blue">Ikigai</router-link>
      </div>

      <div class="p-4 bg-green-200 rounded flex space-x-2 items-center">
        <fa-icon icon="fa-solid fa-info-circle w-5 h-5"></fa-icon>
        <p>Please click the section on the chart to find out more information.</p>
      </div>

      <h1 class="text-center">Uncaptured</h1>
      <div class="flex justify-center">
        <div class="w-full lg:w-3/4 xl:w-1/2">
          <svg viewBox="0 0 185.5 185.5" class="cursor-pointer">
            <g class="lvl-1">
              <path
                fill="#A80066"
                fill-opacity="0.7"
                stroke="white"
                d="M92.75,47.34A57.49,57.49,0,0,1,147,38.48a57.51,57.51,0,0,0-108.54,0,57.49,57.49,0,0,1,54.27,8.86Z"
                @click="redirectTo('enjoy')"
              />
              <text x="43%" y="11%" style="font-size: 4px" @click="redirectTo('enjoy')">What you love</text>
              <text x="45%" y="15%" style="font-size: 6px; font-weight: bold" @click="redirectTo('enjoy')">Enjoy</text>
              <path
                fill="#1E009F"
                fill-opacity="0.7"
                stroke="white"
                d="M185.5,92.75A57.53,57.53,0,0,0,147,38.48a57.49,57.49,0,0,1-8.86,54.27A57.49,57.49,0,0,1,147,147,57.53,57.53,0,0,0,185.5,92.75Z"
                @click="redirectTo('easy')"
              />
              <text x="79%" y="48.5%" style="font-size: 4px" @click="redirectTo('easy')">What the world</text>
              <text x="89%" y="50.5%" style="font-size: 4px" @click="redirectTo('easy')">Needs</text>
              <text x="88%" y="54.5%" style="font-size: 6px; font-weight: bold" @click="redirectTo('easy')">Easy</text>
              <path
                fill="#006D00"
                fill-opacity="0.7"
                stroke="white"
                d="M92.75,138.16A57.49,57.49,0,0,1,38.48,147,57.51,57.51,0,0,0,147,147a57.49,57.49,0,0,1-54.27-8.86Z"
                @click="redirectTo('excellent')"
              />
              <text x="39%" y="87%" style="font-size: 4px" @click="redirectTo('excellent')">What you're good at</text>
              <text x="43%" y="91%" style="font-size: 6px; font-weight: bold" @click="redirectTo('excellent')">
                Excellent
              </text>
              <path
                fill="#D76200"
                fill-opacity="0.7"
                stroke="white"
                d="M47.34,92.75a57.49,57.49,0,0,1-8.86-54.27,57.51,57.51,0,0,0,0,108.54,57.49,57.49,0,0,1,8.86-54.27Z"
                @click="redirectTo('earn')"
              />
              <text x="4%" y="48.5%" style="font-size: 4px" @click="redirectTo('earn')">What you can</text>
              <text x="4%" y="50.5%" style="font-size: 4px" @click="redirectTo('earn')">be paid for</text>
              <text x="4%" y="54.5%" style="font-size: 6px; font-weight: bold" @click="redirectTo('earn')">Earn</text>
            </g>

            <g class="lvl-2">
              <path
                fill="#6F169E"
                fill-opacity="0.7"
                stroke="white"
                d="M92.75,47.34a57.61,57.61,0,0,1,19,26.39,57.61,57.61,0,0,1,26.39,19A57.49,57.49,0,0,0,147,38.48a57.49,57.49,0,0,0-54.27,8.86Z"
                @click="redirectTo('craft')"
              />
              <text x="65%" y="33%" style="font-size: 5px; font-weight: bold" @click="redirectTo('craft')">Craft</text>
              <path
                fill="#055BD3"
                fill-opacity="0.7"
                stroke="white"
                d="M138.16,92.75a57.61,57.61,0,0,1-26.39,19,57.61,57.61,0,0,1-19,26.39A57.49,57.49,0,0,0,147,147a57.49,57.49,0,0,0-8.86-54.27Z"
                @click="redirectTo('creativity')"
              />
              <text x="61%" y="69%" style="font-size: 5px; font-weight: bold" @click="redirectTo('creativity')">
                Creativity
              </text>
              <path
                fill="#04A126"
                fill-opacity="0.7"
                stroke="white"
                d="M92.75,138.16a57.61,57.61,0,0,1-19-26.39,57.61,57.61,0,0,1-26.39-19A57.49,57.49,0,0,0,38.48,147a57.49,57.49,0,0,0,54.27-8.86Z"
                @click="redirectTo('competency')"
              />
              <text x="22%" y="69%" style="font-size: 5px; font-weight: bold" @click="redirectTo('competency')">
                Competency
              </text>
              <path
                fill="#DC0600"
                fill-opacity="0.7"
                stroke="white"
                d="M47.34,92.75a57.61,57.61,0,0,1,26.39-19,57.61,57.61,0,0,1,19-26.39,57.49,57.49,0,0,0-54.27-8.86,57.49,57.49,0,0,0,8.86,54.27Z"
                @click="redirectTo('contribution')"
              />
              <text x="22%" y="33%" style="font-size: 5px; font-weight: bold" @click="redirectTo('contribution')">
                Contribution
              </text>
            </g>

            <g class="lvl-3">
              <path
                fill="#FF8CCC"
                fill-opacity="0.7"
                stroke="white"
                d="M111.77,73.73a57.61,57.61,0,0,0-19-26.39,57.61,57.61,0,0,0-19,26.39,57.62,57.62,0,0,1,38,0Z"
                @click="redirectTo('vocation')"
              ></path>
              <text x="45%" y="35%" style="font-size: 4px; font-weight: bold" @click="redirectTo('vocation')">
                Vocation
              </text>
              <path
                fill="#01A2E9"
                fill-opacity="0.7"
                stroke="white"
                d="M111.77,73.73a57.62,57.62,0,0,1,0,38,57.61,57.61,0,0,0,26.39-19A57.61,57.61,0,0,0,111.77,73.73Z"
                @click="redirectTo('passion')"
              ></path>
              <text x="63%" y="51%" style="font-size: 4px; font-weight: bold" @click="redirectTo('passion')">
                Passion
              </text>
              <path
                fill="#8AD197"
                fill-opacity="0.7"
                stroke="white"
                d="M73.73,111.77a57.61,57.61,0,0,0,19,26.39,57.61,57.61,0,0,0,19-26.39,57.62,57.62,0,0,1-38,0Z"
                @click="redirectTo('profession')"
              ></path>
              <text x="44%" y="67%" style="font-size: 4px; font-weight: bold" @click="redirectTo('profession')">
                Profession
              </text>
              <path
                fill="#FFCE4D"
                fill-opacity="0.7"
                stroke="white"
                d="M73.73,73.73a57.61,57.61,0,0,0-26.39,19,57.61,57.61,0,0,0,26.39,19,57.62,57.62,0,0,1,0-38Z"
                @click="redirectTo('mission')"
              ></path>
              <text x="28%" y="51%" style="font-size: 4px; font-weight: bold" @click="redirectTo('mission')">
                Mission
              </text>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function redirectTo(path: string) {
  router.push('/strength-mapping/report/ikigai/' + path)
}
</script>
