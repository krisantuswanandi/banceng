<script setup lang="ts">
import { nanoid } from "nanoid";

const router = useRouter()
const { player, setPlayer } = usePlayer()

function createRoom() {
  const roomId = nanoid(8);
  enterRoom(roomId)
}

function joinRoom() {
  enterRoom(roomId.value)
}

async function enterRoom(roomId: string) {
  await setPlayer(playerName.value, roomId)

  router.push(`/room/${roomId}`)
}

const playerName = ref("")
const roomId = ref("")

watch(player, (value) => {
  if (value) { playerName.value = value.name }
})

useHead({
  bodyAttrs: {
    class: "bg"
  }
})
</script>

<template>
  <div class="flex justify-center items-center flex-col h-full">
    <input v-model="playerName" class="px-3 py-2 border border-red-300 rounded-lg" placeholder="Player name" />
    <button @click="createRoom" class="bg-red-500 rounded-lg px-4 py-2 mt-12 text-white">Create
      room</button>
    <span class="text-neutral-500 text-sm p-1">or</span>
    <div class="relative">
      <input v-model="roomId" class="px-3 py-2 border border-red-300 rounded-lg" placeholder="Room ID" />
      <div class="absolute top-0 right-0 bottom-0 p-1.5">
        <button @click="joinRoom" class="bg-red-500 h-full px-2 rounded-md text-white text-sm">Join
          room</button>
      </div>
    </div>
  </div>
</template>

<style>
.bg {
  background-image: url("@/assets/background.jpg");
  --at-apply: bg-center bg-cover;
}
</style>
