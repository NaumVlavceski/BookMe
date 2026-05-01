package com.example.backend.repository;

import com.example.backend.model.Business;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Page<Business> findByCity(String city, Pageable pageable);
    @Query("select b from Business b where lower(b.name) like lower(concat(:name, '%'))")
    Page<Business> findByNameStartsWith(String name,Pageable pageable);
    @Query("select b from Business b where lower(b.name) like lower(concat(:name, '%')) and b.city = :city ")
    Page<Business> findByNameAndCity(String name, String city, Pageable pageable);

    Business findByOwner_Id(Long id);
}
