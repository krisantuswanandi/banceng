<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const player = usePlayer()

const id = route.params.id

if (!player.name.value) {
  router.push("/")
}

const ranks = [
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

const suits = [
  Suit.Diamonds,
  Suit.Clubs,
  Suit.Hearts,
  Suit.Spades,
]
</script>

<template>
  <div>
    <NuxtLink to="/" class="text-sm text-blue underline">back to home</NuxtLink>
  </div>
  <div class="mb-4">
    <span>Room #</span>
    <span class="font-bold">{{ id }}</span>
  </div>
  <RoomGame />
  <div v-for="suit in suits" class="flex gap-2 mt-2">
    <div v-for="rank in ranks">
      <CardPokerCard :rank="rank" :suit="suit" />
    </div>
  </div>
</template>
