'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar({ currentUser, setCurrentUser }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname === '/admin-dashboard';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUser(null);
    router.push('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <Link href="/">
            <img src="/ahchip.png" alt="AhhChip Logo" className="logo-img" />
          </Link>
        </div>

        {/* On admin page: show only admin pill + logout. Otherwise show full navbar */}
        {isAdminPage ? (
          <>
            {/* Admin pill and Logout - visible on admin page */}
            {user && user.role === 'admin' && (
              <div className="nav-admin-pill">
                <button className="btn-signup">Admin</button>
                <button className="btn-ghost" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Main Navigation Links */}
            <ul className="nav-menu">
              <li className="nav-item dropdown">
                <a href="#jobs" className="nav-link">
                  <i className="fas fa-briefcase"></i>
                  <span>Jobs</span>
                  <i className="fas fa-chevron-down dropdown-icon"></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#jobs">All Jobs</a>
                  </li>
                  <li>
                    <a href="#my-jobs">Recommended</a>
                  </li>
                  <li>
                    <a href="#my-jobs">Saved Jobs</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#my-jobs" className="nav-link">
                  <i className="fas fa-tasks"></i>
                  <span>My Jobs</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#cv" className="nav-link">
                  <i className="fas fa-file-alt"></i>
                  <span>CV</span>
                </a>
              </li>
            </ul>

            {/* Auth Buttons or Admin Button */}
            {!user || user.role !== 'admin' ? (
              <div className="nav-auth">
                <Link href="/login">
                  <button className="btn-login">Login</button>
                </Link>
                <Link href="/signup">
                  <button className="btn-signup">Sign Up</button>
                </Link>
              </div>
            ) : null}

            {/* Admin pill (top-right) when user is admin */}
            {user && user.role === 'admin' && (
              <div className="nav-admin-pill">
                <Link href="/admin-dashboard"><button className="btn-signup">Admin</button></Link>
              </div>
            )}
          </>
        )}

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
}

