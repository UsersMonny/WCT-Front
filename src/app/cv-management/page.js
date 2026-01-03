'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CVManagement() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cvFiles, setCvFiles] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: [],
    skills: []
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load CVs from localStorage
    const savedCVs = localStorage.getItem('userCVs');
    if (savedCVs) {
      setCvFiles(JSON.parse(savedCVs));
    } else {
      const defaultCVs = [
        {
          id: 1,
          name: 'Resume_2025.pdf',
          uploadDate: '2025-12-05',
          size: '245 KB',
          type: 'PDF',
          extracted: true,
          skills: ['React', 'JavaScript', 'Node.js', 'MongoDB']
        },
        {
          id: 2,
          name: 'CV_Latest.docx',
          uploadDate: '2025-12-03',
          size: '156 KB',
          type: 'DOCX',
          extracted: false,
          skills: []
        }
      ];
      setCvFiles(defaultCVs);
      localStorage.setItem('userCVs', JSON.stringify(defaultCVs));
    }

    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newCV = {
        id: Math.max(...cvFiles.map(cv => cv.id), 0) + 1,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: (file.size / 1024).toFixed(0) + ' KB',
        type: file.name.split('.').pop().toUpperCase(),
        extracted: false,
        skills: []
      };

      // Simulate text extraction (in real app, would use backend)
      const simulatedSkills = ['JavaScript', 'React', 'Python', 'AWS', 'SQL'];
      newCV.skills = simulatedSkills;
      newCV.extracted = true;

      const updated = [newCV, ...cvFiles];
      setCvFiles(updated);
      localStorage.setItem('userCVs', JSON.stringify(updated));
      setShowUploadForm(false);
      e.target.value = '';
    }
  };

  const handleDeleteCV = (id) => {
    const updated = cvFiles.filter(cv => cv.id !== id);
    setCvFiles(updated);
    localStorage.setItem('userCVs', JSON.stringify(updated));
  };

  const handleExtractData = (cvId) => {
    // Simulate data extraction from CV
    const simulatedData = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced full-stack developer with 5+ years in web development',
      experience: [
        { title: 'Senior Developer', company: 'Tech Corp', duration: '2022-Present' },
        { title: 'Developer', company: 'Digital Solutions', duration: '2020-2022' }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS']
    };
    setExtractedData(simulatedData);
    setFormData(simulatedData);
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    alert('Profile updated successfully!');
  };

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="cv-management-container">
        <header className="cv-header">
          <div className="cv-header-content">
            <h1>CV Management</h1>
            <p>Upload, manage, and extract information from your resumes</p>
          </div>
          <button className="btn-primary" onClick={() => setShowUploadForm(!showUploadForm)}>
            <i className="fas fa-upload"></i> Upload New CV
          </button>
        </header>

        <div className="cv-content">
          {/* Upload Form */}
          {showUploadForm && (
            <div className="upload-section card">
              <h2>Upload CV</h2>
              <p>Upload PDF, DOC, or DOCX file</p>
              <div className="upload-area">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="cv-upload" className="upload-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload or drag & drop</span>
                  <small>PDF, DOC, DOCX (Max 10MB)</small>
                </label>
              </div>
            </div>
          )}

          {/* CV Files List */}
          <section className="cv-files-section">
            <h2>My CVs ({cvFiles.length})</h2>
            <div className="cv-files-grid">
              {cvFiles.map(cv => (
                <div key={cv.id} className="cv-card">
                  <div className="cv-icon">
                    <i className={`fas fa-file-${cv.type.toLowerCase() === 'pdf' ? 'pdf' : 'word'}`}></i>
                  </div>
                  <div className="cv-info">
                    <h3>{cv.name}</h3>
                    <p className="cv-meta">{cv.uploadDate} • {cv.size}</p>
                    {cv.extracted && (
                      <div className="cv-skills-preview">
                        {cv.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                        {cv.skills.length > 3 && <span className="skill-tag">+{cv.skills.length - 3}</span>}
                      </div>
                    )}
                  </div>
                  <div className="cv-actions">
                    <button className="btn-icon blue" title="Extract" onClick={() => handleExtractData(cv.id)}>
                      <i className="fas fa-magic"></i>
                    </button>
                    <button className="btn-icon red" title="Delete" onClick={() => handleDeleteCV(cv.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Extracted Data & Profile */}
          <section className="profile-section card">
            <h2>Profile Information</h2>
            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1-555-0000"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="form-group full">
                <label>Professional Summary</label>
                <textarea
                  rows="4"
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="form-group full">
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim())})}
                  placeholder="React, JavaScript, Node.js, ..."
                />
              </div>

              <button className="btn-primary" onClick={handleSaveProfile}>
                <i className="fas fa-save"></i> Save Profile
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
