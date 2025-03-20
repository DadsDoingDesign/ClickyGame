import { useGame } from '@/context/GameContext';
import { useState, useEffect, useRef } from 'react';

export default function ClickButton() {
  const { 
    incrementScore, 
    buttonTheme, 
    score, 
    splitButtonEnabled, 
    unlockedFeatures, 
    selectFireIceTheme,
    hasSelectedFireIceTheme
  } = useGame();
  
  const [isPressed, setIsPressed] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [showTwoButtons, setShowTwoButtons] = useState(false);
  const [showThemeSelection, setShowThemeSelection] = useState(false);
  const splitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset button state when splitting is disabled
  useEffect(() => {
    if (!splitButtonEnabled && (isSplitting || showTwoButtons)) {
      // If splitting is disabled, immediately revert to a single button
      setIsSplitting(false);
      setShowTwoButtons(false);
      
      // Clear any pending animations
      if (splitTimeoutRef.current) {
        clearTimeout(splitTimeoutRef.current);
        splitTimeoutRef.current = null;
      }
    }
  }, [splitButtonEnabled, isSplitting, showTwoButtons]);
  
  // Determine if the button should split based on score
  useEffect(() => {
    if (!splitButtonEnabled) return;
    
    // Show fire/ice theme selection at 50 clicks if not already selected
    if (score === 50 && unlockedFeatures.fireIceTheme && !hasSelectedFireIceTheme) {
      setShowThemeSelection(true);
      triggerSplitAnimation();
    }
  }, [score, isSplitting, showTwoButtons, splitButtonEnabled, unlockedFeatures, hasSelectedFireIceTheme]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (splitTimeoutRef.current) {
        clearTimeout(splitTimeoutRef.current);
      }
    };
  }, []);
  
  const triggerSplitAnimation = () => {
    setIsSplitting(true);
    
    // After the split animation starts, show two buttons
    splitTimeoutRef.current = setTimeout(() => {
      setShowTwoButtons(true);
      
      // After showing two buttons, end the splitting state
      splitTimeoutRef.current = setTimeout(() => {
        setIsSplitting(false);
      }, 500); // Half a second after showing two buttons
    }, 500); // Half a second for the initial animation
  };
  
  const triggerMergeAnimation = () => {
    setIsSplitting(true);
    
    // Start merge animation
    splitTimeoutRef.current = setTimeout(() => {
      setShowTwoButtons(false);
      setShowThemeSelection(false);
      
      // After hiding the two buttons, end the splitting state
      splitTimeoutRef.current = setTimeout(() => {
        setIsSplitting(false);
      }, 500); // Half a second to complete the merge
    }, 500); // Half a second before starting to hide
  };
  
  const handleClick = () => {
    incrementScore();
    // Visual feedback
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };
  
  const handleLeftButtonClick = () => {
    if (showThemeSelection) {
      // Select fire theme
      selectFireIceTheme('fire');
    }
    
    incrementScore();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
    
    // Merge the buttons back after clicking one of them
    triggerMergeAnimation();
  };
  
  const handleRightButtonClick = () => {
    if (showThemeSelection) {
      // Select ice theme
      selectFireIceTheme('ice');
    }
    
    incrementScore();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
    
    // Merge the buttons back after clicking one of them
    triggerMergeAnimation();
  };

  return (
    <section className="game-interaction">
      <div className={`button-container ${isSplitting ? 'splitting' : ''} ${showTwoButtons ? 'split' : ''}`}>
        {/* Original button, shown when not split */}
        {!showTwoButtons && (
          <button 
            className={`click-button theme-${buttonTheme} ${isPressed ? 'pressed' : ''}`}
            onClick={handleClick}
            aria-label="Click to score points"
          >
            Click Me!
          </button>
        )}
        
        {/* Left half button, shown when split */}
        {showTwoButtons && (
          <button 
            className={`click-button left-button ${showThemeSelection ? 'theme-fire' : `theme-${buttonTheme}`} ${isPressed ? 'pressed' : ''}`}
            onClick={handleLeftButtonClick}
            aria-label="Left click button"
          >
            {showThemeSelection ? 'Fire' : 'Click'}
          </button>
        )}
        
        {/* Right half button, shown when split */}
        {showTwoButtons && (
          <button 
            className={`click-button right-button ${showThemeSelection ? 'theme-ice' : `theme-${buttonTheme}`} ${isPressed ? 'pressed' : ''}`}
            onClick={handleRightButtonClick}
            aria-label="Right click button"
          >
            {showThemeSelection ? 'Ice' : 'Here!'}
          </button>
        )}
      </div>
    </section>
  );
}
