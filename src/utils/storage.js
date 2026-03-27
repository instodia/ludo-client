const KEY = "ludo_player_name";

export function saveName(name) {
  localStorage.setItem(KEY, name);
}

export function loadName() {
  return localStorage.getItem(KEY) || "";
}