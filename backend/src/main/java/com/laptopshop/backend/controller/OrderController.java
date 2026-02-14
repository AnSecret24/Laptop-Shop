package com.laptopshop.backend.controller;

import com.laptopshop.backend.entity.Order;
import com.laptopshop.backend.entity.OrderDetail;
import com.laptopshop.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // 1. API Thống kê doanh thu (Nên để lên trên các API có PathVariable để tránh bị nhầm lẫn)
    @GetMapping("/revenue")
    public List<Object[]> getRevenue() {
        return orderRepository.getRevenueByMonth(); // Trả về danh sách [Tháng, Tổng tiền]
    }

    // 2. Lấy danh sách tất cả đơn hàng
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 3. Xử lý lưu đơn hàng từ giỏ hàng
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setOrderDate(LocalDateTime.now());

        if (order.getDetails() != null) {
            for (OrderDetail detail : order.getDetails()) {
                detail.setOrder(order); // Thiết lập mối quan hệ 2 chiều để JPA lưu đúng bảng con
            }
        }
        return orderRepository.save(order);
    }

    // 4. Xem chi tiết một đơn hàng theo ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng ID: " + id));
    }

    // 5. Cập nhật trạng thái đơn hàng (PENDING, CONFIRMED, DONE, CANCELLED)
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestBody String newStatus) {
        Order order = orderRepository.findById(id).orElseThrow();
        // Xử lý chuỗi từ React gửi lên để đảm bảo sạch dữ liệu
        order.setStatus(newStatus.replace("\"", ""));
        return orderRepository.save(order);
    }
}