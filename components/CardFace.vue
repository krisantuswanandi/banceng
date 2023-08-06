<script setup lang="ts">
defineProps<{
  num: string;
  face: string;
}>()

const faceUp = ref(false)

function flipCard() {
  faceUp.value = !faceUp.value
}
</script>

<template>
  <div :class="`relative rounded border border-black w-16 h-24 cursor-pointer ${faceUp ? '' : 'bg-black'}`"
    @click="flipCard">
    <div v-if="faceUp" class="flex justify-center items-center w-full h-full">
      <span class="text-2xl">{{ num }}</span>
      <div class="absolute top-1 left-1">
        <div v-if="face === 'S'" class="i-game-icons-spades" />
        <div v-if="face === 'H'" class="i-game-icons-hearts" />
        <div v-if="face === 'C'" class="i-game-icons-clubs" />
        <div v-if="face === 'D'" class="i-game-icons-diamonds" />
      </div>
      <div class="absolute bottom-1 right-1 rotate-180">
        <div v-if="face === 'S'" class="i-game-icons-spades" />
        <div v-if="face === 'H'" class="i-game-icons-hearts" />
        <div v-if="face === 'C'" class="i-game-icons-clubs" />
        <div v-if="face === 'D'" class="i-game-icons-diamonds" />
      </div>
    </div>
  </div>
</template>