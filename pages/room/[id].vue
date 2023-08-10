<script setup lang="ts">
import { Suit } from "@/utils/card"

const router = useRouter()
const route = useRoute()
const player = usePlayer()

const id = route.params.id
const count = ref(0)

if (!player.name.value) {
  router.push("/")
}

import Pusher from "pusher-js"
import type { PresenceChannel } from "pusher-js";

const config = useRuntimeConfig()
const pusher = new Pusher(config.public.pusherApiKey, {
  cluster: config.public.pusherCluster
})
const channelName = `presence-${id}`
const channel = pusher.subscribe(channelName) as PresenceChannel
function updateCount() { count.value = channel.members.count }
channel.bind("pusher:subscription_succeeded", updateCount)
channel.bind("pusher:member_added", updateCount)
channel.bind("pusher:member_removed", updateCount)

onUnmounted(() => {
  pusher.unsubscribe(channelName)
})

const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
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

const deck: { rank: string; suit: Suit }[] = []
ranks.forEach((rank) => {
  suits.forEach((suit) => {
    deck.push({ rank, suit })
  })
})

const shuffledDeck = deck
  .map((card) => ({ ...card, order: Math.random() }))
  .sort((a, b) => a.order - b.order)
  .map((card) => ({ rank: card.rank, suit: card.suit }))
</script>

<template>
  <ClientOnly>
    <div>
      <NuxtLink to="/" class="text-sm text-blue underline">back to home</NuxtLink>
    </div>
    <div class="mb-4">
      <span>Room #{{ id }}</span>
      <span v-if="count >= 4" class="font-bold text-green-500 ml-1">(Ready)</span>
      <span v-else-if="count" class="font-bold text-red-500 ml-1">({{ count - 4 }})</span>
    </div>
    <RoomGame />
    <div class="grid grid-cols-13 gap-2 max-w-[930px]">
      <CardPokerCard v-for="card in shuffledDeck" :rank="card.rank" :suit="card.suit" />
    </div>
  </ClientOnly>
</template>
