import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div className="container py-5 mt-5 text-center">
      <div className="py-5">
        <div className="mb-4">
          <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center shadow-lg" style={{ width: '100px', height: '100px' }}>
            <i className="bi bi-check-lg display-3 text-white"></i>
          </div>
        </div>
        <h1 className="display-4 fw-bold mb-3">สั่งซื้อสำเร็จ!</h1>
        <p className="lead text-muted mb-5">
          ขอบคุณที่ไว้วางใจ Siam Savor <br />
          เราได้รับคำสั่งซื้อของคุณแล้ว และกำลังเตรียมอาหารสุดพิเศษให้คุณ
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link to="/" className="btn btn-thai-gold px-5 py-3 rounded-pill fw-bold">กลับสู่หน้าหลัก</Link>
          <Link to="/#menu" className="btn btn-outline-dark px-5 py-3 rounded-pill fw-bold">สั่งอาหารเพิ่ม</Link>
        </div>
      </div>
    </div>
  );
}
