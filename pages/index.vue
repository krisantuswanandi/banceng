<script setup lang="ts">
import { nanoid } from "nanoid";
import { ref as databaseRef, set } from "firebase/database"

const router = useRouter()
const player = usePlayer()

function createRoom() {
  const roomId = nanoid(8);
  enterRoom(roomId)
}

function joinRoom() {
  enterRoom(roomId.value)
}

function getPlayerRef() {
  const db = useDatabase()
  const user = useCurrentUser()
  const playerRef = databaseRef(db, `players/${user.value?.uid}`)

  return playerRef
}

async function enterRoom(roomId: string) {
  const name = playerName.value
  try {
    await set(getPlayerRef(), {
      name,
      latestRoom: roomId,
    })
  } catch (error) {
    console.log(error)
  }

  player.name.value = name
  router.push(`/room/${roomId}`)
}

const playerName = ref("")
const roomId = ref("")

const userDb = useDatabaseObject<{ name: string }>(getPlayerRef(), { once: true })

watch(userDb, (value) => {
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
