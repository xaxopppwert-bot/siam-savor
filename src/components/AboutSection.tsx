import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-5" style={{ backgroundColor: 'var(--thai-cream)' }}>
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="https://picsum.photos/seed/chef/800/1000"
                alt="Our Chef"
                className="img-fluid rounded-4 shadow-lg"
              />
              <div className="position-absolute bottom-0 end-0 bg-white p-4 rounded-4 shadow-lg m-4 d-none d-md-block" style={{ maxWidth: '200px' }}>
                <h4 className="fw-bold mb-0">15+</h4>
                <p className="small text-muted mb-0">ปีแห่งประสบการณ์ความอร่อย</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <span className="text-uppercase tracking-widest fw-bold mb-2 d-block" style={{ color: 'var(--thai-gold)' }}>Our Story</span>
            <h2 className="display-4 fw-bold mb-4">ตำนานความอร่อย <br /> ที่ส่งต่อจากรุ่นสู่รุ่น</h2>
            <div className="text-muted lead mb-4">
              <p>สยาม เซเวอร์ เริ่มต้นจากความหลงใหลในศิลปะการปรุงอาหารไทยดั้งเดิม เราเชื่อว่าอาหารไม่ใช่เพียงแค่การอิ่มท้อง แต่คือการถ่ายทอดวัฒนธรรมและจิตวิญญาณ</p>
              <p>เชฟของเราคัดสรรวัตถุดิบที่ดีที่สุดจากเกษตรกรท้องถิ่น ผสมผสานกับเทคนิคการจัดจานที่ทันสมัย เพื่อให้ทุกคำที่คุณทาน คือการเดินทางย้อนเวลากลับไปสู่รสชาติที่คุ้นเคยในรูปแบบใหม่ที่น่าตื่นเต้น</p>
            </div>
            <div className="row text-center g-4">
              <div className="col-4">
                <h3 className="fw-bold mb-0" style={{ color: 'var(--thai-gold)' }}>50+</h3>
                <p className="small text-uppercase tracking-wider opacity-50">เมนูซิกเนเจอร์</p>
              </div>
              <div className="col-4">
                <h3 className="fw-bold mb-0" style={{ color: 'var(--thai-gold)' }}>100%</h3>
                <p className="small text-uppercase tracking-wider opacity-50">วัตถุดิบสดใหม่</p>
              </div>
              <div className="col-4">
                <h3 className="fw-bold mb-0" style={{ color: 'var(--thai-gold)' }}>4.9</h3>
                <p className="small text-uppercase tracking-wider opacity-50">คะแนนรีวิว</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
