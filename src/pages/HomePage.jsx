import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveName, loadName } from "../utils/storage";
import { createRoom, joinRoom } from "../services/roomService";

export default function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState(loadName());
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onPassAndPlay = () => {
    if (!name.trim()) return setError("Please enter your name");
    saveName(name.trim());
    navigate("/pass-and-play", { state: { hostName: name.trim() } });
  };

  const onCreateRoom = async () => {
    if (!name.trim()) return setError("Please enter your name");
    setError("");
    setLoading(true);
    try {
      saveName(name.trim());
      const data = await createRoom(name.trim());
      navigate("/room-lobby", {
        state: {
          roomCode: data.roomCode,
          playerName: name.trim(),
          isHost: true
        }
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onJoinRoom = async () => {
    if (!name.trim()) return setError("Please enter your name");
    if (!roomCode.trim()) return setError("Please enter room code");
    setError("");
    setLoading(true);
    try {
      saveName(name.trim());
      await joinRoom(roomCode.trim().toUpperCase(), name.trim());
      navigate("/room-lobby", {
        state: {
          roomCode: roomCode.trim().toUpperCase(),
          playerName: name.trim(),
          isHost: false
        }
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <h1>Ludo Friends</h1>
      <p className="muted">2 modes: Pass & Play and Room Mode (max 4 players)</p>

      <div className="card">
        <div className="row">
          <input
            className="input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn" onClick={onPassAndPlay}>
            Pass & Play
          </button>
        </div>

        <div className="spacer" />
        <div className="row">
          <button className="btn success" onClick={onCreateRoom} disabled={loading}>
            Create Room
          </button>

          <input
            className="input"
            placeholder="Room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            maxLength={6}
          />
          <button className="btn secondary" onClick={onJoinRoom} disabled={loading}>
            Join Room
          </button>
        </div>

        {error ? <p style={{ color: "#fca5a5" }}>{error}</p> : null}
      </div>
    </main>
  );
}