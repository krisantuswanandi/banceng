import { ref as dbRef, set } from "firebase/database";

interface LobbyPlayer {
  id: string;
  name: string;
  ready: boolean;
}

interface Lobby {
  [key: string]: LobbyPlayer;
}

const db = useDatabase();
const { player } = usePlayer();
const currentRoom = ref("");

function getLobbyRef() {
  return computed(() => dbRef(db, `rooms/${currentRoom.value}/lobby`));
}

function getPlayerRef() {
  return computed(() =>
    dbRef(db, `rooms/${currentRoom.value}/lobby/${player.value?.id}`)
  );
}

async function setLobbyStatus(ready = false) {
  await set(getPlayerRef().value, {
    name: player.value!.name,
    ready,
  });
}

async function exitLobby() {
  await set(getPlayerRef().value, null);
}

export function useLobby(roomId: string) {
  currentRoom.value = roomId;

  const lobbyRef = getLobbyRef();
  const lobby = useDatabaseObject<Lobby>(lobbyRef);

  const lobbyPlayers = computed<LobbyPlayer[]>(() => {
    if (lobby.value) {
      const l = lobby.value;
      return Object.keys(l).map((key) => ({
        id: key,
        name: l[key].name,
        ready: l[key].ready,
      }));
    }
    return [];
  });

  setLobbyStatus();

  return {
    lobbyPlayers,
    setLobbyStatus,
    exitLobby,
  };
}
