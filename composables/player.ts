const name = useLocalStorage("name", "");

export function usePlayer() {
  return {
    name,
  };
}
