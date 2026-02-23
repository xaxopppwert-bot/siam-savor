import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-white text-center">
            <span className="text-uppercase tracking-widest fw-bold mb-3 d-block" style={{ color: 'var(--thai-gold)', letterSpacing: '5px' }}>
              ยินดีต้อนรับสู่ สยาม เซเวอร์
            </span>
            <h1 className="display-1 fw-bold mb-4">
              รสชาติไทย <br /> <span className="fst-italic" style={{ color: 'var(--thai-gold)' }}>ร่วมสมัย</span>
            </h1>
            <p className="lead mb-5 opacity-75">
              สัมผัสประสบการณ์อาหารไทยระดับพรีเมียม ที่ผสมผสานวัตถุดิบดั้งเดิมเข้ากับเทคนิคการปรุงที่ทันสมัย
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <a href="#menu" className="btn btn-thai-gold btn-lg">ดูเมนูอาหาร</a>
              <a href="#about" className="btn btn-outline-light btn-lg rounded-pill px-5">เรื่องราวของเรา</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
