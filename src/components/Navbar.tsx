import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Check for user on mount and when storage changes
    const checkUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    
    // Listen for storage changes (e.g., from other tabs or manual login)
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
    };
  }, [location.pathname]); // Re-check on navigation

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled || !isHome ? 'scrolled navbar-light' : 'navbar-dark bg-transparent'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex flex-column align-items-center text-decoration-none" to="/">
          <span className="h4 mb-0 fw-bold tracking-widest text-uppercase" style={{ color: scrolled || !isHome ? 'var(--thai-gold)' : 'white' }}>Siam Savor</span>
          <small className="text-uppercase opacity-75" style={{ fontSize: '10px', letterSpacing: '3px', color: scrolled || !isHome ? 'var(--thai-brown)' : 'white' }}>Modern Thai Cuisine</small>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className={`nav-link text-uppercase fw-medium px-3 ${scrolled || !isHome ? 'text-dark' : 'text-white'}`} href="/#home">หน้าแรก</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-uppercase fw-medium px-3 ${scrolled || !isHome ? 'text-dark' : 'text-white'}`} href="/#menu">เมนู</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-uppercase fw-medium px-3 ${scrolled || !isHome ? 'text-dark' : 'text-white'}`} href="/#about">เกี่ยวกับเรา</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-uppercase fw-medium px-3 ${scrolled || !isHome ? 'text-dark' : 'text-white'}`} href="/#promotions">โปรโมชั่น</a>
            </li>
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className={`nav-link text-uppercase fw-medium px-3 ${scrolled || !isHome ? 'text-dark' : 'text-white'}`} to="/admin">แอดมิน</Link>
              </li>
            )}
            
            <li className="nav-item ms-lg-2">
              <Link to="/cart" className={`nav-link position-relative px-3 ${scrolled || !isHome ? 'text-dark' : 'text-white'}`}>
                <i className="bi bi-cart3 fs-5"></i>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {user ? (
              <li className="nav-item dropdown ms-lg-3">
                <a className={`nav-link dropdown-toggle text-uppercase fw-bold ${scrolled || !isHome ? 'text-dark' : 'text-white'}`} href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-1"></i> {user.username}
                </a>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li><button className="dropdown-item" onClick={handleLogout}>ออกจากระบบ</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-lg-3">
                <Link className="btn btn-thai-gold" to="/login">เข้าสู่ระบบ</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}



