import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the leaderboard entry interface
export interface LeaderboardEntry {
  name: string;
  score: number;
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(initialLeaderboardData);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

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
  }, [score, isInitialized]);

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

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hasCreatedAccount');
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
      toggleDevSettings
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
