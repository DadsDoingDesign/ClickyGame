import { useGame } from '@/context/GameContext';
import { useState, useEffect } from 'react';

export default function UnlockNotification() {
  const { score, unlockedFeatures } = useGame();
  const [notification, setNotification] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check for unlocks based on score
    if (score === 10 && unlockedFeatures.simpleButton) {
      showUnlockNotification('🎉 Unlocked: Gradient Button Theme!');
    } else if (score === 25 && unlockedFeatures.leaderboard) {
      showUnlockNotification('🎉 Unlocked: Leaderboard Feature!');
    } else if (score === 50 && unlockedFeatures.fireIceTheme) {
      showUnlockNotification('🎉 Unlocked: Choose your theme - Fire or Ice!');
    }
  }, [score, unlockedFeatures]);

  const showUnlockNotification = (message: string) => {
    setNotification(message);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  if (!showNotification || !notification) return null;

  return (
    <div className="unlock-notification-container">
      <div className="unlock-notification">
        <p>{notification}</p>
      </div>
    </div>
  );
}
