'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content">
        <section className="section">
          <div className="section-container policy-content">
            <h2>Privacy Policy</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3>1. Introduction</h3>
            <p>
              AhhChip ("we", "our", "us") respects your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information.
            </p>

            <h3>2. Information We Collect</h3>
            <p>
              We collect information you provide directly, such as when you create an account, upload
              a CV, or contact us. This may include:
            </p>
            <ul>
              <li>Name and email address</li>
              <li>Resume/CV information</li>
              <li>Account preferences</li>
            </ul>

            <h3>3. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your inquiries</li>
              <li>Improve our platform</li>
            </ul>

            <h3>4. Contact Us</h3>
            <p>
              If you have questions about this Privacy Policy, please contact us at support@ahchip.com
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
