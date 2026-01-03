'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function FAQ() {
  const [currentUser, setCurrentUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const faqs = [
    {
      id: 1,
      question: 'How do I upload my CV?',
      answer: 'You can upload your CV from the CV section on your dashboard. Click the "Upload New CV" button.',
    },
    {
      id: 2,
      question: 'Can I apply to multiple jobs?',
      answer: 'Yes, you can apply to as many jobs as you want. Each application is tracked separately.',
    },
    {
      id: 3,
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
  ];

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content">
        <section className="section">
          <div className="section-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="faq-item"
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <i className={`fas fa-chevron-${expandedId === faq.id ? 'up' : 'down'}`}></i>
                  </div>
                  {expandedId === faq.id && <p className="faq-answer">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
