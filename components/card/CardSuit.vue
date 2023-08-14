<script setup lang="ts">
import { Suit } from "@/utils/card"

defineProps<{
  suit: Suit
  rank: string
}>()
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="h-4 text-sm">
      <div v-if="suit === Suit.Diamonds" class="i-game-icons-diamonds text-base -translate-y-px" />
      <div v-else-if="suit === Suit.Clubs" class="i-game-icons-clubs" />
      <div v-else-if="suit === Suit.Hearts" class="i-game-icons-hearts" />
      <div v-else-if="suit === Suit.Spades" class="i-game-icons-spades" />
    </div>
    <div class="text-xs">{{ rank }}</div>
  </div>
</template>