import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LaptopList from './LaptopList';
import Admin from './Admin';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import OrderManagement from './OrderManagement';

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Hàm này dùng để cập nhật số lượng badge ngay lập tức
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    // Lắng nghe sự thay đổi của localStorage từ các tab khác hoặc cùng tab
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">💻 Laptop Shop</Link>

          <div className="d-flex align-items-center">
            {/* Nút Giỏ hàng với Badge số lượng */}
            <Link className="btn btn-outline-info me-3 position-relative" to="/cart">
              🛒 Giỏ hàng
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link className="btn btn-outline-light me-2" to="/login">Đăng nhập</Link>
            <Link className="btn btn-primary me-2" to="/register">Đăng ký</Link>
            <Link className="btn btn-warning" to="/admin">Admin</Link>
            <Link className="btn btn-info text-white" to="/admin/orders">Đơn hàng</Link>
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '80px'}}>
        <Routes>
          <Route path="/" element={<LaptopList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/laptop/:id" element={<ProductDetail />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;