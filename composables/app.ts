import { ref as dbRef, child, push } from "firebase/database";

export function useApp() {
  const sessionId = useLocalStorage("session-id", "");

  if (!sessionId.value) {
    sessionId.value = push(child(dbRef(useDatabase()), "players")).key;
  }

  const { player } = usePlayer();
  const appReady = computed(() => !!player.value?.name);

  return {
    appReady,
    sessionId,
  };
}
