'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState({});
  const [activeTab, setActiveTab] = useState('jobs');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Sample job listings with ML match scores
  const jobs = [
    {
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
      matchScore: 92
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'Digital Solutions Ltd.',
      logo: 'https://logo.clearbit.com/microsoft.com',
      salary: { min: 800, max: 1100 },
      office: 'Angkor Wat Area',
      location: 'Siem Reap',
      type: 'Full-Time',
      date: '20 Jan 2026',
      skills: ['Marketing', 'Leadership'],
      matchScore: 78
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Agency',
      logo: 'https://logo.clearbit.com/apple.com',
      salary: { min: 600, max: 900 },
      office: 'BKK1 District',
      location: 'Phnom Penh',
      type: 'Part-Time',
      date: '10 Jan 2026',
      skills: ['UI Design', 'Figma', 'UX Research'],
      matchScore: 85
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'Analytics Pro',
      logo: 'https://logo.clearbit.com/amazon.com',
      salary: { min: 700, max: 1000 },
      office: 'City Center',
      location: 'Battambang',
      type: 'Full-Time',
      date: '25 Jan 2026',
      skills: ['Python', 'SQL', 'Analytics'],
      matchScore: 88

    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  // Mock ML recommendations
  const recommendations = jobs.filter(j => j.matchScore >= 80).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content">
        {/* Hero Section */}
        <section className="jobs-hero-banner">
          <div className="hero-overlay"></div>
          <div className="hero-banner-content">
            <h1>Find Your Perfect Job Match</h1>
            <p className="hero-subtitle">Powered by AI-Driven Recommendations</p>

            {/* Search Box */}
            <div className="hero-search-box">
              <div className="search-input-wrapper">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn-hero-search">
                <i className="fas fa-search"></i>
                Search
              </button>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar-container">
              <div className="filter-chips">
                <select className="filter-chip-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="">All Job Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
                <select className="filter-chip-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                  <option value="">All Locations</option>
                  <option value="Phnom Penh">Phnom Penh</option>
                  <option value="Siem Reap">Siem Reap</option>
                  <option value="Battambang">Battambang</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs for different views */}
        <section className="tabs-section">
          <div className="tabs-container">
            <button 
              className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              <i className="fas fa-briefcase"></i> All Jobs
            </button>
            <button 
              className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              <i className="fas fa-robot"></i> ML Recommendations
            </button>
            <button 
              className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              <i className="fas fa-star"></i> Platform Features
            </button>
          </div>
        </section>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <section className="jobs-list-section">
            <h2 className="section-title">Available Job Listings ({filteredJobs.length})</h2>
            <div className="jobs-list">
              {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <div className="job-company-logo">
                      <img src={job.logo} alt={job.company} onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<i class="fas fa-building"></i>';
                      }} />
                    </div>
                    <div className="job-header-content">
                      <div className="job-header-top">
                        <p className="company-name">{job.company}</p>
                        <button
                          className={`btn-save-job ${savedJobs[job.id] ? 'saved' : ''}`}
                          onClick={() => toggleSaveJob(job.id)}
                          title={savedJobs[job.id] ? 'Unsave job' : 'Save job'}
                        >
                          <i className={savedJobs[job.id] ? 'fas fa-heart' : 'far fa-heart'}></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="job-title-salary">
                    <h3>{job.title}</h3>
                    <p className="job-salary">${job.salary.min} - ${job.salary.max}</p>
                  </div>

                  <div className="job-details">
                    <div className="job-detail-item">
                      <span className="job-detail-label">Office</span>
                      <span className="job-detail-value">
                        <i className="fas fa-map-marker-alt"></i> {job.office}
                      </span>
                    </div>
                    <div className="job-detail-item">
                      <span className="job-detail-label">Location</span>
                      <span className="job-detail-value">
                        <i className="fas fa-location-dot"></i> {job.location}
                      </span>
                    </div>
                    <div className="job-detail-item">
                      <span className="job-detail-label">Type</span>
                      <span className="job-detail-value">
                        <i className="fas fa-briefcase"></i> {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="job-skills">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">{skill}</span>
                    ))}
                  </div>

                  <Link href={`/job-detail?id=${job.id}`}>
                    <button className="btn-view-job">View Details & Apply</button>
                  </Link>
                </div>
              )) : (
                <div className="empty-state">
                  <i className="fas fa-search"></i>
                  <p>No jobs match your criteria</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ML Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <section className="recommendations-section">
            <h2 className="section-title">
              <i className="fas fa-robot"></i> AI-Powered Recommendations
            </h2>
            <p className="section-subtitle">Jobs matched to your profile based on ML analysis</p>
            
            {currentUser ? (
              <div className="recommendations-grid">
                {recommendations.length > 0 ? recommendations.map((job) => (
                  <div key={job.id} className="recommendation-card">
                    <div className="match-score-badge">
                      <div className="match-percentage">{job.matchScore}%</div>
                      <div className="match-label">Match</div>
                    </div>
                    
                    <div className="rec-header">
                      <img src={job.logo} alt={job.company} onError={(e) => {
                        e.target.style.display = 'none';
                      }} />
                      <div className="rec-title">
                        <h4>{job.title}</h4>
                        <p>{job.company}</p>
                      </div>
                    </div>

                    <div className="rec-details">
                      <p><i className="fas fa-dollar-sign"></i> ${job.salary.min}K - ${job.salary.max}K</p>
                      <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                      <p><i className="fas fa-briefcase"></i> {job.type}</p>
                    </div>

                    <div className="rec-skills">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>

                    <div className="rec-actions">
                      <button 
                        className={`btn-save-rec ${savedJobs[job.id] ? 'saved' : ''}`}
                        onClick={() => toggleSaveJob(job.id)}
                      >
                        <i className={savedJobs[job.id] ? 'fas fa-heart' : 'far fa-heart'}></i>
                      </button>
                      <Link href={`/job-detail?id=${job.id}`}>
                        <button className="btn-apply">Apply Now</button>
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="empty-state">
                    <p>No recommendations available yet. Upload your resume to get personalized matches!</p>
                    <Link href="/settings">
                      <button className="btn-primary">Upload Resume</button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <p>Please log in to see personalized recommendations</p>
                <Link href="/login">
                  <button className="btn-primary">Login</button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <section className="features-section">
            <h2 className="section-title">Platform Features</h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>ML Job Matching</h3>
                <p>AI analyzes your skills and resume to find perfect job matches</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-file-upload"></i>
                </div>
                <h3>Resume Management</h3>
                <p>Upload PDF or DOCX files. Support for multiple resume versions</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <h3>Job Alerts</h3>
                <p>Get notified about matching jobs. Email alerts for your criteria</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Save Jobs</h3>
                <p>Bookmark your favorite jobs and review them later</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-google"></i>
                </div>
                <h3>Social Login</h3>
                <p>Sign up/login with Google or Facebook for quick access</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Admin Controls</h3>
                <p>Post jobs, manage listings, and crawl from other platforms</p>
              </div>
            </div>

            <div className="features-benefits">
              <h3>Why Choose AhhChip?</h3>
              <ul>
                <li>✅ Advanced ML-powered job matching (85%+ accuracy)</li>
                <li>✅ Support for PDF and DOCX resume uploads</li>
                <li>✅ Email-based job alerts and notifications</li>
                <li>✅ Social media authentication (Google, Facebook)</li>
                <li>✅ Admin dashboard for job management</li>
                <li>✅ Automatic job crawling from multiple sources</li>
                <li>✅ User roles: Admin and Regular Users</li>
                <li>✅ Fast, responsive, and secure platform</li>
              </ul>
            </div>
          </section>
        )}

        {/* Saved Jobs Sidebar */}
        {Object.values(savedJobs).some(v => v) && (
          <section className="saved-jobs-sidebar">
            <h3>💾 Saved Jobs ({Object.values(savedJobs).filter(v => v).length})</h3>
            <p>You have {Object.values(savedJobs).filter(v => v).length} saved jobs</p>
            <Link href="/settings">
              <button className="btn-view-saved">View All Saved</button>
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
