'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

export default function JobAlerts() {
  const [currentUser, setCurrentUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-Time',
    frequency: 'daily',
    email: true
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load alerts from localStorage
    const savedAlerts = localStorage.getItem('jobAlerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const createAlert = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a job title');
      return;
    }

    const newAlert = {
      id: Date.now(),
      title: formData.title,
      location: formData.location || 'All Locations',
      type: formData.type,
      frequency: formData.frequency,
      email: formData.email,
      createdAt: new Date().toLocaleDateString(),
      isActive: true
    };

    const updatedAlerts = [...alerts, newAlert];
    setAlerts(updatedAlerts);
    localStorage.setItem('jobAlerts', JSON.stringify(updatedAlerts));

    // Reset form
    setFormData({
      title: '',
      location: '',
      type: 'Full-Time',
      frequency: 'daily',
      email: true
    });
    setShowForm(false);
  };

  const toggleAlert = (alertId) => {
    const updatedAlerts = alerts.map(a =>
      a.id === alertId ? { ...a, isActive: !a.isActive } : a
    );
    setAlerts(updatedAlerts);
    localStorage.setItem('jobAlerts', JSON.stringify(updatedAlerts));
  };

  const deleteAlert = (alertId) => {
    const updatedAlerts = alerts.filter(a => a.id !== alertId);
    setAlerts(updatedAlerts);
    localStorage.setItem('jobAlerts', JSON.stringify(updatedAlerts));
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      immediately: 'Immediately',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly'
    };
    return labels[freq] || freq;
  };

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content alerts-page">
        <section className="alerts-hero">
          <h1>Job Alerts</h1>
          <p>Never miss a job opportunity. Set up custom alerts for your dream jobs.</p>
        </section>

        <div className="alerts-container">
          {/* Create Alert Button */}
          {!showForm && (
            <div className="create-alert-button-section">
              <button 
                className="btn-create-alert"
                onClick={() => setShowForm(true)}
              >
                <i className="fas fa-plus"></i> Create New Alert
              </button>
            </div>
          )}

          {/* Create Alert Form */}
          {showForm && (
            <section className="alerts-section create-alert-section">
              <div className="section-header">
                <h2>Create Job Alert</h2>
                <button
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={createAlert} className="alert-form">
                <div className="form-group">
                  <label htmlFor="title">
                    <i className="fas fa-briefcase"></i> Job Title or Keywords
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Developer, React Engineer"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">
                      <i className="fas fa-map-marker-alt"></i> Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    >
                      <option value="">All Locations</option>
                      <option value="Phnom Penh">Phnom Penh</option>
                      <option value="Siem Reap">Siem Reap</option>
                      <option value="Battambang">Battambang</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">
                      <i className="fas fa-briefcase"></i> Job Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="frequency">
                    <i className="fas fa-clock"></i> Notification Frequency
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                  >
                    <option value="immediately">Immediately</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                    <option value="monthly">Monthly Digest</option>
                  </select>
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="email"
                      checked={formData.email}
                      onChange={handleInputChange}
                    />
                    <span>Send email notifications</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    <i className="fas fa-check"></i> Create Alert
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Alerts List */}
          <section className="alerts-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-list"></i> Your Alerts ({alerts.length})
              </h2>
            </div>

            {alerts.length > 0 ? (
              <div className="alerts-list">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.isActive ? 'active' : 'inactive'}`}>
                    <div className="alert-content">
                      <div className="alert-header">
                        <h3>
                          <i className="fas fa-search"></i> {alert.title}
                        </h3>
                        <span className={`status-badge ${alert.isActive ? 'active' : 'inactive'}`}>
                          {alert.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="alert-details">
                        {alert.location && (
                          <span className="detail-item">
                            <i className="fas fa-map-marker-alt"></i> {alert.location}
                          </span>
                        )}
                        <span className="detail-item">
                          <i className="fas fa-briefcase"></i> {alert.type}
                        </span>
                        <span className="detail-item">
                          <i className="fas fa-bell"></i> {getFrequencyLabel(alert.frequency)}
                        </span>
                        {alert.email && (
                          <span className="detail-item">
                            <i className="fas fa-envelope"></i> Email enabled
                          </span>
                        )}
                        <span className="detail-item">
                          <i className="fas fa-calendar"></i> Created {alert.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="alert-actions">
                      <button
                        className={`btn-toggle ${alert.isActive ? 'active' : 'inactive'}`}
                        onClick={() => toggleAlert(alert.id)}
                        title={alert.isActive ? 'Deactivate alert' : 'Activate alert'}
                      >
                        <i className={`fas fa-${alert.isActive ? 'pause' : 'play'}`}></i>
                        {alert.isActive ? 'Pause' : 'Resume'}
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          if (confirm('Delete this alert?')) {
                            deleteAlert(alert.id);
                          }
                        }}
                        title="Delete alert"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-bell"></i>
                <p>No job alerts yet</p>
                <p className="empty-subtitle">Create your first alert to get notified about matching jobs</p>
              </div>
            )}
          </section>

          {/* Tips Section */}
          <section className="alerts-section tips-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-lightbulb"></i> Alert Tips
              </h2>
            </div>

            <div className="tips-grid">
              <div className="tip-card">
                <i className="fas fa-key"></i>
                <h3>Use Keywords</h3>
                <p>Include specific skills or job titles for better matches</p>
              </div>

              <div className="tip-card">
                <i className="fas fa-map"></i>
                <h3>Set Location</h3>
                <p>Filter by location to see jobs near you or remote opportunities</p>
              </div>

              <div className="tip-card">
                <i className="fas fa-history"></i>
                <h3>Adjust Frequency</h3>
                <p>Choose daily or weekly digests based on how active you want to be</p>
              </div>

              <div className="tip-card">
                <i className="fas fa-users"></i>
                <h3>Multiple Alerts</h3>
                <p>Create separate alerts for different roles or career paths</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
