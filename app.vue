<script setup>
import { signInAnonymously } from "firebase/auth"

const appReady = computed(() => {
  const user = useCurrentUser()
  return !!user.value
})

onMounted(async () => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      const auth = useFirebaseAuth()
      await signInAnonymously(auth)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <NuxtPage v-if="appReady" />
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