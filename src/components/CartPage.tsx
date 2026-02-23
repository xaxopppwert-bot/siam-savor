import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="py-5">
          <i className="bi bi-cart-x display-1 text-muted opacity-25 mb-4"></i>
          <h2 className="fw-bold">ตะกร้าของคุณว่างเปล่า</h2>
          <p className="text-muted mb-4">ลองไปเลือกดูเมนูอร่อยๆ ของเราก่อนสิ</p>
          <Link to="/#menu" className="btn btn-thai-gold px-5 py-3 rounded-pill fw-bold">ไปที่เมนูอาหาร</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <h1 className="display-4 fw-bold mb-5">ตะกร้าสินค้า</h1>
      
      <div className="row g-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">สินค้า</th>
                    <th className="py-3">ราคา</th>
                    <th className="py-3 text-center">จำนวน</th>
                    <th className="py-3">รวม</th>
                    <th className="py-3 text-end px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.image} alt={item.name} className="rounded-3 object-fit-cover" style={{ width: '60px', height: '60px' }} referrerPolicy="no-referrer" />
                          <div>
                            <h6 className="fw-bold mb-0">{item.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>฿{item.price}</td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-sm btn-outline-dark rounded-circle" style={{ width: '30px', height: '30px', padding: 0 }}>-</button>
                          <span className="fw-bold mx-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-sm btn-outline-dark rounded-circle" style={{ width: '30px', height: '30px', padding: 0 }}>+</button>
                        </div>
                      </td>
                      <td className="fw-bold">฿{item.price * item.quantity}</td>
                      <td className="text-end px-4">
                        <button onClick={() => removeFromCart(item.id)} className="btn btn-link text-danger p-0">
                          <i className="bi bi-x-circle-fill fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={clearCart} className="btn btn-link text-muted mt-3 text-decoration-none">
            <i className="bi bi-trash me-1"></i> ล้างตะกร้าสินค้า
          </button>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-4">สรุปการสั่งซื้อ</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>ราคารวม</span>
              <span className="fw-bold">฿{totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>ค่าจัดส่ง</span>
              <span className="text-success fw-bold">ฟรี</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <h5 className="fw-bold">ยอดสุทธิ</h5>
              <h5 className="fw-bold text-thai-gold">฿{totalPrice}</h5>
            </div>
            <Link to="/checkout" className="btn btn-thai-gold w-100 py-3 fw-bold rounded-pill shadow-sm">
              ไปหน้ายืนยันการสั่งซื้อ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
