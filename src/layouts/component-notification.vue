<template>
  <button
    class="btn relative rounded-full hover:bg-slate-300/20 focus:bg-slate-300/20 dark:hover:bg-slate-300/20 dark:focus:bg-slate-300/20"
  >
    <fa-icon icon="fa-regular fa-bell w-5 h-5" class="flex h-8 w-8 items-center justify-center" />

    <span class="absolute -top-px -right-px flex h-3 w-3 items-center justify-center">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80"></span>
      <span class="inline-flex h-2 w-2 rounded-full bg-red-400"></span>
    </span>
  </button>
</template>

<script setup lang="ts"></script>
