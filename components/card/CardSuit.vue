<script setup lang="ts">
const props = defineProps<{
  suit: Suit
}>()

const isDiamonds = props.suit === Suit.Diamonds
const isClubs = props.suit === Suit.Clubs
const isHearts = props.suit === Suit.Hearts
const isSpades = props.suit === Suit.Spades
</script>

<template>
  <div v-if="isDiamonds" class="i-game-icons-diamonds" />
  <div v-else-if="isClubs" class="i-game-icons-clubs" />
  <div v-else-if="isHearts" class="i-game-icons-hearts" />
  <div v-else-if="isSpades" class="i-game-icons-spades" />
</template>