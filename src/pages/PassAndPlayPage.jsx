import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, INITIAL_TOKENS, MAX_PLAYERS } from "../constants/gameConstants";
import TurnIndicator from "../components/game/TurnIndicator";
import Dice from "../components/game/Dice";
import LudoBoard from "../components/game/LudoBoard";
import WinnerModal from "../components/game/WinnerModal";

function randomDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function PassAndPlayPage() {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState(() =>
    Array.from({ length: 2 }, (_, i) => ({
      id: `local-${i + 1}`,
      name: `Player ${i + 1}`,
      color: COLORS[i],
      tokens: [...INITIAL_TOKENS],
      finished: 0
    }))
  );
  const [turnIndex, setTurnIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [winner, setWinner] = useState("");

  const currentPlayer = useMemo(() => players[turnIndex], [players, turnIndex]);

  const updatePlayerCount = (count) => {
    const safe = Math.max(2, Math.min(MAX_PLAYERS, Number(count)));
    setPlayerCount(safe);
    setPlayers(
      Array.from({ length: safe }, (_, i) => ({
        id: `local-${i + 1}`,
        name: `Player ${i + 1}`,
        color: COLORS[i],
        tokens: [...INITIAL_TOKENS],
        finished: 0
      }))
    );
    setTurnIndex(0);
    setDiceValue(null);
    setWinner("");
  };

  const onRoll = () => {
    if (winner) return;
    const val = randomDice();
    setDiceValue(val);

    // Very simple move rule for starter:
    // move first unfinished token by dice value.
    setPlayers((prev) => {
      const next = [...prev];
      const p = { ...next[turnIndex] };
      const tokenIndex = p.tokens.findIndex((t) => t < 57);
      if (tokenIndex !== -1) {
        const newPos = Math.min(57, p.tokens[tokenIndex] + val);
        p.tokens = [...p.tokens];
        p.tokens[tokenIndex] = newPos;
        p.finished = p.tokens.filter((t) => t >= 57).length;
        next[turnIndex] = p;

        if (p.finished === 4) {
          setWinner(p.name);
        }
      }
      return next;
    });

    if (val !== 6) {
      setTurnIndex((prev) => (prev + 1) % players.length);
    }
  };

  const onRestart = () => {
    updatePlayerCount(playerCount);
  };

  return (
    <main className="page">
      <div className="row">
        <button className="btn secondary" onClick={() => navigate("/")}>
          Back
        </button>
        <select
          className="select"
          value={playerCount}
          onChange={(e) => updatePlayerCount(e.target.value)}
        >
          <option value={2}>2 Players</option>
          <option value={3}>3 Players</option>
          <option value={4}>4 Players</option>
        </select>
      </div>

      <div className="spacer" />
      <TurnIndicator currentPlayerName={currentPlayer?.name} />
      <div className="spacer" />
      <Dice value={diceValue} onRoll={onRoll} disabled={!!winner} />
      <div className="spacer" />
      <LudoBoard players={players} currentTurnIndex={turnIndex} />
      <div className="spacer" />
      <WinnerModal winnerName={winner} onRestart={onRestart} />
    </main>
  );
}