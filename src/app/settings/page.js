'use client';

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function Settings() {
  const [currentUser, setCurrentUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load resumes from localStorage
    const savedResumes = localStorage.getItem('userResumes');
    if (savedResumes) {
      const resumeList = JSON.parse(savedResumes);
      setResumes(resumeList);
      const active = resumeList.find(r => r.isActive);
      if (active) {
        setActiveResume(active.id);
      }
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF and DOCX files are allowed');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      setUploadProgress(progress);

      if (progress === 100) {
        clearInterval(interval);

        // Create resume entry
        const newResume = {
          id: Date.now(),
          name: file.name,
          type: file.type.includes('pdf') ? 'PDF' : 'DOCX',
          size: (file.size / 1024).toFixed(2) + ' KB',
          uploadedAt: new Date().toLocaleDateString(),
          isActive: resumes.length === 0 // First resume is active
        };

        const updatedResumes = resumes.map(r => ({
          ...r,
          isActive: false
        }));

        const newResumes = [...updatedResumes, newResume];
        setResumes(newResumes);
        if (newResume.isActive) {
          setActiveResume(newResume.id);
        }

        // Save to localStorage
        localStorage.setItem('userResumes', JSON.stringify(newResumes));

        // Reset upload
        setUploadProgress(0);
        e.target.value = '';
      }
    }, 300);
  };

  const setAsActive = (resumeId) => {
    const updatedResumes = resumes.map(r => ({
      ...r,
      isActive: r.id === resumeId
    }));
    setResumes(updatedResumes);
    setActiveResume(resumeId);
    localStorage.setItem('userResumes', JSON.stringify(updatedResumes));
  };

  const deleteResume = (resumeId) => {
    const updatedResumes = resumes.filter(r => r.id !== resumeId);
    setResumes(updatedResumes);
    if (activeResume === resumeId) {
      setActiveResume(updatedResumes.length > 0 ? updatedResumes[0].id : null);
    }
    localStorage.setItem('userResumes', JSON.stringify(updatedResumes));
  };

  const downloadResume = (resume) => {
    alert(`Downloading ${resume.name} (mock - not implemented in demo)`);
  };

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="main-content settings-page">
        <section className="settings-hero">
          <h1>Resume Management</h1>
          <p>Upload and manage your resumes for job applications</p>
        </section>

        <div className="settings-container">
          {/* Upload Section */}
          <section className="settings-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-cloud-upload-alt"></i> Upload Resume
              </h2>
              <p>Supported formats: PDF, DOCX (Max 5MB)</p>
            </div>

            <div className="upload-area">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="resume-upload" className="upload-box">
                <i className="fas fa-file-upload"></i>
                <h3>Drag and drop your resume here</h3>
                <p>or click to browse</p>
                <span className="file-info">PDF or DOCX • Up to 5MB</span>
              </label>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p>{Math.round(uploadProgress)}% uploading...</p>
                </div>
              )}
            </div>
          </section>

          {/* Resumes List Section */}
          <section className="settings-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-list"></i> Your Resumes ({resumes.length})
              </h2>
            </div>

            {resumes.length > 0 ? (
              <div className="resumes-list">
                {resumes.map((resume) => (
                  <div key={resume.id} className="resume-item">
                    <div className="resume-icon">
                      <i className={`fas fa-file-${resume.type === 'PDF' ? 'pdf' : 'word'}`}></i>
                    </div>

                    <div className="resume-info">
                      <div className="resume-name-row">
                        <h3>{resume.name}</h3>
                        {resume.isActive && (
                          <span className="badge-active">
                            <i className="fas fa-check-circle"></i> Active
                          </span>
                        )}
                      </div>
                      <div className="resume-meta">
                        <span><i className="fas fa-file-alt"></i> {resume.type}</span>
                        <span><i className="fas fa-database"></i> {resume.size}</span>
                        <span><i className="fas fa-calendar"></i> {resume.uploadedAt}</span>
                      </div>
                    </div>

                    <div className="resume-actions">
                      <button
                        className={`btn-action ${resume.isActive ? 'disabled' : ''}`}
                        onClick={() => setAsActive(resume.id)}
                        disabled={resume.isActive}
                        title="Set as active resume"
                      >
                        <i className="fas fa-star"></i> Set Active
                      </button>
                      <button
                        className="btn-action"
                        onClick={() => downloadResume(resume)}
                        title="Download resume"
                      >
                        <i className="fas fa-download"></i> Download
                      </button>
                      <button
                        className="btn-action danger"
                        onClick={() => {
                          if (confirm('Delete this resume?')) {
                            deleteResume(resume.id);
                          }
                        }}
                        title="Delete resume"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-file-upload"></i>
                <p>No resumes uploaded yet</p>
                <p className="empty-subtitle">Upload your first resume to get started with job applications</p>
              </div>
            )}
          </section>

          {/* Tips Section */}
          <section className="settings-section tips-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-lightbulb"></i> Resume Tips
              </h2>
            </div>

            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-number">1</div>
                <h3>Keep It Concise</h3>
                <p>One page for entry-level, two pages for experienced professionals</p>
              </div>

              <div className="tip-card">
                <div className="tip-number">2</div>
                <h3>Use Keywords</h3>
                <p>Include relevant keywords from job descriptions for better matching</p>
              </div>

              <div className="tip-card">
                <div className="tip-number">3</div>
                <h3>Highlight Skills</h3>
                <p>Emphasize technical and soft skills that match job requirements</p>
              </div>

              <div className="tip-card">
                <div className="tip-number">4</div>
                <h3>Format Well</h3>
                <p>Use clean formatting, clear sections, and proper file format</p>
              </div>

              <div className="tip-card">
                <div className="tip-number">5</div>
                <h3>Customize</h3>
                <p>Create multiple versions for different job types or industries</p>
              </div>

              <div className="tip-card">
                <div className="tip-number">6</div>
                <h3>Proofread</h3>
                <p>Check for grammar and spelling errors before submitting</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
