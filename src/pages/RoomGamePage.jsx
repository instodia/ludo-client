import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../services/socketService";
import TurnIndicator from "../components/game/TurnIndicator";
import Dice from "../components/game/Dice";
import LudoBoard from "../components/game/LudoBoard";
import WinnerModal from "../components/game/WinnerModal";

export default function RoomGamePage() {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const playerName = location.state?.playerName || "";

  const [gameState, setGameState] = useState({
    players: [],
    currentTurnIndex: 0,
    lastDice: null,
    winnerName: ""
  });

  useEffect(() => {
    if (!roomCode) {
      navigate("/");
      return;
    }

    const socket = getSocket();

    if (playerName) {
      socket.emit("room:join", { roomCode, playerName });
    }

    socket.emit("game:sync", { roomCode });

    socket.on("game:state", (state) => {
      setGameState(state);
    });

    socket.on("room:error", (err) => {
      alert(err?.message || "Room error");
      navigate("/");
    });

    return () => {
      socket.off("game:state");
      socket.off("room:error");
    };
  }, [roomCode, playerName, navigate]);

  const onRoll = () => {
    const socket = getSocket();
    socket.emit("game:rollDice", { roomCode });
  };

  const onRestart = () => {
    const socket = getSocket();
    socket.emit("game:restart", { roomCode });
  };

  const currentPlayerName =
    gameState.players[gameState.currentTurnIndex]?.name || "";

  return (
    <main className="page">
      <div className="row">
        <button className="btn secondary" onClick={() => navigate("/")}>
          Exit
        </button>
      </div>
      <div className="spacer" />
      <TurnIndicator currentPlayerName={currentPlayerName} />
      <div className="spacer" />
      <Dice value={gameState.lastDice} onRoll={onRoll} disabled={!!gameState.winnerName} />
      <div className="spacer" />
      <LudoBoard
        players={gameState.players}
        currentTurnIndex={gameState.currentTurnIndex}
      />
      <div className="spacer" />
      <WinnerModal winnerName={gameState.winnerName} onRestart={onRestart} />
    </main>
  );
}