import React from 'react';

export default function Footer() {
  return (
    <footer className="py-5 border-top" style={{ backgroundColor: 'var(--thai-cream)' }}>
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-6 text-center text-md-start">
            <a className="d-flex flex-column align-items-center align-items-md-start text-decoration-none" href="#home">
              <span className="h4 mb-0 fw-bold tracking-widest text-uppercase" style={{ color: 'var(--thai-gold)' }}>Siam Savor</span>
              <small className="text-uppercase opacity-75 text-dark" style={{ fontSize: '10px', letterSpacing: '3px' }}>Modern Thai Cuisine</small>
            </a>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="text-muted small mb-2">
              © {new Date().getFullYear()} Siam Savor Restaurant. All rights reserved.
            </p>
            <div className="d-flex justify-content-center justify-content-md-end gap-4 small text-uppercase tracking-widest fw-medium opacity-50">
              <a href="#" className="text-dark text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-dark text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
