import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Process the OAuth callback
    const handleAuthCallback = async () => {
      // Get the URL hash
      const hash = window.location.hash;
      
      // Process the callback
      if (hash) {
        try {
          await supabase.auth.getSession();
          
          // Redirect to the home page
          router.push('/');
        } catch (error) {
          console.error('Error handling auth callback:', error);
          router.push('/auth/error');
        }
      } else {
        // No hash, redirect to home
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  // Show a loading screen
  return (
    <div className="auth-callback-container">
      <div className="loading-indicator">
        <div className="loading-spinner"></div>
        <p>Authenticating...</p>
      </div>
    </div>
  );
}
