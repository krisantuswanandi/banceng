<script setup lang="ts">
const props = defineProps<{
  roomId: string
}>()

const emit = defineEmits<{
  (e: "exit"): void;
}>();

const { player } = usePlayer()
const { lobbyPlayers, setLobbyStatus, exitLobby } = useLobby(props.roomId);

const isReady = computed(() => {
  return lobbyPlayers.value.find((p) => p.id === player.value?.id)?.ready;
});

function exit() {
  exitLobby();
  emit("exit");
}
</script>

<template>
  <div>
    <button class="text-sm text-blue underline" @click="exit">exit room</button>
  </div>
  <div class="mb-4">
    <span>Room #{{ roomId }}</span>
  </div>
  <div>
    <span class="mr-2">Ready?</span>
    <button class="py-0.5 px-2 text-sm" :class="isReady ? 'bg-green' : 'bg-neutral-300'"
      @click="setLobbyStatus(true)">Yes</button>
    /
    <button class="py-0.5 px-2 text-sm" :class="isReady ? 'bg-neutral-300' : 'bg-red'"
      @click="setLobbyStatus(false)">No</button>
  </div>
  <div>
    <div class="flex mt-10 items-center">
      <div class="text-8xl pr-6 text-red-600">
        {{ lobbyPlayers.length - 4 }}
      </div>
      <ol class="list-decimal pl-10">
        <li v-for="i in 4">
          <div v-if="!lobbyPlayers[i - 1]" class="text-black/40">waiting...</div>
          <div v-else class="flex items-center gap-1">
            {{ lobbyPlayers[i - 1].name }}
            <div v-if="lobbyPlayers[i - 1].ready" class="i-ph-check-circle-bold text-green-700 inline-block" />
            <div v-else class="i-eos-icons-bubble-loading text-neutral-500 inline-block" />
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
