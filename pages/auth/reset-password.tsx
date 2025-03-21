import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-hot-toast';
import Layout from '@/components/Layout';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for hash parameters in URL indicating a recovery flow
    const hash = window.location.hash;
    if (!hash) {
      // If no hash is present, redirect to home
      router.push('/');
    }
  }, [router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError(null);
    
    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        throw error;
      }
      
      toast.success('Password updated successfully!');
      
      // Redirect to home page
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Failed to reset password');
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-reset-container">
        <div className="auth-reset-form">
          <h1>Reset Your Password</h1>
          <p>Please enter a new password below.</p>
          
          <form onSubmit={handleReset}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Enter new password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Confirm new password"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="reset-password-button" 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
