import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1000);
  };

  return (
    <div className="container py-5 mt-5">
      <h1 className="display-4 fw-bold mb-5">ยืนยันการสั่งซื้อ</h1>
      
      <div className="row g-5">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-4">ข้อมูลการจัดส่ง</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase">ชื่อ-นามสกุล</label>
                  <input 
                    type="text" 
                    className="form-control rounded-pill px-4" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase">เบอร์โทรศัพท์</label>
                  <input 
                    type="tel" 
                    className="form-control rounded-pill px-4" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-uppercase">ที่อยู่สำหรับการจัดส่ง</label>
                  <textarea 
                    className="form-control rounded-4 px-4 py-3" 
                    rows={3}
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-uppercase">หมายเหตุถึงร้านค้า (ถ้ามี)</label>
                  <input 
                    type="text" 
                    className="form-control rounded-pill px-4" 
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-thai-gold w-100 py-3 fw-bold rounded-pill mt-5 shadow-sm">
                ยืนยันการสั่งซื้อและชำระเงิน
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h4 className="fw-bold mb-4">สรุปรายการสั่งซื้อ</h4>
            <div className="flex-grow-1 overflow-auto mb-4" style={{ maxHeight: '400px' }}>
              {cart.map(item => (
                <div key={item.id} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <img src={item.image} alt={item.name} className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} referrerPolicy="no-referrer" />
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-0">{item.name}</h6>
                    <small className="text-muted">จำนวน: {item.quantity}</small>
                  </div>
                  <span className="fw-bold">฿{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>ราคารวม</span>
              <span className="fw-bold">฿{totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>ค่าจัดส่ง</span>
              <span className="text-success fw-bold">ฟรี</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5 className="fw-bold">ยอดสุทธิ</h5>
              <h5 className="fw-bold text-thai-gold">฿{totalPrice}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
