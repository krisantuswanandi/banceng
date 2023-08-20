import { ref as dbRef, set, child, push } from "firebase/database";

interface Player {
  name: string;
  room: string;
}

function getPlayerId() {
  const playerId = useLocalStorage("player-id", "");

  if (!playerId.value) {
    playerId.value = push(child(dbRef(useDatabase()), "players")).key;
  }

  return playerId;
}

function getPlayerRef() {
  const db = useDatabase();
  const playerId = getPlayerId();

  return computed(() => dbRef(db, `players/${playerId.value}`));
}

async function createNewPlayer() {
  const playerId = getPlayerId();
  const playerRef = getPlayerRef();

  await set(playerRef.value, {
    id: playerId.value,
    name: "",
    lastestRoom: "",
    lastOnline: new Date().toISOString(),
  });
}

export function usePlayer() {
  const playerId = getPlayerId();
  const playerRef = getPlayerRef();

  const player = useDatabaseObject<Player>(playerRef);

  async function setPlayer(name = "", roomId = "") {
    await set(playerRef.value, {
      id: playerId.value,
      name,
      lastestRoom: roomId,
      lastOnline: new Date().toISOString(),
    });
  }

  const isPlayerReady = computed(() => {
    return !!player.value;
  });

  watch(
    player,
    (value) => {
      if (value === null) {
        createNewPlayer();
      }
    },
    { immediate: true }
  );

  return {
    player,
    setPlayer,
    isPlayerReady,
  };
}
