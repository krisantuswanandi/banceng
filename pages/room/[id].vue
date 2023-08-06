<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const player = usePlayer()

const id = route.params.id

if (!player.name.value) {
  router.push("/")
}

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "A",
  "J",
  "Q",
  "K",
]

const faces = [
  "S",
  "D",
  "C",
  "H",
]
</script>

<template>
  <div>
    <NuxtLink to="/" class="text-sm text-blue underline">back to home</NuxtLink>
  </div>
  <div style="margin-bottom: 16px">
    <span>Room #</span>
    <span class="font-bold">{{ id }}</span>
  </div>
  <RoomGame />
  <div v-for="face in faces" class="flex gap-2 mt-2">
    <div v-for="num in numbers">
      <CardFace :num="num" :face="face" />
    </div>
  </div>
</template>
