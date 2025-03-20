import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { GameProvider } from '@/context/GameContext';
import LeaderboardModal from '@/components/LeaderboardModal/LeaderboardModal';
import DevSettingsModal from '@/components/DevSettings/DevSettingsModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GameProvider>
        <Component {...pageProps} />
        <LeaderboardModal />
        <DevSettingsModal />
      </GameProvider>
    </ThemeProvider>
  );
}
