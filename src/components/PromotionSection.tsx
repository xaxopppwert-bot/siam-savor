import React from 'react';
import { PROMOTIONS } from '../constants';

export default function PromotionSection() {
  return (
    <section id="promotions" className="py-5" style={{ backgroundColor: 'var(--thai-brown)' }}>
      <div className="container py-5 text-white">
        <div className="text-center mb-5">
          <span className="text-uppercase tracking-widest fw-bold mb-2 d-block" style={{ color: 'var(--thai-gold)' }}>Special Offers</span>
          <h2 className="display-4 fw-bold mb-4">โปรโมชั่นพิเศษ</h2>
          <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: 'var(--thai-gold)' }}></div>
        </div>

        <div className="row g-4">
          {PROMOTIONS.map((promo) => (
            <div key={promo.id} className="col-lg-6">
              <div className="card promo-card h-100">
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <img src={promo.image} className="img-fluid h-100 object-fit-cover" alt={promo.title} />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 d-flex flex-column justify-content-center h-100">
                      <div className="d-flex align-items-center gap-2 mb-3" style={{ color: 'var(--thai-gold)' }}>
                        <i className="bi bi-tag-fill"></i>
                        <span className="text-uppercase tracking-widest fw-bold small">{promo.discount}</span>
                      </div>
                      <h3 className="card-title fw-bold mb-3">{promo.title}</h3>
                      <p className="card-text opacity-75 small mb-4">{promo.description}</p>
                      <button className="btn btn-outline-light rounded-pill px-4 align-self-start">รับสิทธิ์เลย</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
