import Link from 'next/link';
import Layout from '@/components/Layout';

export default function AuthError() {
  return (
    <Layout>
      <div className="auth-error-container">
        <div className="auth-error-content">
          <h1>Authentication Error</h1>
          <p>We encountered an error while trying to authenticate you.</p>
          <p>Please try again later or contact support if the problem persists.</p>
          <Link href="/" className="return-home-button">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
