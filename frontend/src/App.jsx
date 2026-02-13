import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LaptopList from './LaptopList'; // Giả sử bạn đặt code danh sách laptop vào file này

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Laptop Shop</Link>
          <div>
            <Link className="btn btn-outline-light me-2" to="/login">Đăng nhập</Link>
            <Link className="btn btn-primary" to="/register">Đăng ký</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LaptopList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;