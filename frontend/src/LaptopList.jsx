import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Thêm dòng này để điều hướng
import api from './api';

function LaptopList() {
    const [laptops, setLaptops] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        api.get('/laptops').then(res => setLaptops(res.data));
    }, []);

    const addToCart = (laptop) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(laptop);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Đã thêm ${laptop.name} vào giỏ hàng!`);
        window.dispatchEvent(new Event("storage"));
    };

    const filteredLaptops = laptops.filter(laptop =>
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            {/* Thanh tìm kiếm */}
            <div className="row mb-5 justify-content-center">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text bg-primary text-white">🔍</span>
                        <input
                            type="text"
                            className="form-control form-control-lg shadow-sm"
                            placeholder="Tìm kiếm Laptop bạn yêu thích..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="row">
                {filteredLaptops.length > 0 ? (
                    filteredLaptops.map(laptop => (
                        <div className="col-md-4 mb-4" key={laptop.id}>
                            <div className="card h-100 shadow-sm border-0 transition-card">
                                {/* Nhấn vào ảnh để xem chi tiết */}
                                <Link to={`/laptop/${laptop.id}`}>
                                    <img
                                        src={laptop.imageUrl || 'https://via.placeholder.com/300x200'}
                                        className="card-img-top"
                                        alt={laptop.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                </Link>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-dark">{laptop.name}</h5>
                                    <p className="text-danger fw-bold fs-5">
                                        {Number(laptop.price).toLocaleString()} VNĐ
                                    </p>

                                    <div className="mt-auto">
                                        {/* Nút Xem chi tiết chuyển hướng theo ID */}
                                        <Link
                                            to={`/laptop/${laptop.id}`}
                                            className="btn btn-outline-primary w-100 mb-2"
                                        >
                                            Xem chi tiết
                                        </Link>

                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={() => addToCart(laptop)}
                                        >
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5">
                        <p className="text-muted fs-4">Không tìm thấy laptop nào phù hợp với "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LaptopList;