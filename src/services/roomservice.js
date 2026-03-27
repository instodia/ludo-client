import { API_URL } from "../config/api";

export async function createRoom(playerName) {
  const res = await fetch(`${API_URL}/api/rooms/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerName })
  });

  if (!res.ok) {
    throw new Error("Could not create room");
  }

  return res.json();
}

export async function joinRoom(roomCode, playerName) {
  const res = await fetch(`${API_URL}/api/rooms/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomCode, playerName })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Could not join room");
  }

  return res.json();
}