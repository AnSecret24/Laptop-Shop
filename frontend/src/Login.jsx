import React, { useState } from 'react';
import api from './api';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gọi API Login đã viết ở Backend
            const response = await api.post('/auth/login', credentials);
            const token = response.data; // Đây là chuỗi Token dài ngoằng

            // Lưu Token vào bộ nhớ trình duyệt
            localStorage.setItem('token', token);
            alert("Đăng nhập thành công! Token đã được lưu.");

            // Sau này có thể dùng window.location.href = "/" để về trang chủ
        } catch (error) {
            alert("Đăng nhập thất bại: " + (error.response?.data || "Lỗi kết nối"));
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center">Đăng nhập hệ thống</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input type="text" name="username" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;