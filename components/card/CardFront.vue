<script setup lang="ts">
import { Suit } from "@/utils/card"

const props = defineProps<{
  rank: string;
  suit: Suit;
}>()

const isRed = props.suit === Suit.Diamonds || props.suit === Suit.Hearts
</script>

<template>
  <div class="relative rounded border border-black bg-white w-full h-full">
    <div :class="`flex justify-center items-center w-full h-full ${isRed ? 'text-red-600' : 'text-black'}`">
      <span class="text-2xl">
        <div v-if="rank !== 'A'">{{ rank }}</div>
        <div v-else-if="suit === Suit.Diamonds" class="i-game-icons-diamonds scale-125" />
        <div v-else-if="suit === Suit.Clubs" class="i-game-icons-clubs" />
        <div v-else-if="suit === Suit.Hearts" class="i-game-icons-hearts" />
        <div v-else-if="suit === Suit.Spades" class="i-game-icons-spades" />
      </span>
      <CardSuit class="absolute top-1 left-0.5" :suit="suit" :rank="rank" />
      <CardSuit class="absolute bottom-1 right-0.5 rotate-180" :suit="suit" :rank="rank" />
    </div>
  </div>
</template>
