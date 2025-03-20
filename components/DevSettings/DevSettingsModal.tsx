import { useGame } from '@/context/GameContext';
import { useState, useEffect, useRef } from 'react';
import type { ButtonTheme } from '@/context/GameContext';

export default function DevSettingsModal() {
  const { 
    isDevSettingsOpen, 
    toggleDevSettings, 
    resetLeaderboard, 
    buttonTheme, 
    setButtonTheme,
    splitButtonEnabled,
    toggleSplitButton 
  } = useGame();
  const modalRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Function to show toast notification
  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide after 3 seconds
  };

  // Function to handle leaderboard reset
  const handleResetLeaderboard = () => {
    resetLeaderboard();
    showSuccessToast('Leaderboard has been reset with dummy data!');
  };

  // Function to handle button theme change
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setButtonTheme(e.target.value as ButtonTheme);
    showSuccessToast(`Button theme changed to ${e.target.value}!`);
  };

  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleDevSettings();
      }
    };

    if (isDevSettingsOpen) {
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
  }, [isDevSettingsOpen, toggleDevSettings]);

  // Close when clicking outside the modal
  const closeOnBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleDevSettings();
    }
  };

  // Prevent clicks within the modal from closing it
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isDevSettingsOpen) return null;

  return (
    <div 
      className="modal-backdrop open" 
      onClick={closeOnBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="dev-settings-title"
    >
      <div 
        className="modal-container dev-settings-modal" 
        onClick={stopPropagation}
        ref={modalRef}
      >
        <div className="modal-header">
          <h2 className="modal-title" id="dev-settings-title">
            <span className="dev-icon">🛠️</span> Developer Settings
          </h2>
        </div>
        
        <div className="modal-content">
          {/* Button Theme Selector */}
          <div className="theme-selector-section">
            <h3>Button Theme</h3>
            <div className="dev-settings-controls">
              <select 
                className="theme-selector" 
                value={buttonTheme}
                onChange={handleThemeChange}
                aria-label="Select button theme"
              >
                <option value="default">Default (Black & White)</option>
                <option value="simple">Simple Gradient</option>
                <option value="fire">Fire Gradient</option>
                <option value="ice">Ice Gradient</option>
              </select>
              <p className="dev-setting-description">
                Choose a theme for the main click button.
              </p>
              
              {/* Theme Preview */}
              <div className="theme-preview">
                <div className="theme-preview-item theme-preview-default">Default</div>
                <div className="theme-preview-item theme-preview-simple">Simple</div>
                <div className="theme-preview-item theme-preview-fire">Fire</div>
                <div className="theme-preview-item theme-preview-ice">Ice</div>
              </div>
            </div>
          </div>
          
          {/* Button Split Toggle */}
          <div className="button-split-section">
            <h3>Button Splitting</h3>
            <div className="dev-settings-controls">
              <div className="toggle-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={splitButtonEnabled} 
                    onChange={toggleSplitButton}
                    aria-label="Enable button splitting"
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">{splitButtonEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              <p className="dev-setting-description">
                When enabled, the button will split into two buttons every 25 points. The buttons will merge back when one of them is clicked.
              </p>
            </div>
          </div>

          <div className="dev-settings-section">
            <h3>Leaderboard Controls</h3>
            <div className="dev-settings-controls">
              <button 
                className="dev-button danger-button" 
                onClick={handleResetLeaderboard}
              >
                Reset Leaderboard with Dummy Data
              </button>
              <p className="dev-setting-description">
                This will reset the leaderboard with 50+ dummy entries with random scores.
              </p>
            </div>
          </div>
          
          {/* Additional dev settings sections can be added here */}
        </div>
        
        <div className="modal-footer">
          <button 
            className="close-button" 
            onClick={toggleDevSettings}
          >
            Close
          </button>
        </div>
      </div>
      
      {/* Toast notification */}
      {showToast && (
        <div className="toast-notification success" role="alert" aria-live="polite">
          <span className="toast-icon" aria-hidden="true">⚙️</span>
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
