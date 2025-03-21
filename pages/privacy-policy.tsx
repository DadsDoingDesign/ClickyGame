import Head from 'next/head';
import { useTheme } from '@/context/ThemeContext';

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  
  return (
    <>
      <Head>
        <title>Privacy Policy - ClickyGame</title>
        <meta name="description" content="Privacy Policy for ClickyGame" />
      </Head>
      
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to ClickyGame. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>
        
        <section>
          <h2>2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Profile Data</strong> includes your username and password, your game scores, your preferences, feedback, and survey responses.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
          </ul>
        </section>
        
        <section>
          <h2>3. Google User Data</h2>
          <p>If you choose to sign in using Google, we will have access to certain information from your Google account such as your name, email address, and profile picture. This information is used solely for the purpose of creating and managing your ClickyGame account.</p>
          <p>We do not request or store any additional Google user data beyond what is necessary for authentication purposes.</p>
        </section>
        
        <section>
          <h2>4. How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>To register you as a new user.</li>
            <li>To manage our relationship with you.</li>
            <li>To enable you to participate in leaderboards and other game features.</li>
            <li>To improve our website, products/services, marketing, and customer relationships.</li>
            <li>To recommend content that may be of interest to you.</li>
            <li>To administer and protect our business and this website.</li>
          </ul>
        </section>
        
        <section>
          <h2>5. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We use Supabase, a secure database service, to store your information.</p>
        </section>
        
        <section>
          <h2>6. Data Retention</h2>
          <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
        </section>
        
        <section>
          <h2>7. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
        </section>
        
        <section>
          <h2>8. Revoking Google Access</h2>
          <p>You can revoke ClickyGame's access to your Google account at any time by:</p>
          <ol>
            <li>Visiting <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account Permissions</a></li>
            <li>Selecting ClickyGame from the list of apps connected to your account</li>
            <li>Clicking "Remove Access"</li>
          </ol>
          <p>Revoking access will prevent you from using Google to sign in to ClickyGame, but you can still create a standard account using email and password.</p>
        </section>
        
        <section>
          <h2>9. Changes to This Privacy Policy</h2>
          <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date at the top of this privacy policy.</p>
        </section>
        
        <section>
          <h2>10. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
          <p>Email: privacy@clickygame.com</p>
        </section>
      </div>
    </>
  );
}
