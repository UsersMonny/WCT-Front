'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match',
      });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters',
      });
      return;
    }

    // In a real app, you would send this to a backend
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: 'user',
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setMessage({
      type: 'success',
      title: 'Account Created',
      text: 'Welcome to AhhChip!',
    });

    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  const handleSocialSignup = (provider) => {
    setMessage({
      type: 'info',
      title: 'Demo Mode',
      text: `Sign up with ${provider} (Demo)`,
    });
  };

  return (
    <div className="auth-page">
      <Link href="/">
        <button className="btn-back-auth">
          <i className="fas fa-arrow-left"></i>
        </button>
      </Link>

      <div className="auth-container">
        {/* Left Side - Image */}
        <div className="auth-left auth-left-image">
          <img src="/sign up.jpg" alt="Create Account" className="auth-bg-image" />
        </div>

        {/* Right Side - Signup Form */}
        <div className="auth-right">
          <div className="auth-header">
            <h1>Join Us Today!</h1>
            <p>Create your account to get started</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group-auth">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group-auth">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group-auth">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group-auth">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-auth">
              Create Account
            </button>

            {/* Divider */}
            <div className="divider">
              <span>Or sign up with</span>
            </div>

            {/* Social Signup */}
            <div className="social-auth social-auth-icons">
              <button
                type="button"
                className="btn-social-icon btn-social-google"
                title="Sign up with Google"
                onClick={() => handleSocialSignup('Google')}
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                type="button"
                className="btn-social-icon btn-social-facebook"
                title="Sign up with Facebook"
                onClick={() => handleSocialSignup('Facebook')}
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="btn-social-icon btn-social-linkedin"
                title="Sign up with LinkedIn"
                onClick={() => handleSocialSignup('LinkedIn')}
              >
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>

            {/* Login Link */}
            <div className="auth-footer">
              Already have an account? <Link href="/login">Sign In</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Message Modal */}
      {message && (
        <div className="message-modal-overlay">
          <div className="message-modal">
            <div className="message-modal-icon">
              <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}`}></i>
            </div>
            <div className="message-modal-content">
              <h3>{message.title}</h3>
              <p>{message.text}</p>
            </div>
            <button className="message-modal-btn" onClick={() => setMessage(null)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
