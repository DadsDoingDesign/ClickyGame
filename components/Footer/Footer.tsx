import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="game-footer">
      <div className="footer-links">
        <Link 
          href="/privacy-policy" 
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </Link>
        <span className="copyright">&copy; {new Date().getFullYear()} ClickyGame</span>
      </div>
    </footer>
  );
}
