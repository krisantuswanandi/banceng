<script setup lang="ts">
const { isPlayerReady } = usePlayer();
</script>

<template>
  <NuxtPage v-if="isPlayerReady" />
  <div class="h-full flex justify-center items-center" v-else>
    <div class="i-eos-icons-bubble-loading text-5xl" />
  </div>
</template>

<style>
html,
body,
#__nuxt {
  --at-apply: h-full;
}

body {
  --at-apply: font-sans px-4 py-2;
}
</style>