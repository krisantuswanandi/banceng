<script setup lang="ts">
import { Suit } from "@/utils/card"

defineProps<{
  rank: string;
  suit: Suit;
}>()

const faceUp = ref(false)

function flipCard() {
  faceUp.value = !faceUp.value
}
</script>

<template>
  <div @click="flipCard" class="cursor-pointer">
    <CardFront v-if="faceUp" :rank="rank" :suit="suit" />
    <CardBack v-else />
  </div>
</template>