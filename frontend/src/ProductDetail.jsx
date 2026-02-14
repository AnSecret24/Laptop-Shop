import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';

function ProductDetail() {
    const { id } = useParams(); // Lấy ID từ thanh địa chỉ
    const [laptop, setLaptop] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API lấy chi tiết 1 laptop theo ID
        api.get(`/laptops/${id}`)
            .then(res => setLaptop(res.data))
            .catch(err => {
                console.error("Không tìm thấy sản phẩm", err);
                // Nếu lỗi 404 hoặc không tìm thấy, đẩy người dùng về trang chủ
                alert("Sản phẩm không tồn tại hoặc đã bị xóa!");
                navigate('/');
            });
    }, [id, navigate]);

    const addToCart = () => {
        if (!laptop) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(laptop);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`Đã thêm ${laptop.name} vào giỏ hàng!`);
        window.dispatchEvent(new Event("storage")); // Cập nhật badge ở App.jsx
    };

    if (!laptop) return (
        <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Đang tải dữ liệu sản phẩm...</p>
        </div>
    );

    return (
        <div className="container mt-5">
            <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            <div className="row bg-white p-4 shadow-sm rounded border">
                {/* Cột hiển thị ảnh */}
                <div className="col-md-6 mb-4 text-center">
                    <img
                        src={laptop.imageUrl || 'https://via.placeholder.com/400'}
                        className="img-fluid rounded shadow-sm"
                        alt={laptop.name}
                        style={{ maxHeight: '450px', objectFit: 'contain' }}
                    />
                </div>

                {/* Cột hiển thị thông tin */}
                <div className="col-md-6">
                    <h1 className="fw-bold text-dark">{laptop.name}</h1>
                    <hr />
                    <h2 className="text-danger fw-bold my-4">
                        {Number(laptop.price).toLocaleString()} VNĐ
                    </h2>

                    <div className="mb-4">
                        <h5 className="text-secondary border-bottom pb-2">Thông số & Mô tả</h5>
                        <p className="mt-3 text-muted" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                            {laptop.description || "Sản phẩm hiện chưa có mô tả chi tiết từ nhà sản xuất."}
                        </p>
                    </div>

                    <div className="mb-4">
                        <p><strong>Trạng thái: </strong>
                            {laptop.quantity > 0 ?
                                <span className="badge bg-success">Còn {laptop.quantity} máy</span> :
                                <span className="badge bg-danger">Hết hàng</span>
                            }
                        </p>
                    </div>

                    <button
                        className="btn btn-primary btn-lg w-100 shadow-sm mt-2"
                        onClick={addToCart}
                        disabled={laptop.quantity <= 0}
                    >
                        {laptop.quantity > 0 ? "🛒 THÊM VÀO GIỎ HÀNG" : "LIÊN HỆ ĐẶT TRƯỚC"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Luôn đảm bảo dòng này tồn tại để App.jsx có thể import được
export default ProductDetail;