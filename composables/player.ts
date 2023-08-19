import { ref as dbRef, set } from "firebase/database";

interface Player {
  name: string;
  room: string;
}

export function usePlayer() {
  const db = useDatabase();
  const user = useCurrentUser();
  const playerRef = dbRef(db, `players/${user.value?.uid}`);

  const player = useDatabaseObject<Player>(playerRef);

  async function setPlayer(name: string, room = "") {
    await set(playerRef, {
      name,
      room,
    });
  }

  return {
    player,
    setPlayer,
  };
}
