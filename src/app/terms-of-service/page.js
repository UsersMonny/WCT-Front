'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function TermsOfService() {
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
            <h2>Terms of Service</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using AhhChip, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>

            <h3>2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or
              software) on AhhChip for personal, non-commercial transitory viewing only.
            </p>

            <h3>3. Disclaimer</h3>
            <p>
              The materials on AhhChip's website are provided on an 'as is' basis. AhhChip makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>

            <h3>4. Limitations</h3>
            <p>
              In no event shall AhhChip or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising
              out of the use or inability to use the materials.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us at
              support@ahchip.com
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
