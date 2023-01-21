<template>
  <section id="bottom-navigation" class="block fixed border-t inset-x-0 bottom-0 z-10 dark:bg-slate-800 bg-white">
    <div id="tabs" class="flex justify-between">
      <a
        href="#"
        class="w-full focus:text-slate-500 hover:text-slate-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <fa-icon icon="fa-thin fa-home w-6 h-6" />
        <span class="tab tab-home block text-xs">Home</span>
      </a>
      <a
        href="#"
        class="w-full focus:text-slate-500 hover:text-slate-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <fa-icon icon="fa-thin fa-chart-line w-6 h-6" />
        <span class="tab tab-explore block text-xs">Report</span>
      </a>
      <a
        href="#"
        class="w-full focus:text-slate-500 hover:text-slate-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <fa-icon icon="fa-thin fa-circle-camera w-6 h-6" />
        <span class="tab tab-kategori block text-xs">Capture</span>
      </a>
      <a
        href="#"
        class="w-full focus:text-slate-500 hover:text-slate-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <fa-icon icon="fa-thin fa-bell w-6 h-6" />
        <span class="tab tab-whishlist block text-xs">Notification</span>
      </a>
      <a
        href="#"
        class="w-full focus:text-slate-500 hover:text-slate-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <fa-icon icon="fa-thin fa-user w-6 h-6" />
        <span class="tab tab-account block text-xs">Account</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
