import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Main'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'admin') {
        fetchProducts();
      }
    }
    setLoading(false);
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  if (loading) return null;

  if (!user || user.role !== 'admin') {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="py-5">
          <div className="mb-4">
            <i className="bi bi-shield-lock display-1 text-danger opacity-50"></i>
          </div>
          <h1 className="fw-bold text-danger mb-3">จำกัดการเข้าถึง</h1>
          <p className="lead text-muted mb-5">คุณต้องเป็นผู้ดูแลระบบเพื่อเข้าถึงหน้านี้</p>
          <Link to="/" className="btn btn-thai-gold px-5 py-3 rounded-pill fw-bold shadow-sm">
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price)
      })
    });
    setFormData({ name: '', description: '', price: '', image: '', category: 'Main' });
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="display-4 fw-bold mb-0">ระบบจัดการหลังบ้าน</h1>
        <Link to="/" className="btn btn-outline-dark rounded-pill px-4">ดูหน้าเว็บ</Link>
      </div>
      
      <div className="row g-5">
        <div className="col-lg-4">
          <div className="card shadow-sm p-4 rounded-4 border-0">
            <h3 className="fw-bold mb-4">เพิ่มเมนูใหม่</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase">ชื่อเมนู</label>
                <input 
                  type="text" 
                  className="form-control rounded-pill" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase">คำอธิบาย</label>
                <textarea 
                  className="form-control rounded-4" 
                  rows={3}
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase">ราคา (บาท)</label>
                <input 
                  type="number" 
                  className="form-control rounded-pill" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase">URL รูปภาพ</label>
                <input 
                  type="url" 
                  className="form-control rounded-pill" 
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase">หมวดหมู่</label>
                <select 
                  className="form-select rounded-pill" 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main">Main</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>
              <button type="submit" className="btn btn-thai-gold w-100 py-3 fw-bold">บันทึกข้อมูล</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm rounded-4 border-0 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">รูป</th>
                    <th className="py-3">ชื่อเมนู</th>
                    <th className="py-3">ราคา</th>
                    <th className="py-3">หมวดหมู่</th>
                    <th className="py-3 text-end px-4">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className="px-4">
                        <img src={product.image} alt={product.name} className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                      </td>
                      <td className="fw-bold">{product.name}</td>
                      <td>฿{product.price}</td>
                      <td><span className="badge bg-light text-dark">{product.category}</span></td>
                      <td className="text-end px-4">
                        <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                          <i className="bi bi-trash3-fill me-1"></i> ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

