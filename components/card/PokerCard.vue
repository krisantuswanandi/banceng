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
  <div @click="flipCard" class="card-outer cursor-pointer w-16 h-24" :class="faceUp ? '' : 'flipped'">
    <div class="card-inner relative w-full h-full transition-transform duration-500 preserve-3d">
      <CardFront :rank="rank" :suit="suit" class="card card-front absolute inset-0" />
      <CardBack class="card card-back absolute inset-0" />
    </div>
  </div>
</template>

<style scoped>
.card-outer {
  perspective: 1000px;
}

.card-outer.flipped .card-inner {
  transform: rotateY(180deg);
}

.card {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
