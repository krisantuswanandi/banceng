<script setup lang="ts">
import { nanoid } from "nanoid";

const router = useRouter()
const player = usePlayer()

function createRoom() {
  const roomId = nanoid(8);
  enterRoom(roomId)
}

function joinRoom() {
  enterRoom(roomId.value)
}

function enterRoom(roomId: string) {
  player.name.value = playerName.value

  router.push(`/room/${roomId}`)
}

const playerName = ref("")
const roomId = ref("")
</script>

<template>
  <div class="flex justify-center items-center h-full flex-col">
    <input v-model="playerName" class="border border-neutral-500 px-2 py-1 rounded" placeholder="player name..." />
    <button @click="createRoom" class="bg-neutral-300 rounded px-2 py-1 mt-8">Create new room</button>
    <span class="text-neutral-500 text-sm p-2">or</span>
    <div>
      <input v-model="roomId" class="border border-neutral-500 px-2 py-1 rounded w-32" placeholder="room id..." />
      <button @click="joinRoom" class="bg-neutral-300 rounded px-2 py-1 ml-2">Join room</button>
    </div>
  </div>
</template>
