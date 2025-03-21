import { useAuth } from '@/context/AuthContext';
import { LoginForm } from './index';
import { RegisterForm } from './index';
import { ResetPasswordForm } from './index';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authView } = useAuth();

  if (!isAuthModalOpen) return null;

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  };

  // Prevent closing when clicking inside the modal
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="auth-modal" onClick={handleModalContentClick}>
        <div className="auth-modal-content">
          <h2 className="auth-modal-title">
            {authView === 'login' && 'Sign In'}
            {authView === 'register' && 'Create Account'}
            {authView === 'reset' && 'Reset Password'}
          </h2>
          
          {authView === 'login' && <LoginForm />}
          {authView === 'register' && <RegisterForm />}
          {authView === 'reset' && <ResetPasswordForm />}
          
          <button className="close-modal-button" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
