<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { player } = usePlayer()

const id = route.params.id

if (!player.value) {
  router.push("/")
}

import { ref as dbRef, set } from "firebase/database";

const db = useDatabase();
const waitingRoomRef = dbRef(db, `rooms/${id}/waitingRoom`);
const playerStatusRef = dbRef(db, `rooms/${id}/waitingRoom/${player.value!.id}`);

const waitingRoom = useDatabaseObject<any>(waitingRoomRef);
const playerStatus = useDatabaseObject<any>(playerStatusRef);

const isReady = computed<boolean>(() => {
  return !!playerStatus.value?.ready;
})

const players = computed<any[]>(() => {
  if (waitingRoom.value) {
    return Object.values(waitingRoom.value);
  }
  return [];
})

async function updateWaitingRoom(data: any) {
  await set(playerStatusRef, data);
}

async function updateWaitingRoomStatus(ready = false) {
  await updateWaitingRoom({
    name: player.value!.name,
    ready,
  });
}

updateWaitingRoomStatus()

async function exit() {
  await updateWaitingRoom(null);
  router.push("/");
}
</script>

<template>
  <ClientOnly>
    <div>
      <button class="text-sm text-blue underline" @click="exit">exit room</button>
    </div>
    <div class="mb-4">
      <span>Room #{{ id }}</span>
    </div>
    <div>
      <span class="mr-2">Ready?</span>
      <button class="py-0.5 px-2 text-sm" :class="isReady ? 'bg-green' : 'bg-neutral-300'"
        @click="updateWaitingRoomStatus(true)">Yes</button>
      /
      <button class="py-0.5 px-2 text-sm" :class="isReady ? 'bg-neutral-300' : 'bg-red'"
        @click="updateWaitingRoomStatus(false)">No</button>
    </div>
    <div>
      <div class="flex mt-10 items-center">
        <div class="text-8xl pr-6 text-red-600">
          {{ players.length - 4 }}
        </div>
        <ol class="list-decimal pl-10">
          <li v-for="i in 4">
            <div v-if="!players[i - 1]" class="text-black/40">waiting...</div>
            <div v-else class="flex items-center gap-1">
              {{ players[i - 1].name }}
              <div v-if="players[i - 1].ready" class="i-ph-check-circle-bold text-green-700 inline-block" />
              <div v-else class="i-eos-icons-bubble-loading text-neutral-500 inline-block" />
            </div>
          </li>
        </ol>
      </div>
    </div>
  </ClientOnly>
</template>
