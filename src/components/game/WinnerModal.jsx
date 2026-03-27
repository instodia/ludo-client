export default function WinnerModal({ winnerName, onRestart }) {
  if (!winnerName) return null;

  return (
    <div className="card" style={{ borderColor: "#22c55e" }}>
      <h2>Winner: {winnerName}</h2>
      <button className="btn success" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}