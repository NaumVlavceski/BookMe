package com.example.backend.service;

import com.example.backend.dto.business.BusinessRequestDTO;
import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.model.Business;
import com.example.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.util.List;

public interface BusinessService {
        BusinessResponseDTO createBusiness(BusinessRequestDTO request, User owner);

    Page<BusinessResponseDTO> findAllBusinesses(String name, String city, Pageable pageable);
    BusinessResponseDTO detailsBusiness(Long id);
    BusinessResponseDTO editBusiness(Long id,BusinessRequestDTO request);

    void deleteBusiness(Long user_id,Long business_id);
}
