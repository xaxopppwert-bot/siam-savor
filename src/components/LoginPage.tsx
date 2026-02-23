import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        window.location.reload(); // Force refresh to update Navbar
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center py-5">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h2 className="text-center fw-bold mb-4">เข้าสู่ระบบ</h2>
            {error && <div className="alert alert-danger small">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase">ชื่อผู้ใช้งาน</label>
                <input 
                  type="text" 
                  className="form-control rounded-pill px-4 py-2" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase">รหัสผ่าน</label>
                <input 
                  type="password" 
                  className="form-control rounded-pill px-4 py-2" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-thai-gold w-100 py-3 fw-bold mb-3" disabled={loading}>
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
              <p className="text-center mb-0 small">
                ยังไม่มีบัญชี? <Link to="/register" className="text-thai-gold fw-bold text-decoration-none">สมัครสมาชิก</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

