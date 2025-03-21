import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { GameProvider } from '@/context/GameContext';
import { AuthProvider } from '@/context/AuthContext';
import LeaderboardModal from '@/components/LeaderboardModal/LeaderboardModal';
import DevSettingsModal from '@/components/DevSettings/DevSettingsModal';
import { AuthModal } from '@/components/Auth';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GameProvider>
          <Component {...pageProps} />
          <LeaderboardModal />
          <DevSettingsModal />
          <AuthModal />
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                borderLeft: '4px solid #4caf50',
              },
              duration: 3000,
            }}
          />
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
