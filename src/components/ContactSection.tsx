import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-6">
            <span className="text-uppercase tracking-widest fw-bold mb-2 d-block" style={{ color: 'var(--thai-gold)' }}>Contact Us</span>
            <h2 className="display-4 fw-bold mb-5">ติดต่อเรา</h2>
            
            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-start gap-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px', backgroundColor: 'var(--thai-cream)', color: 'var(--thai-gold)' }}>
                  <i className="bi bi-telephone-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">เบอร์โทรศัพท์</h5>
                  <p className="text-muted mb-0">02-123-4567, 081-234-5678</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px', backgroundColor: 'var(--thai-cream)', color: 'var(--thai-gold)' }}>
                  <i className="bi bi-geo-alt-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">ที่ตั้งร้าน</h5>
                  <p className="text-muted mb-0">123 ถนนสุขุมวิท แขวงคลองเตย เขตวัฒนา กรุงเทพฯ 10110</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '50px', height: '50px', backgroundColor: 'var(--thai-cream)', color: 'var(--thai-gold)' }}>
                  <i className="bi bi-clock-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">เวลาเปิด-ปิด</h5>
                  <p className="text-muted mb-0">เปิดทุกวัน: 11:00 น. - 22:00 น.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 d-flex gap-3">
              <a href="#" className="btn btn-success rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '55px', height: '55px' }}>
                <i className="bi bi-line fs-3"></i>
              </a>
              <a href="#" className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '55px', height: '55px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                <i className="bi bi-instagram fs-3"></i>
              </a>
              <a href="#" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '55px', height: '55px' }}>
                <i className="bi bi-facebook fs-3"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden shadow-lg h-100 min-vh-50 bg-light d-flex align-items-center justify-content-center border border-2 border-dashed">
              <div className="text-center p-5">
                <i className="bi bi-map-fill display-1 text-muted opacity-25 mb-4"></i>
                <h4 className="fw-bold mb-3">Google Maps Integration</h4>
                <p className="text-muted mb-4">ในระบบจริง แผนที่ Google Maps จะแสดงผลที่นี่เพื่อให้ลูกค้าสามารถนำทางมายังร้านได้อย่างสะดวก</p>
                <button className="btn btn-dark rounded-pill px-5 py-3">เปิดใน Google Maps</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
