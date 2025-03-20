import { useState } from 'react';
import { useGame } from '@/context/GameContext';

interface AccountCreationFormProps {
  onAccountCreated: () => void;
}

export default function AccountCreationForm({ onAccountCreated }: AccountCreationFormProps) {
  const { createAccount, score } = useGame();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (username.length > 20) {
      setError('Username must be 20 characters or less');
      return;
    }
    
    // Clear error and submit
    setError('');
    createAccount(username);
    
    // Notify parent component that account was created
    onAccountCreated();
    
    // Reset form
    setUsername('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    
    // Clear error when user types
    if (error) setError('');
  };

  return (
    <div className="account-creation-section">
      <h3>Add Your Score to the Leaderboard</h3>
      <p className="current-score">Your Current Score: {score}</p>
      
      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your name"
            aria-describedby={error ? "username-error" : undefined}
            maxLength={20}
          />
          {error && (
            <div id="username-error" className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>
        <button type="submit" className="create-account-button">
          Create Account
        </button>
      </form>
    </div>
  );
}
