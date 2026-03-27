export default function TurnIndicator({ currentPlayerName }) {
  return (
    <div className="card">
      <strong>Current Turn:</strong> {currentPlayerName || "-"}
    </div>
  );
}