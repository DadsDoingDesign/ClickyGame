import { useGame } from '@/context/GameContext';

export default function ScoreDisplay() {
  const { score } = useGame();

  return (
    <section className="score-section">
      <h2 className="score-label">Your Clicky Score:</h2>
      <div className="score-display" aria-live="polite">
        {score}
      </div>
    </section>
  );
}
