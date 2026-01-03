'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function HowItWorks() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Create Your Account',
      description: 'Sign up and create your free AhhChip account.',
    },
    {
      id: 2,
      title: 'Upload Your CV',
      description: 'Upload your resume or CV to your profile.',
    },
    {
      id: 3,
      title: 'Browse Jobs',
      description: 'Explore job opportunities tailored to your profile.',
    },
    {
      id: 4,
      title: 'Apply & Track',
      description: 'Apply to jobs and track your applications in one place.',
    },
  ];

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content">
        <section className="section">
          <div className="section-container">
            <h2>How It Works</h2>
            <div className="steps-grid">
              {steps.map((step) => (
                <div key={step.id} className="step-card">
                  <div className="step-number">{step.id}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
