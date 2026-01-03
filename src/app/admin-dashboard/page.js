'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [adminTab, setAdminTab] = useState('jobs');
  const [loadingUser, setLoadingUser] = useState(true);
  const [jobListings, setJobListings] = useState([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoadingUser(false);

    // Load jobs from localStorage or use defaults
    const savedJobs = localStorage.getItem('adminJobs');
    if (savedJobs) {
      setJobListings(JSON.parse(savedJobs));
    } else {
      const defaultJobs = [
        { id: 1, title: 'Senior Software Engineer', company: 'Tech Corp Inc.', location: 'San Francisco, CA', salary: '$150,000 - $180,000', posted: '2025-12-05', applicants: 12, status: 'Active', logo: 'https://via.placeholder.com/44/ffffff/4285F4?text=G' },
        { id: 2, title: 'Product Designer', company: 'Design Studio', location: 'New York, NY', salary: '$120,000 - $140,000', posted: '2025-12-04', applicants: 8, status: 'Active', logo: 'https://via.placeholder.com/44/ffffff/6EE7B7?text=D' },
        { id: 3, title: 'Marketing Manager', company: 'Growth Co.', location: 'Austin, TX', salary: '$100,000 - $130,000', posted: '2025-12-03', applicants: 5, status: 'Active', logo: 'https://via.placeholder.com/44/ffffff/FB923C?text=M' },
      ];
      setJobListings(defaultJobs);
      localStorage.setItem('adminJobs', JSON.stringify(defaultJobs));
    }
  }, []);

  const handleAddJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: Math.max(...jobListings.map(j => j.id), 0) + 1,
      ...formData,
      posted: new Date().toISOString().split('T')[0],
      applicants: 0,
      status: 'Active',
      logo: 'https://via.placeholder.com/44/ffffff/FB923C?text=' + formData.company.charAt(0).toUpperCase()
    };
    const updated = [...jobListings, newJob];
    setJobListings(updated);
    localStorage.setItem('adminJobs', JSON.stringify(updated));
    setShowAddJobModal(false);
    setFormData({ title: '', company: '', location: '', salary: '', description: '' });
  };

  const handleDeleteJob = (id) => {
    const updated = jobListings.filter(job => job.id !== id);
    setJobListings(updated);
    localStorage.setItem('adminJobs', JSON.stringify(updated));
  };

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2025-11-20', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2025-11-25', status: 'Active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', joined: '2025-12-01', status: 'Suspended' },
  ];

  if (!loadingUser && (!currentUser || currentUser.role !== 'admin')) {
    return (
      <>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main style={{padding: '48px'}}>
          <div className="admin-access-denied">
            <h2>Access denied</h2>
            <p>You do not have permission to view this page. If you believe this is an error, please contact the site administrator.</p>
            <p>
              <a href="/" className="btn-ghost">Return to Home</a>
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="admin-page-container">
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1>{adminTab === 'jobs' ? 'Manage Jobs' : adminTab === 'dashboard' ? 'Dashboard' : adminTab === 'crawl' ? 'Job Crawler' : adminTab === 'tickets' ? 'Support Tickets' : adminTab === 'users' ? 'Users' : adminTab === 'analytics' ? 'Analytics' : 'Settings'}</h1>
          </div>
          <div className="topbar-right">
            <input className="search-input" placeholder="Search jobs, companies..." />
            <button className="btn-primary topbar-cta" onClick={() => setShowAddJobModal(true)}><i className="fas fa-plus"></i> Add New Job</button>
          </div>
        </header>

        <div className="admin-layout">
          <aside className="admin-sidebar">
          <div className="sidebar-logo">
            <h2>AhhChip</h2>
          </div>
          <nav className="sidebar-nav">
            <button className={`sidebar-item ${adminTab === 'dashboard' ? 'active' : ''}`} onClick={() => setAdminTab('dashboard')}>
              <i className="fas fa-chart-line"></i>
              <span>Dashboard</span>
            </button>
            <button className={`sidebar-item ${adminTab === 'jobs' ? 'active' : ''}`} onClick={() => setAdminTab('jobs')}>
              <i className="fas fa-briefcase"></i>
              <span>Manage Jobs</span>
            </button>
            <button className={`sidebar-item ${adminTab === 'crawl' ? 'active' : ''}`} onClick={() => setAdminTab('crawl')}>
              <i className="fas fa-spider"></i>
              <span>Job Crawler</span>
            </button>
            <button className={`sidebar-item ${adminTab === 'tickets' ? 'active' : ''}`} onClick={() => setAdminTab('tickets')}>
              <i className="fas fa-ticket-alt"></i>
              <span>Support Tickets</span>
            </button>
            <button className={`sidebar-item ${adminTab === 'users' ? 'active' : ''}`} onClick={() => setAdminTab('users')}>
              <i className="fas fa-users"></i>
              <span>Users</span>
            </button>
            <button className={`sidebar-item ${adminTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminTab('analytics')}>
              <i className="fas fa-chart-bar"></i>
              <span>Analytics</span>
            </button>
            <button className={`sidebar-item ${adminTab === 'settings' ? 'active' : ''}`} onClick={() => setAdminTab('settings')}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        <main className="admin-main">

          <section className="admin-stats-row">
            <div className="stat-card large">
              <div className="stat-icon orange"><i className="fas fa-briefcase"></i></div>
              <div className="stat-text">
                <h3>{jobListings.length}</h3>
                <p>Total Jobs</p>
              </div>
            </div>

            <div className="stat-card large">
              <div className="stat-icon"><i className="fas fa-eye"></i></div>
              <div className="stat-text">
                <h3>{jobListings.filter(j => j.status === 'Active').length}</h3>
                <p>Active Jobs</p>
              </div>
            </div>

            <div className="stat-card large">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-text">
                <h3>60</h3>
                <p>Applications</p>
              </div>
            </div>
          </section>

          <section className="jobs-panel">
            <div className="panel-header">
              <h2>Job Listings</h2>
            </div>

            <div className="panel-card">
              <table className="jobs-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobListings.map((job) => (
                    <tr key={job.id}>
                      <td className="job-title-cell">
                        <div className="job-title-wrap">
                          <div className="logo-placeholder">
                            {job.logo ? <img src={job.logo} alt={`${job.company} logo`} className="company-logo"/> : <i className="fas fa-building"></i>}
                          </div>
                          <div>
                            <strong>{job.title}</strong>
                            <div className="job-sub">{job.company}</div>
                          </div>
                        </div>
                      </td>
                      <td>{job.company}</td>
                      <td>{job.location || 'San Francisco, CA'}</td>
                      <td>{job.salary || '$120k - $180k'}</td>
                      <td><span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span></td>
                      <td>
                        <div className="row-actions">
                          <button className="btn-icon blue" title="Edit"><i className="fas fa-edit"></i></button>
                          <button className="btn-icon red" title="Delete" onClick={() => handleDeleteJob(job.id)}><i className="fas fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        </div>
      </div>

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="modal-overlay" onClick={() => setShowAddJobModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Job</h2>
              <button className="modal-close" onClick={() => setShowAddJobModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Job Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g., Tech Corp Inc."
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div className="form-group">
                <label>Salary Range</label>
                <input 
                  type="text" 
                  required
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  placeholder="e.g., $120,000 - $150,000"
                />
              </div>
              <div className="form-group">
                <label>Job Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter job description..."
                  rows="5"
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowAddJobModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
