import React, { useEffect, useState } from 'react';
import api from './api';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        loadOrders();
        loadRevenue();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get('/orders');
            if (res.data && Array.isArray(res.data)) setOrders(res.data);
        } catch (error) { console.error("Lỗi tải đơn hàng:", error); }
        finally { setLoading(false); }
    };

    const loadRevenue = async () => {
        try {
            const res = await api.get('/orders/revenue');
            const months = res.data.map(item => `Tháng ${item[0]}`);
            const amounts = res.data.map(item => item[1]);
            setRevenueData({
                labels: months,
                datasets: [{
                    label: 'Doanh thu (VNĐ)',
                    data: amounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                }]
            });
        } catch (error) { console.error("Lỗi tải doanh thu:", error); }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, newStatus, {
                headers: { "Content-Type": "text/plain" }
            });
            alert("Cập nhật thành công!");
            loadOrders();
            loadRevenue();
        } catch (error) { alert("Lỗi cập nhật trạng thái!"); }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-warning text-dark';
            case 'DONE': return 'bg-success text-white';
            case 'CANCELLED': return 'bg-danger text-white';
            default: return 'bg-info text-white';
        }
    };

    if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

    return (
        <div className="container mt-4 pb-5">
            <h3 className="text-primary mb-4 fw-bold text-center">📊 QUẢN LÝ HỆ THỐNG</h3>

            {/* BIỂU ĐỒ */}
            <div className="card shadow-sm border-0 p-4 mb-5 bg-white">
                <div style={{ height: '350px' }}>
                    <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* BẢNG ĐƠN HÀNG */}
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle border bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                                <td className="text-danger fw-bold">{order.totalAmount?.toLocaleString()} VNĐ</td>
                                <td>
                                    <select
                                        className={`form-select form-select-sm ${getStatusStyle(order.status)}`}
                                        value={order.status || 'PENDING'}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="PENDING" className="bg-white text-dark">Chờ xác nhận</option>
                                        <option value="CONFIRMED" className="bg-white text-dark">Đã xác nhận</option>
                                        <option value="SHIPPING" className="bg-white text-dark">Đang giao</option>
                                        <option value="DONE" className="bg-white text-dark">Đã giao</option>
                                        <option value="CANCELLED" className="bg-white text-dark">Hủy đơn</option>
                                    </select>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-outline-info btn-sm" onClick={() => { setSelectedOrder(order); setShowModal(true); }}>🔍</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal giữ nguyên logic của bạn */}
        </div>
    );
}

export default OrderManagement;