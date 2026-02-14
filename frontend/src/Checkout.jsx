import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const [customer, setCustomer] = useState({ name: '', address: '', phone: '' });
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

        // Chuẩn bị dữ liệu đúng cấu trúc Backend cần
        const orderData = {
            customerName: customer.name,
            address: customer.address,
            phone: customer.phone,
            totalAmount: totalAmount,
            details: cart.map(item => ({
                laptop: { id: item.id },
                quantity: 1,
                price: item.price
            }))
        };

        try {
            await api.post('/orders', orderData);
            alert("Đặt hàng thành công!");
            localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi mua
            window.dispatchEvent(new Event("storage"));
            navigate('/');
        } catch (error) {
            alert("Lỗi khi thanh toán!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Thông tin giao hàng</h2>
            <form onSubmit={handleCheckout} className="card p-4 shadow-sm">
                <input type="text" className="form-control mb-3" placeholder="Họ tên"
                    onChange={e => setCustomer({...customer, name: e.target.value})} required />
                <input type="text" className="form-control mb-3" placeholder="Địa chỉ"
                    onChange={e => setCustomer({...customer, address: e.target.value})} required />
                <input type="text" className="form-control mb-3" placeholder="Số điện thoại"
                    onChange={e => setCustomer({...customer, phone: e.target.value})} required />

                <h4>Tổng tiền: {cart.reduce((s, i) => s + i.price, 0).toLocaleString()} VNĐ</h4>
                <button className="btn btn-success btn-lg w-100 mt-3">XÁC NHẬN ĐẶT HÀNG</button>
            </form>
        </div>
    );
}

export default Checkout;