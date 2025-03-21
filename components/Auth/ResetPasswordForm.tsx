import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ResetPasswordForm() {
  const { resetPassword, setAuthView, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError(null);
    
    // Simple validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    // Attempt to send reset password email
    const { error } = await resetPassword(email);
    
    if (error) {
      setError(error.message);
    }
  };

  const switchToLogin = () => {
    setAuthView('login');
  };

  return (
    <div className="auth-form-container">
      <p className="auth-instructions">
        Enter your email below and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleResetPassword} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="reset-email">Email</label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        {error && <div className="auth-error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="auth-submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      
      <div className="auth-switch-text">
        <button 
          type="button" 
          className="auth-switch-link" 
          onClick={switchToLogin}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
