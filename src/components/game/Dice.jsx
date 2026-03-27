export default function Dice({ value, onRoll, disabled }) {
  return (
    <div className="card">
      <h3>Dice</h3>
      <p className="muted">Last value: {value ?? "-"}</p>
      <button className="btn success" onClick={onRoll} disabled={disabled}>
        Roll Dice
      </button>
    </div>
  );
}