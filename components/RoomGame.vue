<script setup lang="ts">
import { Suit } from "@/utils/card"

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
  <div class="grid grid-cols-13 gap-2 max-w-[1130px]">
    <CardPokerCard v-for="card in shuffledDeck" :rank="card.rank" :suit="card.suit" />
  </div>
</template>
