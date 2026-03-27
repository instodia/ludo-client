import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSocket } from "../services/socketService";

export default function RoomLobbyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const roomCode = location.state?.roomCode || "";
  const playerName = location.state?.playerName || "";
  const isHost = !!location.state?.isHost;

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!roomCode || !playerName) {
      navigate("/");
      return;
    }

    const socket = getSocket();

    socket.emit("room:join", { roomCode, playerName });

    socket.on("room:state", (payload) => {
      setPlayers(payload.players || []);
    });

    socket.on("room:gameStarted", () => {
      navigate(`/room-game/${roomCode}`, {
        state: { roomCode, playerName }
      });
    });

    return () => {
      socket.off("room:state");
      socket.off("room:gameStarted");
    };
  }, [roomCode, playerName, navigate]);

  const onStart = () => {
    const socket = getSocket();
    socket.emit("room:startGame", { roomCode });
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  };

  return (
    <main className="page">
      <h1>Room Lobby</h1>
      <div className="card">
        <p>
          Room Code: <strong>{roomCode}</strong>
        </p>
        <div className="row">
          <button className="btn secondary" onClick={copyCode}>
            Copy Code
          </button>
          <button className="btn secondary" onClick={() => navigate("/")}>
            Leave
          </button>
          {isHost ? (
            <button className="btn success" onClick={onStart}>
              Start Game
            </button>
          ) : null}
        </div>

        <div className="spacer" />
        <h3>Players ({players.length}/4)</h3>
        <ul>
          {players.map((p) => (
            <li key={p.id}>
              {p.name} ({p.color})
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}