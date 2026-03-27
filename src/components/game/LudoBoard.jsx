import PlayerBadge from "../common/PlayerBadge";

export default function LudoBoard({ players, currentTurnIndex }) {
  return (
    <div>
      <h2>Board (starter view)</h2>
      <p className="muted">
        This starter shows token positions as numbers. You can later replace with real graphical board.
      </p>
      <div className="grid-players">
        {players.map((p, index) => (
          <PlayerBadge
            key={p.id || p.name + index}
            player={p}
            isCurrentTurn={index === currentTurnIndex}
          />
        ))}
      </div>
    </div>
  );
}