<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { player } = usePlayer()

const roomId = route.params.id as string;

function exit() {
  router.push("/");
}

if (!player.value) {
  exit()
}
</script>

<template>
  <ClientOnly>
    <GameLobby v-if="player" :roomId="roomId" @exit="exit" />
  </ClientOnly>
</template>
