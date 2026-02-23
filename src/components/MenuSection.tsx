import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const categories = ['All', 'Appetizer', 'Main', 'Dessert', 'Drink'];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('ไม่สามารถโหลดข้อมูลเมนูได้ กรุณาลองใหม่อีกครั้ง');
        setLoading(false);
      });
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? products 
    : products.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-5 bg-white">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="text-uppercase tracking-widest fw-bold mb-2 d-block" style={{ color: 'var(--thai-gold)' }}>Our Selection</span>
          <h2 className="display-4 fw-bold mb-4">เมนูแนะนำ</h2>
          <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: 'var(--thai-gold)' }}></div>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn rounded-pill px-4 ${activeCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
            >
              {cat === 'All' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-thai-gold" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">กำลังโหลดเมนูอาหาร...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <div className="alert alert-danger d-inline-block px-5">{error}</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">ไม่พบเมนูในหมวดหมู่นี้</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="card menu-card h-100">
                  <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                    <img
                      src={item.image}
                      className="card-img-top w-100 h-100 object-fit-cover"
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                    <span className="position-absolute top-0 end-0 m-3 badge bg-white text-dark p-2 shadow-sm">
                      ฿{item.price}
                    </span>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title fw-bold mb-2">{item.name}</h5>
                    <p className="card-text text-muted small flex-grow-1">{item.description}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="btn btn-outline-dark rounded-pill mt-3 fw-bold"
                    >
                      <i className="bi bi-cart-plus me-2"></i> สั่งซื้อ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


