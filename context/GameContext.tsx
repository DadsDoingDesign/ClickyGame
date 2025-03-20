import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface GameContextType {
  score: number;
  incrementScore: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<number>(0);

  // Initialize score from localStorage if available (client-side only)
  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('score', score.toString());
  }, [score]);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const resetGame = () => {
    setScore(0);
  };

  return (
    <GameContext.Provider value={{ score, incrementScore, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
