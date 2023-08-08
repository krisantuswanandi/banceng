<script setup lang="ts">
import { Suit } from "@/utils/card"

const props = defineProps<{
  suit: Suit
}>()
</script>

<template>
  <div v-if="suit === Suit.Diamonds" class="i-game-icons-diamonds" />
  <div v-else-if="suit === Suit.Clubs" class="i-game-icons-clubs" />
  <div v-else-if="suit === Suit.Hearts" class="i-game-icons-hearts" />
  <div v-else-if="suit === Suit.Spades" class="i-game-icons-spades" />
</template>