import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { GameProvider } from '@/context/GameContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </ThemeProvider>
  );
}
