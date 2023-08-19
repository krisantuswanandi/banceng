<script setup lang="ts">
import { Suit } from "@/utils/card"

const router = useRouter()
const route = useRoute()
const { player } = usePlayer()

const id = route.params.id
const count = ref(0)

if (!player.value) {
  router.push("/")
}

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

import { ref as dbRef, set } from "firebase/database";

const db = useDatabase();
const roomRef = dbRef(db, `rooms/${id}`);

const room = useDatabaseObject<any>(roomRef);

watch(room, (value) => {
  if (value) {
    count.value = Object.keys(value.waitingRoom).length;
  }
}, { immediate: true })

watch(player, value => {
  if (value) {
    const waitingRoomRef = dbRef(db, `rooms/${id}/waitingRoom/${value.id}`);
    set(waitingRoomRef, true);
  }
}, { immediate: true })

async function exit() {
  if (player.value) {
    const waitingRoomRef = dbRef(db, `rooms/${id}/waitingRoom/${player.value.id}`);
    await set(waitingRoomRef, null);
  }

  router.push("/");
}
</script>

<template>
  <ClientOnly>
    <div>
      <button class="text-sm text-blue underline" @click="exit">exit room</button>
    </div>
    <div class="mb-4">
      <span>Room #{{ id }}</span>
      <span v-if="count >= 4" class="font-bold text-green-500 ml-1">(Ready)</span>
      <span v-else-if="count" class="font-bold text-red-500 ml-1">({{ count - 4 }})</span>
    </div>
    <div>Hello, {{ player?.name }}</div>
    <div class="grid grid-cols-13 gap-2 max-w-[1130px]">
      <CardPokerCard v-for="card in shuffledDeck" :rank="card.rank" :suit="card.suit" />
    </div>
  </ClientOnly>
</template>
