'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function JobDetailContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  // Sample jobs data
  const jobsData = {
    1: {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp Inc.',
      logo: 'https://logo.clearbit.com/google.com',
      salary: { min: 1200, max: 1800 },
      office: 'Prampir Meakkarr',
      location: 'Phnom Penh',
      type: 'Full-Time',
      date: '15 Jan 2026',
      skills: ['JavaScript', 'React', 'Node.js'],
      matchScore: 92,
      description: 'Looking for experienced software engineer to lead development',
      about: 'We are seeking an exceptional Senior Software Engineer to join our engineering team. You will work on cutting-edge technologies and mentor junior developers while building scalable solutions.',
      responsibilities: [
        'Lead development of new features and architecture',
        'Mentor junior developers and conduct code reviews',
        'Collaborate with product and design teams',
        'Optimize application performance',
        'Participate in technical decision-making'
      ],
      requirements: [
        '5+ years of professional software development experience',
        'Strong proficiency in JavaScript/TypeScript',
        'Experience with React and Node.js',
        'Understanding of software architecture principles',
        'Excellent problem-solving and communication skills'
      ],
      benefits: [
        'Competitive salary $1200 - $1800',
        'Health insurance and wellness benefits',
        'Flexible working hours',
        'Remote work opportunities',
        'Professional development budget',
        '20 days annual leave'
      ]
    },
    2: {
      id: 2,
      title: 'Marketing Manager',
      company: 'Digital Solutions Ltd.',
      logo: 'https://logo.clearbit.com/microsoft.com',
      salary: { min: 800, max: 1100 },
      office: 'Angkor Wat Area',
      location: 'Siem Reap',
      type: 'Full-Time',
      date: '20 Jan 2026',
      skills: ['Marketing', 'Leadership', 'Analytics'],
      matchScore: 78,
      description: 'Lead marketing strategy and team',
      about: 'Lead our marketing team to drive brand awareness and customer acquisition. You will develop strategies, manage campaigns, and work with cross-functional teams.',
      responsibilities: [
        'Develop and execute marketing strategies',
        'Manage marketing team and budget',
        'Create and oversee advertising campaigns',
        'Analyze marketing metrics and ROI',
        'Collaborate with sales and product teams'
      ],
      requirements: [
        '3+ years of marketing management experience',
        'Strong leadership and communication skills',
        'Experience with digital marketing tools',
        'Data analysis and reporting skills',
        'Creative thinking and problem-solving'
      ],
      benefits: [
        'Competitive salary $800 - $1100',
        'Performance bonuses',
        'Flexible schedule',
        'Team building events',
        'Career development programs'
      ]
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load job data
    if (jobId && jobsData[jobId]) {
      setJob(jobsData[jobId]);
    }

    // Check if saved
    const savedJobs = localStorage.getItem('savedJobs');
    if (savedJobs && JSON.parse(savedJobs)[jobId]) {
      setIsSaved(true);
    }
  }, [jobId]);

  const handleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '{}');
    if (isSaved) {
      delete savedJobs[jobId];
    } else {
      savedJobs[jobId] = true;
    }
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    if (!currentUser) {
      alert('Please log in to apply for this job');
      return;
    }
    alert(`Application sent for ${job.title}! We'll review your resume and get back to you soon.`);
  };

  if (!job) {
    return (
      <>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main className="main-content">
          <div className="empty-state">
            <i className="fas fa-briefcase"></i>
            <p>Job not found</p>
            <Link href="/">
              <button className="btn-primary">Back to Home</button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content job-detail-page">
        <section className="job-detail-hero">
          <div className="job-detail-header">
            <div className="job-logo-section">
              <img src={job.logo} alt={job.company} onError={(e) => {
                e.target.style.display = 'none';
              }} />
            </div>

            <div className="job-detail-title">
              <h1>{job.title}</h1>
              <p className="company-name">{job.company}</p>
              
              <div className="job-detail-meta">
                <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                <span><i className="fas fa-briefcase"></i> {job.type}</span>
                <span><i className="fas fa-dollar-sign"></i> ${job.salary.min}K - ${job.salary.max}K</span>
                <span><i className="fas fa-calendar"></i> Posted {job.date}</span>
              </div>

              {job.matchScore && (
                <div className="match-score-inline">
                  <div className="match-badge">{job.matchScore}% Match</div>
                </div>
              )}
            </div>

            <div className="job-detail-actions">
              <button 
                className={`btn-save-job ${isSaved ? 'saved' : ''}`}
                onClick={handleSaveJob}
              >
                <i className={`fas fa-heart ${isSaved ? 'fas' : 'far'}`}></i>
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button className="btn-apply-large" onClick={handleApply}>
                <i className="fas fa-paper-plane"></i> Apply Now
              </button>
            </div>
          </div>
        </section>

        <div className="job-detail-container">
          <div className="job-detail-main">
            {/* About Section */}
            <section className="detail-section">
              <h2>About This Role</h2>
              <p>{job.about}</p>
            </section>

            {/* Responsibilities */}
            <section className="detail-section">
              <h2>Responsibilities</h2>
              <ul className="detail-list">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check-circle"></i> {resp}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="detail-section">
              <h2>Requirements</h2>
              <ul className="detail-list">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check-circle"></i> {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section className="detail-section">
              <h2>Required Skills</h2>
              <div className="skills-tags">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="job-detail-sidebar">
            {/* Benefits Card */}
            <div className="sidebar-card">
              <h3>What We Offer</h3>
              <ul className="benefits-list">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <i className="fas fa-star"></i> {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Info Card */}
            <div className="sidebar-card">
              <h3>Job Details</h3>
              <div className="info-item">
                <span className="info-label">Office Location</span>
                <p>{job.office}</p>
              </div>
              <div className="info-item">
                <span className="info-label">Job Type</span>
                <p>{job.type}</p>
              </div>
              <div className="info-item">
                <span className="info-label">Salary Range</span>
                <p>${job.salary.min}K - ${job.salary.max}K</p>
              </div>
              <div className="info-item">
                <span className="info-label">Posted Date</span>
                <p>{job.date}</p>
              </div>
            </div>

            {/* Apply Card */}
            <div className="sidebar-card apply-card">
              <h3>Interested?</h3>
              <p>Apply now and start your journey with {job.company}!</p>
              <button className="btn-apply-sidebar" onClick={handleApply}>
                <i className="fas fa-paper-plane"></i> Apply for this job
              </button>
            </div>

            {/* Contact Card */}
            <div className="sidebar-card contact-card">
              <h3>Questions?</h3>
              <p>Contact the hiring team for more information</p>
              <a href="mailto:careers@company.com" className="btn-contact">
                <i className="fas fa-envelope"></i> Contact Us
              </a>
            </div>
          </aside>
        </div>

        {/* Similar Jobs */}
        <section className="similar-jobs-section">
          <h2>Similar Job Opportunities</h2>
          <div className="similar-jobs-grid">
            {[3, 4].map((jobNum) => (
              <div key={jobNum} className="similar-job-card">
                <h3>Similar Job {jobNum}</h3>
                <p>A matching opportunity based on your preferences</p>
                <Link href={`/job-detail?id=${jobNum}`}>
                  <button className="btn-secondary">View Details</button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default function JobDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDetailContent />
    </Suspense>
  );
}
