import { useGame } from '@/context/GameContext';
import LeaderboardTable from './LeaderboardTable';
import AccountCreationForm from './AccountCreationForm';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function LeaderboardModal() {
  const { isLeaderboardOpen, toggleLeaderboard, currentUser, score, getCurrentUserRank, isLoading } = useGame();
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to show toast notification
  const showSuccessToast = (message: string = 'Score submitted successfully!') => {
    toast.success(message);
  };

  // Function to handle account creation
  const handleAccountCreated = () => {
    showSuccessToast('Score submitted successfully!');
  };

  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleLeaderboard();
      }
    };

    if (isLeaderboardOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      
      // Focus trap - when modal opens, focus the first focusable element
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isLeaderboardOpen, toggleLeaderboard]);

  // Close when clicking outside the modal
  const closeOnBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleLeaderboard();
    }
  };

  // Prevent clicks within the modal from closing it
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Get the current user's rank
  const userRank = getCurrentUserRank();

  if (!isLeaderboardOpen) return null;

  return (
    <div 
      className="modal-backdrop open" 
      onClick={closeOnBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="leaderboard-title"
    >
      <div 
        className="modal-container" 
        onClick={stopPropagation}
        ref={modalRef}
      >
        <div className="modal-header">
          <h2 className="modal-title" id="leaderboard-title">
            <span className="trophy-icon">🏆</span> Leaderboard
          </h2>
        </div>
        
        <div className="modal-content">
          <LeaderboardTable />
          
          {currentUser ? (
            <div className="current-user-section">
              <h3>Your Score</h3>
              <p className="current-user-info">
                Playing as <span className="current-username">{currentUser}</span> with a score of <span className="current-score">{score}</span>
              </p>
              {userRank && (
                <p className="user-rank">
                  Your current rank: <span className="rank-number">#{userRank}</span> {userRank <= 10 ? <span className="top-ten-badge">Top 10!</span> : ''}
                </p>
              )}
              <p className="score-update-info">Your score will automatically update in the leaderboard as you play!</p>
            </div>
          ) : (
            <AccountCreationForm onAccountCreated={handleAccountCreated} />
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            className="close-button" 
            onClick={toggleLeaderboard}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
