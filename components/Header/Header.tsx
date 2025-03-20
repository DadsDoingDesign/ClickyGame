import { useTheme } from '@/context/ThemeContext';
import { useGame } from '@/context/GameContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { resetGame } = useGame();

  return (
    <header className="game-header">
      <h1 className="game-title">ClickyGame</h1>
      <div className="game-controls">
        <button 
          className="reset-button" 
          onClick={resetGame}
          aria-label="Reset Game"
        >
          <span className="reset-icon">↺</span>
          <span className="reset-text">Reset Game</span>
        </button>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle Light/Dark Theme"
        >
          <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="theme-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
