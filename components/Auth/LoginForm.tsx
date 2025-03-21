import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const { signInWithEmail, signInWithGoogle, setAuthView, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError(null);
    
    // Simple validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    // Attempt to sign in
    const { error } = await signInWithEmail(email, password);
    
    if (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const switchToRegister = () => {
    setAuthView('register');
  };

  const switchToReset = () => {
    setAuthView('reset');
  };

  return (
    <div className="auth-form-container">
      <button 
        className="auth-social-button" 
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.89 13.54c-.64 1.56-2.1 2.63-3.84 2.63-2.19 0-3.99-1.8-3.99-4s1.8-4 3.99-4c1.43 0 2.69.73 3.44 1.84l-1.42 1.03c-.45-.65-1.2-1.08-2.02-1.08-1.4 0-2.54 1.14-2.54 2.54s1.14 2.54 2.54 2.54c.9 0 1.67-.47 2.12-1.19h-2.54v-1.54h4.13c.12.37.19.77.19 1.18 0 .92-.25 1.81-.75 2.59z" fill="#4285F4"/>
        </svg>
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      
      <div className="auth-divider">
        <div className="auth-divider-line"></div>
        <div className="auth-divider-text">OR</div>
        <div className="auth-divider-line"></div>
      </div>
      
      <form onSubmit={handleEmailLogin} className="auth-form">
        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        {error && <div className="auth-error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="auth-submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="auth-switch-text">
        <button 
          type="button" 
          className="auth-switch-link" 
          onClick={switchToReset}
        >
          Forgot password?
        </button>
        
        <div className="auth-switch-text">
          Don't have an account?
          <button 
            type="button" 
            className="auth-switch-link" 
            onClick={switchToRegister}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
