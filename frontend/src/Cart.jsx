import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const removeFromCart = (id) => {
        // Lọc bỏ sản phẩm bị xóa
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        // Cập nhật lại localStorage để đồng bộ dữ liệu
        localStorage.setItem('cart', JSON.stringify(newCart));
        // Phát sự kiện để cập nhật badge số lượng trên thanh Menu (App.jsx)
        window.dispatchEvent(new Event("storage"));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container mt-4 pb-5">
            <h2 className="fw-bold text-primary">🛒 Giỏ hàng của bạn</h2>
            <hr />

            {cartItems.length === 0 ? (
                <div className="text-center py-5">
                    <div className="alert alert-info shadow-sm">
                        <h5>Giỏ hàng đang trống!</h5>
                        <p>Hãy chọn cho mình những chiếc Laptop ưng ý nhất nhé.</p>
                        <Link to="/" className="btn btn-primary mt-3">Quay lại trang chủ</Link>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 p-3 mb-4">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th className="text-end">Giá</th>
                                        <th className="text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={item.imageUrl || 'https://via.placeholder.com/60'}
                                                        alt={item.name}
                                                        className="rounded me-3"
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                    />
                                                    <span className="fw-bold">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-end text-danger fw-bold">
                                                {Number(item.price).toLocaleString()} VNĐ
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                    title="Xóa khỏi giỏ hàng"
                                                >
                                                    <i className="bi bi-trash"></i> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 p-4 bg-light">
                            <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tạm tính:</span>
                                <span>{totalPrice.toLocaleString()} VNĐ</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <span>Phí vận chuyển:</span>
                                <span className="text-success fw-bold">Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <h5 className="fw-bold">Tổng cộng:</h5>
                                <h5 className="text-danger fw-bold">{totalPrice.toLocaleString()} VNĐ</h5>
                            </div>

                            {/* DÙNG LINK ĐỂ CHUYỂN SANG TRANG CHECKOUT */}
                            <Link to="/checkout" className="btn btn-primary btn-lg w-100 shadow">
                                Tiến hành thanh toán
                            </Link>

                            <Link to="/" className="btn btn-link w-100 mt-2 text-decoration-none">
                                ← Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;