<template>
  <section id="bottom-navigation" class="fixed inset-x-0 bottom-0 z-10 block border-t bg-white dark:bg-slate-800">
    <div id="tabs" class="flex justify-between">
      <router-link
        to="/"
        class="inline-block w-full justify-center pt-2 pb-1 text-center hover:text-slate-500 focus:text-slate-500"
      >
        <fa-icon icon="fa-thin fa-home w-6 h-6" />
        <span class="tab tab-home block text-xs">Home</span>
      </router-link>
      <router-link
        to="/strength-mapping/report/ikigai"
        class="inline-block w-full justify-center pt-2 pb-1 text-center hover:text-slate-500 focus:text-slate-500"
      >
        <fa-icon icon="fa-thin fa-chart-line w-6 h-6" />
        <span class="tab tab-explore block text-xs">Report</span>
      </router-link>
      <router-link
        to="/strength-mapping/capture/create"
        class="inline-block w-full justify-center pt-2 pb-1 text-center hover:text-slate-500 focus:text-slate-500"
      >
        <fa-icon icon="fa-thin fa-circle-camera w-6 h-6" />
        <span class="tab tab-kategori block text-xs">Capture</span>
      </router-link>
      <router-link
        to="/notification"
        class="inline-block w-full justify-center pt-2 pb-1 text-center hover:text-slate-500 focus:text-slate-500"
      >
        <fa-icon icon="fa-thin fa-bell w-6 h-6" />
        <span class="tab tab-whishlist block text-xs">Notification</span>
      </router-link>
      <router-link
        to="/account/profile"
        class="inline-block w-full justify-center pt-2 pb-1 text-center hover:text-slate-500 focus:text-slate-500"
      >
        <fa-icon icon="fa-thin fa-user w-6 h-6" />
        <span class="tab tab-account block text-xs">Account</span>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
