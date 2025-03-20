import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the leaderboard entry interface
export interface LeaderboardEntry {
  name: string;
  score: number;
}

// Define button theme types
export type ButtonTheme = 'default' | 'simple' | 'fire' | 'ice';

// Define unlocked features interface
export interface UnlockedFeatures {
  simpleButton: boolean;
  leaderboard: boolean;
  fireIceTheme: boolean;
}

// Generate 50 dummy data entries for the leaderboard
const generateDummyData = (): LeaderboardEntry[] => {
  const names = [
    "ClickMaster", "ButtonSmasher", "PointCollector", "ScoreHunter", "ClickWizard",
    "TapChampion", "ClickNinja", "PointGatherer", "ScoreSeeker", "TapMaster",
    "ClickerPro", "PointWizard", "ScoreLord", "TapKing", "ClickerQueen",
    "PointNinja", "ScoreChaser", "TapWarrior", "ClickerGuru", "PointHunter",
    "ScoreWizard", "TapNinja", "ClickerKing", "PointMaster", "ScoreHoarder"
  ];
  
  // Create 50 entries with random names and scores
  return Array.from({ length: 50 }, (_, i) => {
    // Use modulo to cycle through names if we need more than the array length
    const nameIndex = i % names.length;
    // Add a number suffix to make names unique
    const nameSuffix = Math.floor(i / names.length) > 0 ? `_${Math.floor(i / names.length)}` : '';
    const name = `${names[nameIndex]}${nameSuffix}`;
    // Generate a random score between 10000 and 200000
    const score = Math.floor(Math.random() * 190000) + 10000;
    
    return { name, score };
  }).sort((a, b) => b.score - a.score); // Sort by score descending
};

// Initial dummy data for the leaderboard
const initialLeaderboardData: LeaderboardEntry[] = [
  { name: "ClickyGuy123", score: 122304 },
  { name: "CallenTheClicker", score: 102568 },
  { name: "NobodyClicksLikeMe", score: 80120 },
  ...generateDummyData()
];

interface GameContextType {
  score: number;
  incrementScore: () => void;
  resetGame: () => void;
  leaderboardData: LeaderboardEntry[];
  isLeaderboardOpen: boolean;
  toggleLeaderboard: () => void;
  createAccount: (name: string) => void;
  currentUser: string | null;
  getCurrentUserRank: () => number | null;
  resetLeaderboard: () => void;
  isDevSettingsOpen: boolean;
  toggleDevSettings: () => void;
  buttonTheme: ButtonTheme;
  setButtonTheme: (theme: ButtonTheme) => void;
  splitButtonEnabled: boolean;
  toggleSplitButton: () => void;
  unlockedFeatures: UnlockedFeatures;
  selectFireIceTheme: (theme: 'fire' | 'ice') => void;
  hasSelectedFireIceTheme: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(initialLeaderboardData);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [buttonTheme, setButtonTheme] = useState<ButtonTheme>('default');
  const [splitButtonEnabled, setSplitButtonEnabled] = useState<boolean>(true);
  const [unlockedFeatures, setUnlockedFeatures] = useState<UnlockedFeatures>({
    simpleButton: false,
    leaderboard: false,
    fireIceTheme: false
  });
  const [hasSelectedFireIceTheme, setHasSelectedFireIceTheme] = useState<boolean>(false);

  // Initialize from localStorage if available (client-side only)
  useEffect(() => {
    // Load score from localStorage
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
    
    // Load leaderboard data from localStorage
    const savedLeaderboardData = localStorage.getItem('leaderboardData');
    if (savedLeaderboardData) {
      try {
        setLeaderboardData(JSON.parse(savedLeaderboardData));
      } catch (error) {
        console.error('Failed to parse leaderboard data:', error);
        // If there's an error, use the initial data
        setLeaderboardData(initialLeaderboardData);
      }
    } else {
      // If no saved data, use the initial data with dummy entries
      localStorage.setItem('leaderboardData', JSON.stringify(initialLeaderboardData));
    }

    // Load current user from localStorage
    const savedCurrentUser = localStorage.getItem('currentUser');
    if (savedCurrentUser) {
      setCurrentUser(savedCurrentUser);
    }
    
    // Load button theme from localStorage
    const savedButtonTheme = localStorage.getItem('buttonTheme');
    if (savedButtonTheme && ['default', 'simple', 'fire', 'ice'].includes(savedButtonTheme)) {
      setButtonTheme(savedButtonTheme as ButtonTheme);
    }
    
    // Load button splitting setting from localStorage
    const savedSplitButtonEnabled = localStorage.getItem('splitButtonEnabled');
    if (savedSplitButtonEnabled !== null) {
      setSplitButtonEnabled(savedSplitButtonEnabled === 'true');
    }
    
    // Load unlocked features from localStorage
    const savedUnlockedFeatures = localStorage.getItem('unlockedFeatures');
    if (savedUnlockedFeatures) {
      try {
        setUnlockedFeatures(JSON.parse(savedUnlockedFeatures));
      } catch (error) {
        console.error('Failed to parse unlocked features data:', error);
      }
    }
    
    // Load fire/ice theme selection status
    const savedHasSelectedFireIceTheme = localStorage.getItem('hasSelectedFireIceTheme');
    if (savedHasSelectedFireIceTheme) {
      setHasSelectedFireIceTheme(savedHasSelectedFireIceTheme === 'true');
    }
    
    setIsInitialized(true);
  }, []);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('score', score.toString());
    
    // If there's a current user, update their score in the leaderboard
    if (currentUser) {
      updateCurrentUserScore();
    }
    
    // Check for unlocks based on score thresholds
    checkUnlocks();
  }, [score, isInitialized]);

  // Save unlocked features to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('unlockedFeatures', JSON.stringify(unlockedFeatures));
  }, [unlockedFeatures, isInitialized]);
  
  // Save fire/ice theme selection status to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('hasSelectedFireIceTheme', hasSelectedFireIceTheme.toString());
  }, [hasSelectedFireIceTheme, isInitialized]);

  // Save leaderboard data to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
  }, [leaderboardData, isInitialized]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser, isInitialized]);

  // Save button theme to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('buttonTheme', buttonTheme);
  }, [buttonTheme, isInitialized]);
  
  // Save button splitting setting to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('splitButtonEnabled', splitButtonEnabled.toString());
  }, [splitButtonEnabled, isInitialized]);

  // Check for unlocks based on score thresholds
  const checkUnlocks = () => {
    const updatedUnlocks = { ...unlockedFeatures };
    let themeChanged = false;
    
    // Unlock simple button at 10 clicks
    if (score >= 10 && !updatedUnlocks.simpleButton) {
      updatedUnlocks.simpleButton = true;
      if (buttonTheme === 'default') {
        setButtonTheme('simple');
        themeChanged = true;
      }
    }
    
    // Unlock leaderboard at 25 clicks
    if (score >= 25 && !updatedUnlocks.leaderboard) {
      updatedUnlocks.leaderboard = true;
    }
    
    // Unlock fire/ice theme at 50 clicks
    if (score >= 50 && !updatedUnlocks.fireIceTheme) {
      updatedUnlocks.fireIceTheme = true;
    }
    
    // Only update state if something changed
    if (
      updatedUnlocks.simpleButton !== unlockedFeatures.simpleButton ||
      updatedUnlocks.leaderboard !== unlockedFeatures.leaderboard ||
      updatedUnlocks.fireIceTheme !== unlockedFeatures.fireIceTheme
    ) {
      setUnlockedFeatures(updatedUnlocks);
    }
  };
  
  // Function to select fire or ice theme when the button splits
  const selectFireIceTheme = (theme: 'fire' | 'ice') => {
    if (!unlockedFeatures.fireIceTheme) return;
    
    setButtonTheme(theme);
    setHasSelectedFireIceTheme(true);
  };

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentUser(null);
    setButtonTheme('default');
    setHasSelectedFireIceTheme(false);
    setUnlockedFeatures({
      simpleButton: false,
      leaderboard: false,
      fireIceTheme: false
    });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hasCreatedAccount');
    localStorage.removeItem('hasSelectedFireIceTheme');
  };

  const resetLeaderboard = () => {
    setLeaderboardData(initialLeaderboardData);
    localStorage.setItem('leaderboardData', JSON.stringify(initialLeaderboardData));
  };

  const toggleLeaderboard = () => {
    setIsLeaderboardOpen(prev => !prev);
    // Close dev settings if open
    if (isDevSettingsOpen) {
      setIsDevSettingsOpen(false);
    }
  };

  const toggleDevSettings = () => {
    setIsDevSettingsOpen(prev => !prev);
    // Close leaderboard if open
    if (isLeaderboardOpen) {
      setIsLeaderboardOpen(false);
    }
  };

  const updateCurrentUserScore = () => {
    if (!currentUser) return;

    setLeaderboardData(prev => {
      // Find if the user already exists in the leaderboard
      const userIndex = prev.findIndex(entry => entry.name === currentUser);
      
      if (userIndex !== -1) {
        // Update existing user's score
        const updatedData = [...prev];
        updatedData[userIndex] = { ...updatedData[userIndex], score };
        
        // Sort by score (descending)
        return updatedData.sort((a, b) => b.score - a.score);
      }
      
      return prev;
    });
  };

  // Function to get the current user's rank in the leaderboard
  const getCurrentUserRank = (): number | null => {
    if (!currentUser) return null;
    
    const userIndex = leaderboardData.findIndex(entry => entry.name === currentUser);
    if (userIndex === -1) return null;
    
    // Rank is index + 1 (since index is 0-based)
    return userIndex + 1;
  };

  const createAccount = (name: string) => {
    if (!name.trim()) return;
    
    // Set as current user
    setCurrentUser(name.trim());
    
    // Add the new account to the leaderboard
    const newEntry: LeaderboardEntry = {
      name: name.trim(),
      score: score
    };
    
    // Add entry and sort the leaderboard by score (descending)
    setLeaderboardData(prev => {
      // Check if user already exists
      const existingUserIndex = prev.findIndex(entry => entry.name === name.trim());
      
      if (existingUserIndex !== -1) {
        // Update existing user
        const updatedData = [...prev];
        updatedData[existingUserIndex] = newEntry;
        return updatedData.sort((a, b) => b.score - a.score);
      } else {
        // Add new user
        return [...prev, newEntry].sort((a, b) => b.score - a.score);
      }
    });
    
    // Keep the leaderboard open to show the updated scores
  };

  const toggleSplitButton = () => {
    setSplitButtonEnabled(prev => !prev);
  };

  return (
    <GameContext.Provider value={{ 
      score, 
      incrementScore, 
      resetGame, 
      leaderboardData, 
      isLeaderboardOpen, 
      toggleLeaderboard,
      createAccount,
      currentUser,
      getCurrentUserRank,
      resetLeaderboard,
      isDevSettingsOpen,
      toggleDevSettings,
      buttonTheme,
      setButtonTheme,
      splitButtonEnabled,
      toggleSplitButton,
      unlockedFeatures,
      selectFireIceTheme,
      hasSelectedFireIceTheme
    }}>
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
