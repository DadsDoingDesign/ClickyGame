import { useTheme } from '@/context/ThemeContext';
import { useGame } from '@/context/GameContext';
import { useState, useEffect } from 'react';
import LeaderboardButton from '@/components/LeaderboardButton/LeaderboardButton';
import DevSettingsButton from '../DevSettings/DevSettingsButton';
import MobileMenu from './MobileMenu';
import { AuthButton } from '../Auth';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { resetGame, unlockedFeatures } = useGame();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="game-header">
      <h1 className="game-title">ClickyGame</h1>
      
      {isMobile ? (
        <button 
          className="hamburger-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      ) : (
        <div className="game-controls">
          <div className="dev-settings-wrapper">
            <DevSettingsButton />
          </div>
          <button 
            className="reset-button danger-button" 
            onClick={resetGame}
            aria-label="Reset game score"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="reset-icon">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            <span className="reset-text">Reset Game</span>
          </button>
          {unlockedFeatures.leaderboard && <LeaderboardButton />}
          <AuthButton />
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="M4.93 4.93l1.41 1.41"></path>
                <path d="M17.66 17.66l1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="M6.34 17.66l-1.41 1.41"></path>
                <path d="M19.07 4.93l-1.41 1.41"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
            <span className="theme-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      )}
      
      <MobileMenu isOpen={isMobileMenuOpen && isMobile} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
