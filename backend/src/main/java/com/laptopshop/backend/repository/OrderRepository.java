package com.laptopshop.backend.repository;

import com.laptopshop.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Truy vấn lấy tổng doanh thu theo từng tháng trong năm hiện tại.
     * Kết quả trả về là một danh sách các mảng Object, trong đó:
     * - Object[0]: Tháng (1, 2, 3...)
     * - Object[1]: Tổng số tiền (Double)
     */
    @Query("SELECT MONTH(o.orderDate) as month, SUM(o.totalAmount) as amount " +
            "FROM Order o " +
            "WHERE YEAR(o.orderDate) = YEAR(CURRENT_DATE) " +
            "GROUP BY MONTH(o.orderDate) " +
            "ORDER BY MONTH(o.orderDate) ASC")
    List<Object[]> getRevenueByMonth();

    /**
     * Truy vấn lấy tổng doanh thu từ trước đến nay.
     */
    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    Double getTotalRevenue();

    /**
     * Truy vấn đếm số lượng đơn hàng theo từng trạng thái (PENDING, DONE, etc.)
     */
    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countOrdersByStatus();
}