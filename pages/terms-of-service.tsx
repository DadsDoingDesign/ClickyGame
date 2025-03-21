import Head from 'next/head';
import { useTheme } from '@/context/ThemeContext';

export default function TermsOfService() {
  const { theme } = useTheme();
  
  return (
    <>
      <Head>
        <title>Terms of Service - ClickyGame</title>
        <meta name="description" content="Terms of Service for ClickyGame" />
      </Head>
      
      <div className="terms-container">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to ClickyGame. These Terms of Service ("Terms") govern your use of the ClickyGame website and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.</p>
        </section>
        
        <section>
          <h2>2. Description of Service</h2>
          <p>ClickyGame is an online clicking game where users can compete for high scores and track their progress on leaderboards. The Service may include features such as game play, user accounts, leaderboards, and other related services.</p>
        </section>
        
        <section>
          <h2>3. User Accounts</h2>
          <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
        </section>
        
        <section>
          <h2>4. User Content</h2>
          <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
          <p>By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</p>
        </section>
        
        <section>
          <h2>5. Prohibited Uses</h2>
          <p>You agree not to use the Service:</p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm the Company or users of the Service or expose them to liability.</li>
            <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service.</li>
            <li>To use any automated means or process to access, retrieve, scrape, or index any portion of the Service.</li>
          </ul>
        </section>
        
        <section>
          <h2>6. Intellectual Property</h2>
          <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of ClickyGame and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ClickyGame.</p>
        </section>
        
        <section>
          <h2>7. Termination</h2>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>
        </section>
        
        <section>
          <h2>8. Limitation of Liability</h2>
          <p>In no event shall ClickyGame, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>
        </section>
        
        <section>
          <h2>9. Disclaimer</h2>
          <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
        </section>
        
        <section>
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
        </section>
        
        <section>
          <h2>11. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
        </section>
        
        <section>
          <h2>12. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>Email: terms@clickygame.com</p>
        </section>
      </div>
    </>
  );
}
