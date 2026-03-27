export default function PlayerBadge({ player, isCurrentTurn }) {
  return (
    <div className="card">
      <strong>{player.name}</strong> <span className="muted">({player.color})</span>
      <div className="token-list">
        {player.tokens.map((pos, idx) => (
          <span key={idx} className="token">
            T{idx + 1}: {pos}
          </span>
        ))}
      </div>
      <div className="spacer" />
      <div className="muted">{isCurrentTurn ? "Your turn / Active turn" : "Waiting"}</div>
    </div>
  );
}