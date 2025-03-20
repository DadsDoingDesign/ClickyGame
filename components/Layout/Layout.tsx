import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <Header />
      <main className="game-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
