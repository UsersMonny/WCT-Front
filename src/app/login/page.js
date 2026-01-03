'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const DEMO_ACCOUNTS = {
    user: {
      email: 'user@demo.com',
      password: 'user123',
      role: 'user',
    },
    admin: {
      email: 'admin@demo.com',
      password: 'admin123',
      role: 'admin',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailLower = email.toLowerCase();
    let loggedInUser = null;

    if (emailLower === DEMO_ACCOUNTS.user.email && password === DEMO_ACCOUNTS.user.password) {
      loggedInUser = DEMO_ACCOUNTS.user;
    } else if (
      emailLower === DEMO_ACCOUNTS.admin.email &&
      password === DEMO_ACCOUNTS.admin.password
    ) {
      loggedInUser = DEMO_ACCOUNTS.admin;
    }

    if (loggedInUser) {
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      setTimeout(() => {
        if (loggedInUser.role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/');
        }
      }, 1000);
    } else {
      setMessage({
        type: 'error',
        title: 'Invalid Credentials',
        text: 'Demo Accounts:\nUser: user@demo.com / user123\nAdmin: admin@demo.com / admin123',
      });
    }
  };

  const handleSocialLogin = (provider) => {
    setMessage({
      type: 'info',
      title: 'Demo Mode',
      text: `Login with ${provider} (Demo)`,
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
          <img src="/signin.png" alt="Welcome Back" className="auth-bg-image" />
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-right">
          <div className="auth-header">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue your journey</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group-auth">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember & Forgot */}
            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-auth">
              Sign In
            </button>

            {/* Divider */}
            <div className="divider">
              <span>Or continue with</span>
            </div>

            {/* Social Login */}
            <div className="social-auth social-auth-icons">
              <button
                type="button"
                className="btn-social-icon btn-social-google"
                title="Sign in with Google"
                onClick={() => handleSocialLogin('Google')}
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                type="button"
                className="btn-social-icon btn-social-facebook"
                title="Sign in with Facebook"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="btn-social-icon btn-social-linkedin"
                title="Sign in with LinkedIn"
                onClick={() => handleSocialLogin('LinkedIn')}
              >
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="auth-footer">
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Message Modal */}
      {message && (
        <div className="message-modal-overlay">
          <div className="message-modal">
            <div className="message-modal-icon">
              <i className="fas fa-info-circle"></i>
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
