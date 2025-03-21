import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-hot-toast';

// Types for Authentication
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{
    error: AuthError | null;
    success: boolean;
  }>;
  signInWithGoogle: () => Promise<{
    error: AuthError | null;
    success: boolean;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: AuthError | null;
    success: boolean;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: AuthError | null;
    success: boolean;
  }>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  authView: 'login' | 'register' | 'reset';
  setAuthView: (view: 'login' | 'register' | 'reset') => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authentication Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'reset'>('login');

  // Initialize session and subscribe to auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { error, success: false };
      }

      toast.success('Signed in successfully!');
      setIsAuthModalOpen(false);
      return { error: null, success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Failed to sign in. Please try again.');
      return { error: error as AuthError, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return { error, success: false };
      }

      // Success will be handled by the onAuthStateChange listener
      return { error: null, success: true };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in with Google. Please try email/password instead.');
      return { error: error as AuthError, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        },
      });

      if (error) {
        toast.error(error.message);
        return { error, success: false };
      }

      toast.success('Check your email for the confirmation link!');
      setAuthView('login');
      return { error: null, success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to sign up. Please try again.');
      return { error: error as AuthError, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/reset-password` : undefined,
      });

      if (error) {
        toast.error(error.message);
        return { error, success: false };
      }

      toast.success('Check your email for the password reset link!');
      setAuthView('login');
      return { error: null, success: true };
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to send password reset email. Please try again.');
      return { error: error as AuthError, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithEmail,
        signInWithGoogle,
        signUp,
        signOut,
        resetPassword,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authView,
        setAuthView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
