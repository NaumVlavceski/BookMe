package com.example.backend.repository;

import com.example.backend.model.BusinessUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessUserRepository extends JpaRepository<BusinessUser, Integer> {
}
