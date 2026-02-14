package com.laptopshop.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("customerName") // Đảm bảo JSON trả về đúng tên này
    private String customerName;

    private String address;
    private String phone;

    @JsonProperty("totalAmount")
    private Double totalAmount;

    @JsonProperty("orderDate")
    private LocalDateTime orderDate;

    private String status = "PENDING";

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> details;
}
