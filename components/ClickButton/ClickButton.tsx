import { useGame } from '@/context/GameContext';
import { useState } from 'react';

export default function ClickButton() {
  const { incrementScore } = useGame();
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    incrementScore();
    // Visual feedback
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <section className="game-interaction">
      <button 
        className={`click-button ${isPressed ? 'pressed' : ''}`}
        onClick={handleClick}
        aria-label="Click to score points"
      >
        Click Me!
      </button>
    </section>
  );
}
