<script setup lang="ts">
const props = defineProps<{
  rank: string;
  suit: Suit;
}>()

const isRed = props.suit === Suit.Diamonds || props.suit === Suit.Hearts
</script>

<template>
  <div class="relative rounded border border-black w-16 h-24">
    <div :class="`flex justify-center items-center w-full h-full ${isRed ? 'text-red-600' : 'text-black'}`">
      <span class="text-2xl">{{ rank }}</span>
      <CardSuit class="absolute top-1 left-1" :suit="suit" />
      <CardSuit class="absolute bottom-1 right-1 rotate-180" :suit="suit" />
    </div>
  </div>
</template>
