import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function AuthButton() {
  const { user, signOut, setIsAuthModalOpen, setAuthView } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignIn = () => {
    setAuthView('login');
    setIsAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthView('register');
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // If user is not logged in, show login/signup buttons
  if (!user) {
    return (
      <div className="auth-buttons">
        <button className="button" onClick={handleSignIn} data-component-name="AuthButton">
          Sign In
        </button>
        <button className="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    );
  }

  // If user is logged in, show user profile and dropdown
  return (
    <div className="user-profile" ref={dropdownRef}>
      <button className="profile-button" onClick={toggleDropdown}>
        {user.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="User avatar"
            width={32}
            height={32}
            className="user-avatar"
          />
        ) : (
          <div className="avatar-placeholder">
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <span className="user-name">
          {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
        </span>
        <svg
          className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-user-info">
            <p className="dropdown-email">{user.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item danger-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
