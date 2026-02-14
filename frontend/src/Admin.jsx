import React, { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [laptops, setLaptops] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingLaptop, setEditingLaptop] = useState(null);
    const navigate = useNavigate();

    const [newLaptop, setNewLaptop] = useState({
        name: '', price: '', description: '', quantity: 0, imageUrl: '', category: { id: 1 }
    });

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/login');
//         } else {
//             loadLaptops();
//         }
//     }, [navigate]);

    useEffect(() => {
        loadLaptops();
    }, []);

    const loadLaptops = async () => {
        const res = await api.get('/laptops');
        setLaptops(res.data);
    };

    const openEditModal = (laptop) => {
        setEditingLaptop({ ...laptop });
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/laptops/${editingLaptop.id}`, editingLaptop);
            alert("Cập nhật thành công!");
            setShowModal(false);
            loadLaptops();
        } catch (error) {
            alert("Lỗi khi cập nhật: " + (error.response?.data || "Lỗi kết nối"));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.post('/laptops', newLaptop);
            alert("Thêm thành công!");
            setNewLaptop({ name: '', price: '', description: '', quantity: 0, imageUrl: '', category: { id: 1 } });
            setShowForm(false);
            loadLaptops();
        } catch (error) {
            alert("Lỗi khi thêm mới");
        }
    };

    const deleteLaptop = async (id) => {
        if (window.confirm("Xóa máy này?")) {
            await api.delete(`/laptops/${id}`);
            loadLaptops();
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-primary mb-4">Quản trị hệ thống Laptop</h2>

            {!showForm && (
                <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>+ Thêm mới</button>
            )}

            {/* FORM THÊM MỚI */}
            {showForm && (
                <div className="card card-body mb-4 shadow-sm border-primary">
                    <h5>Thêm sản phẩm mới</h5>
                    <form onSubmit={handleSave}>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" placeholder="Tên máy" value={newLaptop.name}
                                    onChange={e => setNewLaptop({...newLaptop, name: e.target.value})} required />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input type="number" className="form-control" placeholder="Giá" value={newLaptop.price}
                                    onChange={e => setNewLaptop({...newLaptop, price: e.target.value})} required />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input type="text" className="form-control" placeholder="Link hình ảnh (URL)" value={newLaptop.imageUrl}
                                    onChange={e => setNewLaptop({...newLaptop, imageUrl: e.target.value})} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Hủy</button>
                    </form>
                </div>
            )}

            {/* BẢNG DANH SÁCH */}
            <table className="table table-hover border">
                <thead className="table-dark">
                    <tr>
                        <th>Ảnh</th><th>Tên máy</th><th>Giá</th><th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {laptops.map(item => (
                        <tr key={item.id} className="align-middle">
                            <td><img src={item.imageUrl || 'https://via.placeholder.com/50'} width="50" height="50" style={{objectFit: 'cover'}} alt="img" className="rounded" /></td>
                            <td>{item.name}</td>
                            <td>{Number(item.price).toLocaleString()} VNĐ</td>
                            <td className="text-center">
                                <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(item)}>Sửa</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteLaptop(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL CHỈNH SỬA */}
            {showModal && editingLaptop && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-dark">
                                <h5 className="modal-title">Chỉnh sửa: {editingLaptop.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label className="form-label">Tên máy</label>
                                        <input type="text" className="form-control" value={editingLaptop.name}
                                            onChange={e => setEditingLaptop({...editingLaptop, name: e.target.value})} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Giá (VNĐ)</label>
                                        <input type="number" className="form-control" value={editingLaptop.price}
                                            onChange={e => setEditingLaptop({...editingLaptop, price: e.target.value})} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Link hình ảnh</label>
                                        <input type="text" className="form-control" value={editingLaptop.imageUrl || ''}
                                            onChange={e => setEditingLaptop({...editingLaptop, imageUrl: e.target.value})} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Mô tả</label>
                                        <textarea className="form-control" rows="3" value={editingLaptop.description || ''}
                                            onChange={e => setEditingLaptop({...editingLaptop, description: e.target.value})}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                                    <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;