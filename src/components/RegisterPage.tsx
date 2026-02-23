import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        navigate('/login');
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
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
            <h2 className="text-center fw-bold mb-4">สมัครสมาชิก</h2>
            {error && <div className="alert alert-danger small">{error}</div>}
            <form onSubmit={handleRegister}>
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
                {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </button>
              <p className="text-center mb-0 small">
                มีบัญชีอยู่แล้ว? <Link to="/login" className="text-thai-gold fw-bold text-decoration-none">เข้าสู่ระบบ</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

